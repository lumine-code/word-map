describe("Word Map logical selected lines", () => {
  let editor, element;
  beforeEach(async () => {
    for (const method of ["openPath", "openExternal", "openApplication", "showItemInFolder"])
      spyOn(lumine.shell, method).and.resolveTo();
    spyOn(lumine.application, "openWindow").and.resolveTo();
    await lumine.packages.activatePackage("word-map");
    lumine.config.set("editor.softWrapAtPreferredLineLength", true);
    lumine.config.set("editor.preferredLineLength", 4);
    editor = await lumine.workspace.open();
    element = lumine.views.getView(editor);
    jasmine.attachToDOM(lumine.workspace.getElement());
    lumine.config.set("word-map.customMAP", "abcdefghijkl:Ω");
    lumine.config.set("word-map.silentQ", false);
    spyOn(lumine.notifications, "addWarning");
  });
  afterEach(async () => {
    editor?.destroy();
    await lumine.packages.deactivatePackage("word-map");
  });
  for (const command of ["word-map:auto", "word-map:selected"]) {
    it(`converts one logical line across native soft wraps through ${command}`, () => {
      editor.setText("abcdefghijkl");
      editor.setSoftWrapped(true);
      editor.setEditorWidthInChars(4);
      expect(editor.getSoftWrapColumn()).toBe(4);
      editor.setSelectedBufferRange([
        [0, 0],
        [0, 12],
      ]);
      expect(editor.getLastSelection().getScreenRange().isSingleLine()).toBe(false);
      editor.getBuffer().clearUndoStack();
      lumine.commands.dispatch(element, command);
      expect(editor.getText()).toBe("Ω");
      expect(lumine.notifications.addWarning).not.toHaveBeenCalled();
      editor.undo();
      expect(editor.getText()).toBe("abcdefghijkl");
    });
  }
  it("retains the multiline rejection for two logical buffer lines", () => {
    editor.setText("abc\ndef");
    editor.selectAll();
    lumine.commands.dispatch(element, "word-map:selected");
    expect(editor.getText()).toBe("abc\ndef");
    expect(lumine.notifications.addWarning).toHaveBeenCalledOnceWith(
      "The multiline selection is not supported",
    );
  });
});
