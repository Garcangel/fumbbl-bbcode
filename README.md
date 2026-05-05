# FUMBBL BBCode

VS Code support and reference material for FUMBBL BBCode.

## Scope

This project focuses on editor support for FUMBBL BBCode, including:

- syntax highlighting
- folding
- language tooling

It does not aim to provide:

- BBCode rendering
- live preview
- full semantic validation

## About FUMBBL BBCode

FUMBBL BBCode is a custom tag-based layout language used on FUMBBL. It is not standard BBCode.

Common structural tags include:

- `block`
- `toggle`
- `table`

See `docs/` for the language reference used by this project.

## Third-Party Material

Some example `.bbcode` content in `tests/` was derived from
[FUMBBLPlus/BBCODE-examples](https://github.com/FUMBBLPlus/BBCODE-examples),
an archived repository released under the MIT License.

Use this as plain text and format it yourself in the file:

## Local Testing

To run the extension in a development host, open the repo in VS Code and press `F5`.

## Packaging

Install dependencies:

`npm install`

Create a local installable package:

`npm run package`

This generates a `.vsix` file in the project root.

## Installing the Extension

In VS Code, run `Extensions: Install from VSIX...` and select the generated `.vsix` file.
