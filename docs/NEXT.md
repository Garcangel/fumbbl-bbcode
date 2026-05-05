# Next Ideas

## Autocomplete

Highest-value next feature.

Goals:

- autocomplete tag names after `[`
- insert paired tags automatically
- suggest closing tags after `[/`
- suggest common attributes/tokens by tag context
- support documented implicit-value patterns like `block=center`

Plain tag examples:

- `[bl` -> `[block][/block]`
- `[ta` -> `[table][/table]`
- `[tr` -> `[tr][/tr]`
- `[td` -> `[td][/td]`

Pattern examples:

- `block=center` -> `[block=center][/block]`
- `block=hidden` -> `[block=hidden][/block]`
- `block=panel` -> `[block=panel][/block]`
- `block=floatcontainer` -> `[block=floatcontainer][/block]`
- `table=automargin` -> `[table=automargin][/table]`

Context examples:

- `[block ` suggests `width`, `bg`, `fg`, `id`, `group`, `tooltip`
- `[toggle ` suggests `label`, `block`, `group`, `width`
- `[td ` suggests `width`, `bg`, `colspan`, `rowspan`, `valign`

## Later

- snippets
- indentation / formatting
- preview if FUMBBL exposes a render endpoint
