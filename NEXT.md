# Next Ideas

## Current

Implemented:

- syntax highlighting
- folding for paired `block` and `table` sections
- autocomplete for opening tags, closing tags, and implicit-value patterns
- free-form completion for tags like `size=...`

## Next

Possible improvements:

- suggest attributes and block tokens by tag context
- add snippets for common documented patterns
- improve autocomplete for patterns like `block=center` and `table=automargin`
- consider indentation / formatting if real usage shows it is needed

Context examples:

- `[block ` suggests `width`, `bg`, `fg`, `id`, `group`, `tooltip`
- `[toggle ` suggests `label`, `block`, `group`, `width`
- `[td ` suggests `width`, `bg`, `colspan`, `rowspan`, `valign`

## Later

- preview if FUMBBL exposes a render endpoint
