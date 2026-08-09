describe("word-map", () => {
  let editor, editorElement, mainModule;

  beforeEach(async () => {
    jasmine.attachToDOM(lumine.views.getView(lumine.workspace));
    editor = await lumine.workspace.open();
    editorElement = lumine.views.getView(editor);

    // The package defers activation until one of its commands is dispatched.
    const activation = lumine.packages.activatePackage("word-map");
    lumine.commands.dispatch(editorElement, "word-map:auto");
    mainModule = (await activation).mainModule;
    lumine.config.set("word-map.silentQ", false);
    lumine.config.set("word-map.customMAP", "");
  });

  it("activates and registers its commands", () => {
    const commands = lumine.commands
      .findCommands({ target: editorElement })
      .map((command) => command.name);
    for (const name of ["word-map:auto", "word-map:selected", "word-map:fixed-3"]) {
      expect(commands).toContain(name);
    }
  });

  describe("word-map:auto", () => {
    it("converts the single character before the cursor when nothing is selected", () => {
      editor.setText("a");
      editor.setCursorBufferPosition([0, 1]);
      lumine.commands.dispatch(editorElement, "word-map:auto");
      expect(editor.getText()).toBe("α");
    });

    it("converts the selected text when the selection is not empty", () => {
      editor.setText("sqrt");
      editor.setSelectedBufferRange([
        [0, 0],
        [0, 4],
      ]);
      lumine.commands.dispatch(editorElement, "word-map:auto");
      expect(editor.getText()).toBe("√");
    });

    it("converts in both directions", () => {
      editor.setText("α");
      editor.setCursorBufferPosition([0, 1]);
      lumine.commands.dispatch(editorElement, "word-map:auto");
      expect(editor.getText()).toBe("a");
    });

    it("converts every cursor independently", () => {
      editor.setText("a\nb\n");
      editor.setCursorBufferPosition([0, 1]);
      editor.addCursorAtBufferPosition([1, 1]);
      lumine.commands.dispatch(editorElement, "word-map:auto");
      expect(editor.getText()).toBe("α\nβ\n");
    });
  });

  describe("word-map:fixed-N", () => {
    it("converts the N characters before the cursor", () => {
      editor.setText("x = sqrt");
      editor.setCursorBufferPosition([0, 8]);
      lumine.commands.dispatch(editorElement, "word-map:fixed-4");
      expect(editor.getText()).toBe("x = √");
    });
  });

  describe("word-map:selected", () => {
    it("warns on multi-line selections without changing the text", () => {
      lumine.notifications.clear();
      editor.setText("a\nb");
      editor.setSelectedBufferRange([
        [0, 0],
        [1, 1],
      ]);
      lumine.commands.dispatch(editorElement, "word-map:selected");
      expect(editor.getText()).toBe("a\nb");
      const warnings = lumine.notifications
        .getNotifications()
        .filter((notification) => notification.getType() === "warning");
      expect(warnings.length).toBe(1);
    });
  });

  describe("custom mapping", () => {
    it("extends and overrides the built-in mapping", () => {
      lumine.config.set("word-map.customMAP", "zz:ω, a:@");
      expect(mainModule.customMAP).toEqual({ zz: "ω", a: "@" });

      editor.setText("zz");
      editor.setSelectedBufferRange([
        [0, 0],
        [0, 2],
      ]);
      lumine.commands.dispatch(editorElement, "word-map:selected");
      expect(editor.getText()).toBe("ω");

      editor.setText("a");
      editor.setCursorBufferPosition([0, 1]);
      lumine.commands.dispatch(editorElement, "word-map:auto");
      expect(editor.getText()).toBe("@");
    });
  });

  describe("unknown words", () => {
    it("warns when the word has no mapping", () => {
      lumine.notifications.clear();
      editor.setText("qq");
      editor.setSelectedBufferRange([
        [0, 0],
        [0, 2],
      ]);
      lumine.commands.dispatch(editorElement, "word-map:selected");
      expect(editor.getText()).toBe("qq");
      expect(lumine.notifications.getNotifications().length).toBe(1);
    });

    it("stays silent in silent mode", () => {
      lumine.config.set("word-map.silentQ", true);
      lumine.notifications.clear();
      editor.setText("qq");
      editor.setSelectedBufferRange([
        [0, 0],
        [0, 2],
      ]);
      lumine.commands.dispatch(editorElement, "word-map:selected");
      expect(lumine.notifications.getNotifications().length).toBe(0);
    });
  });
});
