# PowerGrid docs style guide

Rules for every page under `docs/`. The pilot pages (`docs/index.md`, `docs/get-started/introduction.md`) follow them.

## Tone and length

- No emojis: not in headings, sidebar labels, tables, buttons or body text. Use a plain word or a table instead of ✅.
- Short text. One idea per paragraph, two or three sentences max. Cut "simply", "just", "easily", "powerful".
- Second person, present tense: "Add the column", not "You will be able to add the column".
- Lead with the code. Show the snippet first, then one line on what it does.

## Structure

- Sentence-case headings: "Column summaries", not "Column Summaries".
- One `#` per page. `##` for tasks, `###` for variants of a task.
- Option lists and method references go in tables (`Method | Description`), not long bullet lists.
- Max two custom blocks (`::: tip`, `::: warning`, `::: info`, `::: success`) per page. If more are needed, the text is too long.
- Link to the page that owns a topic instead of repeating it.

## Code

- Every snippet must run on the documented version. Use the real class names (`PowerComponents\LivewirePowerGrid\Column`, `PowerGrid`, `Rule`, `Button`, `Tab`).
- Use language tags (`php`, `blade`, `bash`, `js`) and file titles where useful: ```` ```php [app/Livewire/DishTable.php] ````.
- Highlight the changed lines (`// [!code ++]`, `{3-5}`) when the snippet extends a previous one.
- Keep examples on one domain (dishes, categories, chefs) so readers do not relearn the schema per page.

## Screenshots

- Default: no screenshot. Prefer code, a table, or an HTML mock such as `<TablePreview />` (registered globally in `docs/.vitepress/theme`), because those follow the theme and never go stale.
- Use a screenshot only for things a mock cannot show (a browser download dialog, an IDE). Keep it in `docs/public/`, show light theme, crop to the relevant part, add alt text.
- Remove screenshots older than the documented version.

## Verify against source

- These docs cover 7.x. Check every method, option, config key and command against the latest released 7.x tag of `../powergrid` (currently `v7.0.1`; run `git tag --sort=-v:refname | grep '^v7'`, skip `-beta` tags), not a feature branch.
- Read without checking out: `git -C ../powergrid grep -n "function tabs" v7.0.1 -- src`.
- Macros on `Column` (such as `summarize()`) are declared as `@method` docblocks in `src/Column.php`.
- Theme classes live in `src/Themes/` (Tailwind, DaisyUI, Flux) and views in `resources/views/components/themes/`. Mocks like `<TablePreview />` should match those views.
- If a documented API no longer exists, remove it or move it to the upgrade guide. Do not leave it with a note.

## Theme

- Colors come from `--vp-c-*` tokens in `docs/.vitepress/theme/custom.css`. Do not hardcode colors in pages.
- Brand orange `#f69e08` is for buttons and accents. Text-sized brand color uses `--vp-c-brand-1` (AA contrast in light and dark).
