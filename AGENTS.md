# AGENTS.md

## Purpose

This repository contains tooling for FUMBBL BBCode, primarily a VS Code extension and related parsing/highlighting support.

## Source Of Truth

Use only the files in `docs/` when reasoning about the language.

Files:

- `docs/tags.txt`
- `docs/block-system.txt.txt`
- `docs/patterns.txt.txt`

Do not invent tags, attributes, flags, or structural rules not supported by those files.

## Working Rules

- Prefer read-only analysis unless the user explicitly asks for edits.
- Prefer `rg`, `Get-ChildItem`, `Get-Content`, `git status`, and `git diff`.
- Avoid complex shell commands unless necessary.
- Prefer multiple simple commands over one complex command.

## Language Rules

Treat FUMBBL BBCode as a structured tag language.

Priorities:

- accuracy
- extraction
- structure
- consistency with `docs/`

Avoid:

- speculation
- redesigning the language
- introducing undocumented syntax

## Extension Guidance

For syntax work:

- prefer stable lexical highlighting over structural pairing
- do not assume tags form well-nested multiline regions unless supported by `docs/`
- prefer patterns from `docs/patterns.txt.txt` over inferred behavior

For parser/tooling work:

- use only documented tags from `docs/tags.txt`
- use documented block variants/attributes/flags from `docs/block-system.txt.txt`

## Collaboration Preference

- Default to analysis and recommendations.
- Do not modify files unless explicitly asked.
- When suggesting changes, prefer concise diffs/snippets with file references.
