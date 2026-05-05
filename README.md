# FUMBBL BBCode

VS Code support and reference material for FUMBBL BBCode.

## Scope

Editor support for FUMBBL BBCode only. No rendering, live preview, or full semantic validation.

## Features

Current editor support includes:

- syntax highlighting for FUMBBL BBCode tags and attributes
- folding for paired `block` and `table` sections
- autocomplete for opening tags, closing tags, and common `tag=value` patterns

## Language Reference

See `docs/` for the FUMBBL BBCode reference used by this project.

## Third-Party Material

Some example `.bbcode` content in `tests/` was derived from
[FUMBBLPlus/BBCODE-examples](https://github.com/FUMBBLPlus/BBCODE-examples),
an archived repository released under the MIT License.

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
