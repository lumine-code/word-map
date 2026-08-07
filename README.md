# word-map

Convert short text triggers into Greek letters and symbols.

Type a short trigger such as `a` or `sqrt`, press the convert key, and it is replaced in place by its mapped character such as `α` or `√`. Consider using [ahk-greek-keymap](https://github.com/asiloisad/ahk-greek-keymap) instead, which has the same goal but works system wide.

## Features

- **Greek letters**: the built-in mapping converts latin letters to their greek counterparts and back.
- **Symbols**: multi-character triggers for symbols, e.g. `sqrt` → `√`, `(C)` → `©`, `...` → `…`.
- **Custom mapping**: user rules extend or overwrite the built-in mapping.
- **Multi-cursor**: every selection converts independently.
- **Snippet independent**: the conversion works outside the snippets system with its own convert key.

## Installation

To install `word-map` search for _word-map_ in the Install pane of the Lumine settings or run `lumine --install lumine-code/word-map`.

## Commands

Commands available in `atom-workspace`:

- `word-map:auto`: convert the selected text, or the single character before the cursor when the selection is empty,
- `word-map:selected`: convert the selected text,
- `word-map:fixed-1` … `word-map:fixed-5`: convert the `N` characters before the cursor.

## Examples

- the greek letter `α` can be written by typing `a` and pressing the convert key,
- the greek letter `β` can be written by typing `b` and pressing the convert key,
- the greek letter `π` can be written by typing `p` and pressing the convert key,
- the square root symbol `√` can be written by typing `sqrt`, selecting it and pressing the convert key.

## The built-in mapping

    `q    : θ`,      `θ  : q`,
    `w    : ω`,      `ω  : w`,
    `e    : ε`,      `ε  : e`,
    `r    : ρ`,      `ρ  : r`,
    `t    : τ`,      `τ  : t`,
    `y    : ψ`,      `ψ  : y`,
    `u    : υ`,      `υ  : u`,
    `i    : ι`,      `ι  : i`,
    `o    : ο`,      `ο  : o`,
    `p    : π`,      `π  : p`,
    `a    : α`,      `α  : a`,
    `s    : σ`,      `σ  : s`,
    `d    : δ`,      `δ  : d`,
    `f    : φ`,      `φ  : f`,
    `g    : γ`,      `γ  : g`,
    `h    : η`,      `η  : h`,
    `j    : ϕ`,      `ϕ  : j`,
    `k    : κ`,      `κ  : k`,
    `l    : λ`,      `λ  : l`,
    `z    : ζ`,      `ζ  : z`,
    `x    : ξ`,      `ξ  : x`,
    `c    : χ`,      `χ  : c`,
    `b    : β`,      `β  : b`,
    `n    : ν`,      `ν  : n`,
    `m    : μ`,      `μ  : m`,
    `Q    : Θ`,      `Θ  : Q`,
    `W    : Ω`,      `Ω  : W`,
    `E    : Σ`,
    `Y    : Ψ`,      `Ψ  : Y`,
    `P    : Π`,      `Π  : P`,
    `S    : Σ`,      `Σ  : S`,
    `D    : Δ`,      `Δ  : D`,
    `F    : ϑ`,      `ϑ  : F`,
    `G    : Γ`,      `Γ  : G`,
    `J    : Φ`,      `Φ  : J`,
    `L    : Λ`,      `Λ  : L`,
    `X    : Ξ`,      `Ξ  : X`,
    `C    : Χ`,      `Χ  : C`,
    `V    : ς`,      `ς  : V`,
    `1    : °`,      `°  : 1`,
    `2    : ʾ`,      `ʾ  : 2`,
    `3    : ϵ`,      `ϵ  : 3`,
    `5    : ‰`,      `‰  : 5`,
    `sqrt : √`,      `√  : sqrt`,
    `(C)  : ©`,      `©  : (C)`,
    `(R)  : ®`,      `®  : (R)`,
    `(TM) : ™`,      `™  : (TM)`,
    `...  : …`,      `…  : ...`,
    `'    : "`,      `"  : '`,

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
