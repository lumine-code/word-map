// Authentic package usage. Run with lumine/script/demo.js; fixtures stay in demo/.
module.exports = {
  version: 1,
  dependencies: [],
  viewport: { width: 1100, height: 340 },
  async before() {},
  async prepare(context) {
    const { state, open } = context;
    state.editor = await open("usage/symbols.txt");
  },
  scenes: [
    {
      id: "scene-1",
      file: "demo.png",
      caption: "Text triggers selected at multiple cursors.",
      timeout: 60000,
      async run(context) {
        const { state } = context;
        {
          state.editor.setSelectedBufferRanges([
            [
              [0, 7],
              [0, 8],
            ],
            [
              [1, 6],
              [1, 7],
            ],
            [
              [2, 4],
              [2, 5],
            ],
            [
              [3, 6],
              [3, 10],
            ],
          ]);
        }
      },
      ready() {
        return Boolean(
          document.querySelector("lumine-workspace")?.getBoundingClientRect().height > 0 &&
          document.body.innerText.trim().length > 0,
        );
      },
    },
    {
      id: "scene-2",
      file: "demo-2.png",
      caption: "Mapped Greek letters and mathematical symbols.",
      timeout: 60000,
      async run(context) {
        const { lumine, state } = context;
        {
          lumine.commands.dispatch(lumine.views.getView(state.editor), "word-map:selected");
        }
      },
      ready(context) {
        const { state } = context;
        return Boolean(
          state.editor.getText().includes("α") && state.editor.getText().includes("√"),
        );
      },
    },
  ],
  async cleanup() {},
};
