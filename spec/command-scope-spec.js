describe("word-map menu command scopes", () => {
  const commands = ["auto", "selected", "fixed-1", "fixed-2", "fixed-3", "fixed-4", "fixed-5"].map(
    (name) => `word-map:${name}`,
  );
  let editor, mini, button;

  beforeEach(async () => {
    jasmine.attachToDOM(lumine.workspace.getElement());
    await lumine.packages.activatePackage("word-map");
    editor = await lumine.workspace.open();
    mini = lumine.workspace.buildTextEditor({ mini: true });
    button = document.createElement("button");
    lumine.workspace.getElement().append(mini.getElement(), button);
  });

  afterEach(async () => {
    button.remove();
    mini.destroy();
    editor.destroy();
    await lumine.packages.deactivatePackage("word-map");
  });

  it("requires the focused writable editor rather than an unrelated surface", () => {
    for (const command of commands) {
      expect(lumine.commands.canDispatch(editor.getElement(), command))
        .withContext(command)
        .toBe(true);
      expect(lumine.commands.canDispatch(button, command)).withContext(command).toBe(false);
      expect(lumine.commands.canDispatch(mini.getElement(), command))
        .withContext(command)
        .toBe(false);
    }
    editor.getElement().setAttribute("readonly", "");
    for (const command of commands)
      expect(lumine.commands.canDispatch(editor.getElement(), command))
        .withContext(command)
        .toBe(false);
  });

  it("does not offer document actions in an empty workspace", () => {
    editor.destroy();
    for (const command of commands)
      expect(lumine.commands.canDispatch(lumine.workspace.getElement(), command))
        .withContext(command)
        .toBe(false);
  });
});
