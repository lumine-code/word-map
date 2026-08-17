const { CompositeDisposable } = require("lumine");

module.exports = {
  MAP: {
    q: "θ",
    θ: "q",
    w: "ω",
    ω: "w",
    e: "ε",
    ε: "e",
    r: "ρ",
    ρ: "r",
    t: "τ",
    τ: "t",
    y: "ψ",
    ψ: "y",
    u: "υ",
    υ: "u",
    i: "ι",
    ι: "i",
    o: "ο",
    ο: "o",
    p: "π",
    π: "p",
    a: "α",
    α: "a",
    s: "σ",
    σ: "s",
    d: "δ",
    δ: "d",
    f: "φ",
    φ: "f",
    g: "γ",
    γ: "g",
    h: "η",
    η: "h",
    j: "ϕ",
    ϕ: "j",
    k: "κ",
    κ: "k",
    l: "λ",
    λ: "l",
    z: "ζ",
    ζ: "z",
    x: "ξ",
    ξ: "x",
    c: "χ",
    χ: "c",
    b: "β",
    β: "b",
    n: "ν",
    ν: "n",
    m: "μ",
    μ: "m",
    Q: "Θ",
    Θ: "Q",
    W: "Ω",
    Ω: "W",
    E: "Σ",
    Y: "Ψ",
    Ψ: "Y",
    P: "Π",
    Π: "P",
    S: "Σ",
    Σ: "S",
    D: "Δ",
    Δ: "D",
    F: "ϑ",
    ϑ: "F",
    G: "Γ",
    Γ: "G",
    J: "Φ",
    Φ: "J",
    L: "Λ",
    Λ: "L",
    X: "Ξ",
    Ξ: "X",
    C: "Χ",
    Χ: "C",
    V: "ς",
    ς: "V",
    1: "°",
    "°": "1",
    2: "ʾ",
    ʾ: "2",
    3: "ϵ",
    ϵ: "3",
    5: "‰",
    "‰": "5",
    sqrt: "√",
    "√": "sqrt",
    "(C)": "©",
    "©": "(C)",
    "(R)": "®",
    "®": "(R)",
    "(TM)": "™",
    "™": "(TM)",
    "...": "…",
    "…": "...",
    "'": '"',
    '"': "'",
  },

  activate() {
    this.disposables = new CompositeDisposable();
    this.disposables.add(
      // On the workspace: the application menu dispatches at whatever holds
      // focus, so an editor scope left every one of these menu items dead
      // whenever focus was elsewhere. Each handler resolves the editor itself.
      lumine.commands.add("lumine-workspace", {
        "word-map:auto": {
          description: "Map the word before the cursor, or the selection if there is one.",
          didDispatch: (e) => this.convert(e, 0, 1),
        },
        "word-map:selected": {
          description: "Map only what is selected, never the word before the cursor.",
          didDispatch: (e) => this.convert(e, 2),
        },
        "word-map:fixed-1": {
          description: "Map the single character before the cursor.",
          didDispatch: (e) => this.convert(e, 1, 1),
        },
        "word-map:fixed-2": {
          description: "Map the two characters before the cursor.",
          didDispatch: (e) => this.convert(e, 1, 2),
        },
        "word-map:fixed-3": {
          description: "Map the three characters before the cursor.",
          didDispatch: (e) => this.convert(e, 1, 3),
        },
        "word-map:fixed-4": {
          description: "Map the four characters before the cursor.",
          didDispatch: (e) => this.convert(e, 1, 4),
        },
        "word-map:fixed-5": {
          description: "Map the five characters before the cursor.",
          didDispatch: (e) => this.convert(e, 1, 5),
        },
      }),
      lumine.config.observe("word-map.customMAP", (value) => {
        this.parseAndSetFromString(value);
      }),
    );
  },

  deactivate() {
    this.disposables.dispose();
  },

  convert(e, mode = 0, wLen = 1) {
    // The editor the dispatch came from, or the active one: the application
    // menu dispatches at whatever holds focus, which is not always an editor.
    const element = e?.target?.closest?.("lumine-text-editor:not([mini])");
    const editor = element?.getModel?.() ?? lumine.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    }

    editor.mutateSelectedText((selection) => {
      let word;
      if ((mode === 0 && selection.isEmpty()) || mode === 1) {
        let lpoint = selection.cursor.getBufferPosition();
        selection.setBufferRange([[lpoint.row, lpoint.column - wLen], lpoint]);
        word = selection.getText();
        if (word === "") {
          if (!lumine.config.get("word-map.silentQ")) {
            lumine.notifications.addWarning("The selection is empty");
          }
          return;
        }
      } else if (selection.isSingleScreenLine()) {
        word = selection.getText();
        if (word === "") {
          if (!lumine.config.get("word-map.silentQ")) {
            lumine.notifications.addWarning("The selection is empty");
          }
          return;
        }
      } else {
        if (!lumine.config.get("word-map.silentQ")) {
          lumine.notifications.addWarning("The multiline selection is not supported");
        }
        return;
      }

      if (Object.prototype.hasOwnProperty.call(this.customMAP, word)) {
        selection.insertText(this.customMAP[word]);
      } else if (Object.prototype.hasOwnProperty.call(this.MAP, word)) {
        selection.insertText(this.MAP[word]);
      } else if (!lumine.config.get("word-map.silentQ")) {
        lumine.notifications.addWarning(`Word "${word}" map do not exists`);
      }
    });
  },

  parseAndSetFromString(text) {
    let pairs = text.split(",");
    let cm = {};
    let txt, k, v;
    for (let pair of pairs) {
      if (pair.trim() === "") {
        continue;
      } else if (!pair.includes(":")) {
        continue;
      }
      txt = pair.split(":");
      k = txt[0].trim();
      v = txt[1].trim();
      cm[k] = v;
    }
    this.customMAP = cm;
  },
};
