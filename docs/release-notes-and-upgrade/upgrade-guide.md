---
title: Upgrade Guide
description: Upgrade PowerGrid from v6 to v7. Covers breaking changes, the theme rewrite, the new filter state, assets, and configuration.
---

# Upgrade Guide

Upgrade PowerGrid from version 6 to version 7. If your tables only use `datasource()`, `fields()`, `columns()`, `filters()`, and `setUp()`, most of the work is dependencies and assets. Custom themes, published views, filter tests, and HTML fields need more attention.

[[toc]]

## Version Requirements

| Requirement  | v6       | v7                        |
| ------------ | -------- | ------------------------- |
| PHP          | 8.2+     | **8.3+**                  |
| Laravel      | 10+      | **12+** (13 is supported) |
| Livewire     | 3.5.4+   | **4.0+**                  |
| Tailwind CSS | v3 or v4 | **v4**                    |

::: tip
PowerGrid 6.11 already runs on Livewire 4. Upgrade Livewire first, confirm everything works, then move to PowerGrid 7.
:::

## Installation

```bash
composer require power-components/livewire-powergrid:^7.0
```

Composer also installs `power-components/turbine` and `power-components/partials`. For XLSX or CSV, require OpenSpout 5 (the v4 driver is gone):

```bash
composer require openspout/openspout:^5.0
```

Then compare your config with the new one (`--force` overwrites the file; commit first):

```bash
php artisan vendor:publish --tag=livewire-powergrid-config --force
```

## Summary of Changes

### Removed

| Feature | What to do instead |
| ------- | ------------------ |
| Bootstrap 5 theme, `Themes\Base` | Tailwind, DaisyUI, or Flux. Or a child theme with Bootstrap classes |
| `pg-primary-*` | `accent-*` from `tailwind4.css`. `pg-secondary-*` is unchanged |
| `PowerGrid::lazy()` (load more) | Pagination. Livewire `#[Lazy]` is unrelated and still works |
| Laravel Pulse integration | None |
| `theme_style()` | `theme()` |
| `isBootstrap5()` / `isTailwind()` | `app('powergrid.theme') instanceof Tailwind` (or `DaisyUI` / `Flux`) |
| `window.pgActions` / `window.pgActionsHeader` | Server-side Blade actions |
| `WithExport` trait | Remove it. `PowerGrid::exportable()` is enough |
| OpenSpout 4 (`openspout_v4`) | OpenSpout 5 (`openspout_v5`) |
| Built-in batch-export progress UI | `->progressView('your.view')` |
| `withSum()`, `withCount()`, `withAvg()`, `withMin()`, `withMax()` | `summarize()` / `withSummary()` |
| `filter_attributes` / `FilterAttributes` | `filter_wire` config or `filterWire()` |
| View namespace `components.frameworks.*` | `components.themes.*` and `components.structure.*` |
| Nested Livewire `powergrid-detail` | Detail rows render inline. `PowerGrid::detail()->view()` is unchanged |
| Pre-built `dist/` JS/CSS, Tailwind 3 | Import `resources/js/powergrid.js` (or `powergrid-flux.js`) and Tailwind 4 |
| Bundled TomSelect | Install TomSelect or SlimSelect and expose it on `window` |

### Changed

| Area | What changed |
| ---- | ------------ |
| Custom themes | `struct()` only sets `baseView`. Tokens live in section methods |
| Theme config | `'tailwind'`, `'daisyui'`, or `'flux'`, or an FQCN. Register names with `PowerGridManager::registerTheme()` |
| Filter placement | `inline`, `dropdown`, `flyout`, or `null`. `outside` is gone |
| Filter state | `$filters` is keyed by field: `['type', 'value', 'op'?]` |
| Dynamic filters | The value no longer filters the query on its own |
| Field HTML | Closure strings are escaped. Return `HtmlString`, or set `escape_closure_fields` to `false` |
| Plugin update hooks | Plugins call `onPluginUpdated()` only |
| Rows per page | Capped by `max_per_page` (1000), including "All" (`0`) |
| Editable / Toggleable views | Editable view under `powergrid-plugins`. The Toggleable switch has no view |
| Per-table theme | `template(): ?Theme`. `customThemeClass()` still works |

## JavaScript Import Path

🟥 Likelihood Of Impact: High

The pre-built `dist/powergrid` bundle is gone. Import the package source:

```javascript [resources/js/app.js]
import './../../vendor/power-components/livewire-powergrid/dist/powergrid' // [!code --]
import './../../vendor/power-components/livewire-powergrid/resources/js/powergrid.js' // [!code ++]
```

On Flux, import `powergrid-flux.js` instead (Flux uses `<flux:dropdown>` / `<flux:menu>`). Rebuild afterwards.

```javascript [resources/js/app.js]
import './../../vendor/power-components/livewire-powergrid/resources/js/powergrid-flux.js'
```

## CSS and Tailwind 4

🟥 Likelihood Of Impact: High

PowerGrid 7 requires Tailwind 4 and no longer ships compiled CSS. If you already import `resources/css/tailwind4.css`, keep it. From Tailwind 3 / `dist/tailwind.css`: add `@tailwindcss/vite`, drop a Tailwind-only `postcss.config.js`, and remove `presets` that pointed at `vendor/**/tailwind.config.js`.

Tailwind theme — `tailwind4.css` also `@source`s the package (files under `app/` are picked up automatically):

```css [resources/css/app.css]
@import "tailwindcss";
@import "../../vendor/power-components/livewire-powergrid/resources/css/tailwind4.css";
```

DaisyUI or Flux — do **not** import `tailwind4.css`. Use [Configure PowerGrid](/get-started/configure-powergrid.html#_3-import-theme-assets) and `@source` the package (`vendor/` is gitignored):

```css [resources/css/app.css]
@source "../../vendor/power-components/livewire-powergrid/src/**/*.php";
@source "../../vendor/power-components/livewire-powergrid/resources/views/**/*.php";
```

`pg-primary-*` is gone. The Tailwind theme uses `accent-*` (green by default). Redefine `--color-accent-*` in `@theme`, and replace `pg-primary-*` classes in your own views. `--color-pg-secondary-*` (blue) is still defined in `tailwind4.css`.

## Bootstrap 5 Removed

🟥 Likelihood Of Impact: High

```php [config/livewire-powergrid.php]
'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class, // [!code --]
'theme' => 'tailwind', // [!code ++]
```

Remove `dist/bootstrap5.css`. `Themes\Base` is gone. To keep Bootstrap classes, write a [custom theme](#custom-themes) with `$parentTheme = Tailwind::class`. Markup is still the Tailwind markup.

## Custom Themes

🟥 Likelihood Of Impact: High

v6 returned a flat array per group (`table()`, `checkbox()`, `searchBox()`, …). v7: `struct()` only sets `baseView`; each group is a section method returning `['<group>' => [...]]`. `checkbox`/`radio` live in `table()`, the search box in `header()`, all filter types in `filter()`. Set `$parentTheme = Tailwind::class` and override only what you change. Drop `public string $name` — `Theme::name()` uses the class name.

::: code-group

```php [v6]
class MyTheme extends Tailwind
{
    public function table(): array {}
    public function footer(): array {}
    public function checkbox(): array {}
    public function searchBox(): array {}
}
```

```php [v7]
use PowerComponents\LivewirePowerGrid\Themes\Components;
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;
use PowerComponents\LivewirePowerGrid\Themes\Theme;

class MyTheme extends Theme
{
    protected ?string $parentTheme = Tailwind::class;

    protected function baseView(): string
    {
        return 'livewire-powergrid::components.themes.tailwind';
    }

    public function struct(): Components\ThemeBuilder
    {
        return Components\ThemeBuilder::make($this->name())
            ->baseView($this->baseView());
    }

    public function table(): array
    {
        return $this->section('table', fn (Components\Table $table) => $table
            ->layout(fn (Components\Layout $layout) => $layout
                ->th('font-semibold px-3 py-3 text-left text-xs')
                ->td('px-3 py-2 whitespace-nowrap')
            )
        );
    }
}
```

:::

Section methods: `layout()`, `header()`, `table()`, `footer()`, `cols()`, `tabs()`, `filter()`, `editable()`, `toggleable()`. DaisyUI ships no Blade files. Flux ships `<flux:*>` Blade only where the HTML differs.

Builder methods are camelCase (`->thActions()`); stored keys are snake_case (`th_actions`). Use snake_case in `theme()`, `merge()`, `theme_overrides`, and array sections — a camelCase array key is ignored. See [Custom Theme](/extending/custom-theme.html).

### Where v6 keys went

| v6 | v7 token |
| -- | -------- |
| `table.header.thead` | `table.layout.thead` |
| `table.header.tr` | `table.layout.thead_tr` |
| `table.header.th` | `table.layout.th` |
| `table.header.thAction` | `table.layout.th_actions` |
| `table.body.tbody` | `table.layout.tbody` |
| `table.body.tr` | `table.layout.tr` |
| `table.body.td` | `table.layout.td` |
| `table.body.tdActionsContainer` | `table.body.td.actions_wrapper` |
| `table.body.tdEmpty` | `table.layout.empty_state` |
| `table.body.trFilters` / `tdFilters` | `table.body.tr.filters` / `table.body.td.filters` |
| `table.layout.actions` | `header.layout.actions` |
| `checkbox.*` / `radio.*` | `table.checkbox.*` / `table.radio.*` |
| `searchBox.input` / `iconSearch` / `iconClose` | `header.search_box.input` / `icon_search` / `icon_close` |
| `footer.footer` | `footer.layout.container` |
| `footer.select` | `footer.layout.select` |
| `footer.footer_with_pagination` | `footer.pagination` (view, not a class token) |
| `filterInputText.*`, `filterBoolean.*`, … | `filter.input_text.*`, `filter.boolean.*`, … |

`table.body.td.actions_wrapper` has no builder method. Set it in an array section, `merge()`, or `theme_overrides`.

### Keys with no v7 equivalent

Delete these:

- `table.layout.base`, `table.layout.div`
- `table.body.tbodyEmpty`, `tdSummarize`, `trSummarize`
- `editable.view` — the plugin renders `powergrid-plugins::Editable.index`
- `toggleable.view` — style the switch with `color_on`, `color_off`, `color_on_dark`, `color_off_dark`, `knob_on`
- `filter.multi_select.view` — markup is always `<x-livewire-powergrid::inputs.select>`

## Theme Binding

🟩 Likelihood Of Impact: Low

```php [app/Livewire/ProductTable.php]
use App\PowerGridThemes\MyTheme;
use PowerComponents\LivewirePowerGrid\Themes\Theme;

public function customThemeClass(): ?string // [!code --:4]
{
    return MyTheme::class;
}
public function template(): ?Theme // [!code ++:4]
{
    return new MyTheme();
}
```

`customThemeClass()` still works; `template()` wins when both are set. To change a few tokens without a class:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;
use PowerComponents\LivewirePowerGrid\Themes\Theme;

public function template(): ?Theme
{
    return Tailwind::make()->merge([
        'table' => [
            'layout' => [
                'tr' => 'border-b hover:bg-yellow-50',
            ],
        ],
    ]);
}
```

To select a custom theme by name: `PowerGridManager::registerTheme('brand', BrandTheme::class)` then `'theme' => 'brand'`. Built-in names are in `PowerGridManager::DEFAULT_THEMES` (`tailwind`, `daisyui`, `flux`).

## Helper Functions

🟩 Likelihood Of Impact: Low

`theme()` reads the active theme by dot path; there is no `$theme` token array. `theme_view('header')` returns the resolved view name. `isBootstrap5()`, `isTailwind()`, and the `once()` polyfill are gone — use Laravel's `once()`.

::: code-group

```blade [v6]
<td class="{{ theme_style($theme, 'table.body.td') }}">
@if($theme['name'] === 'tailwind')
```

```blade [v7]
<td class="{{ theme('table.layout.td') }}">
@if(app('powergrid.theme') instanceof \PowerComponents\LivewirePowerGrid\Themes\Tailwind)
```

:::

`Theme::name()` is the kebab-case class short name (`tailwind`, `flux`, `daisy-u-i`). Prefer `instanceof`.

## Published Views

🟧 Likelihood Of Impact: Medium

| v6 | v7 |
| -- | -- |
| `resources/views/vendor/livewire-powergrid/components/frameworks/tailwind/` | `resources/views/vendor/livewire-powergrid/components/themes/tailwind/` |

Shared layout lives in `components/structure/`. A theme ships Blade only when the HTML differs. DaisyUI ships none.

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```

::: danger
Published views are a frozen copy. Prefer theme tokens.
:::

If you keep them: republish from v7 (do not move v6 files), remove Bootstrap conditionals, replace `theme_style()` with `theme()`, stop using a `$theme` token array, and delete published `livewire/detail.blade.php`.

## Filter Placement

🟧 Likelihood Of Impact: Medium

`outside` is no longer valid. Filters just stop showing. Dropdown and flyout write to `draftFilters` and commit on `applyFilters()`.

```php [config/livewire-powergrid.php]
'filter' => 'outside', // [!code --]
'filter' => 'inline', // [!code ++]
```

| Value | Behavior |
| ----- | -------- |
| `inline` | Inside the table. Filters as you type. |
| `dropdown` | Popover on a Filter button. Applied on "Apply". |
| `flyout` | Side drawer. Applied on "Apply". |
| `null` | No filter UI. |

```php [config/livewire-powergrid.php]
'filter_flyout' => [
    'position' => 'right', // 'left' or 'right'
    'close_on_escape' => true,
    'close_on_click_outside' => true,
],
```

Per table:

```php [app/Livewire/ProductTable.php]
public function boot(): void
{
    config(['livewire-powergrid.filter' => 'flyout']);

    parent::boot();
}
```

## Filter State

🟥 Likelihood Of Impact: High

v6 grouped `$filters` by type (`filters.input_text.name`). v7 groups by field. Old paths do not throw — they just stop filtering.

```php
$this->filters['name'] = [
    'type' => 'input_text',
    'value' => 'pizza',
    'op' => 'contains',
];
```

### Tests

```php [tests/Feature/ProductTableTest.php]
Livewire::test(ProductTable::class)
    ->set('filters.input_text.name', 'pizza') // [!code --]
    ->set('filters.name.value', 'pizza') // [!code ++]
    ->assertSee('Pizza');
```

| Filter | v6 path | v7 path |
| ------ | ------- | ------- |
| Text value | `filters.input_text.name` | `filters.name.value` |
| Text operator | `filters.input_text_options.name` | `filters.name.op` |
| Number range | `filters.number.price.start` | `filters.price.value.start` / `.value.end` |
| Boolean | `filters.boolean.in_stock` | `filters.in_stock.value` |
| Select | `filters.select.category_id` | `filters.category_id.value` |

Table updates now send partial HTML, so `Livewire::test()` assertions see stale rows. Add `<env name="POWERGRID_PARTIALS_ENABLED" value="false"/>` to `phpunit.xml`. See [Testing Tables](/powergrid/testing-tables.html#livewire-testing).

Dropdown and flyout: set the draft, then apply:

```php [tests/Feature/ProductTableTest.php]
Livewire::test(ProductTable::class)
    ->set('draftFilters.name.value', 'pizza')
    ->call('applyFilters')
    ->assertSee('Pizza');
```

### Dynamic filters

A `Filter::dynamic()` bound to a built-in path such as `filters.select.in_stock` no longer runs as that filter type. The value lands in `filters.in_stock.value` with type `dynamic`. Apply it yourself:

```php [app/Livewire/ProductTable.php]
public function datasource(): Builder
{
    $inStock = data_get($this->filters, 'in_stock.value');

    return Product::query()
        ->when(filled($inStock), fn ($query) => $query->where('in_stock', $inStock));
}

public function filters(): array
{
    return [
        Filter::dynamic('in_stock', 'in_stock')
            ->component('select')
            ->attributes([
                'wire:model.live' => 'filters.in_stock.value', // [!code ++]
                // ...
            ]),
    ];
}
```

### Hooks and methods

| v6 | v7 |
| -- | -- |
| `afterChangedInputTextFilter()`, `afterChangedSelectFilter()`, and the other `afterChanged*Filter()` hooks | `afterFilterChanged(string $field, array $record)` |
| `filterInputText()`, `filterInputTextOptions()`, `filterSelect()`, `filterBoolean()`, `filterNumberStart()`, `filterNumberEnd()` | `putFilterRecord()` then `commitFilters()` |

`multiSelectChanged()` stays.

### Filter bindings

`filter_attributes` and the `FilterAttributes` classes are gone. Set modifiers in `filter_wire`, or return the same array from `filterWire()` (slots: `value`, `operator`, `start`, `end`, `formatted`):

```php [config/livewire-powergrid.php]
'filter_wire' => [
    'input_text' => ['value' => 'live.debounce.800ms'],
],
```

### Saved state

Persist still uses cookies (default), session, or cache. v7 restores the payload and canonicalizes `$filters` into field records that must include `type`. v6 filters were keyed by type, so those saved filters are not applied. Sorting and column visibility still restore when the payload uses the same keys.

Persistence is now **on by default**. Every table persists `columns`, `filters`, and `sorting` without calling `persist()`. Storage keys use a `pg7:` prefix, so state saved by v6 is ignored on the first visit. Opt out per table:

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    $this->withoutPersist();                // persist nothing
    // $this->withoutPersist(['filters']);  // keep columns and sorting

    return [/* ... */];
}
```

## Lazy Loading

🟧 Likelihood Of Impact: Medium

`PowerGrid::lazy()`, `LazyManager`, `loadMore()`, `hasLazyEnabled()`, `getLazyKeys()`, and `canLoadMore()` are gone. Livewire's `#[Lazy]` is unrelated and still works.

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    return [
        PowerGrid::lazy() // [!code --]
            ->rowsPerChildren(25), // [!code --]
        PowerGrid::footer() // [!code ++]
            ->showPerPage(25, [10, 25, 50, 100]), // [!code ++]
    ];
}
```

A page also loads at most `max_per_page` rows (default 1000), including the "All" option (`0`) in `showPerPage()`. Set the config to `0` to remove the cap.

## Export Setup

🟥 Likelihood Of Impact: High

Remove `WithExport`. `PowerGrid::exportable()` in `setUp()` is enough.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Traits\WithExport; // [!code --]
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    use WithExport; // [!code --]

    public function setUp(): array
    {
        return [
            PowerGrid::exportable('my-export-file')
                ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
        ];
    }
}
```

Export classes moved to `Plugins`. Only OpenSpout 5 remains. v6 defaulted to `openspout_v4`:

```php [config/livewire-powergrid.php]
use PowerComponents\LivewirePowerGrid\Components\Exports\OpenSpout\v5\{ExportToCsv, ExportToXLS}; // [!code --]
use PowerComponents\LivewirePowerGrid\Plugins\Export\OpenSpout\v5\{ExportToCsv, ExportToXLS}; // [!code ++]

'exportable' => [
    'default' => 'openspout_v4', // [!code --]
    'default' => 'openspout_v5', // [!code ++]
    'openspout_v5' => [
        'xlsx' => ExportToXLS::class,
        'csv' => ExportToCsv::class,
    ],
    'openspout_v4' => [...], // [!code --]
],
```

OpenSpout is only suggested by Composer. Without `openspout/openspout` installed (and no custom XLSX exporter in `exportable`), the XLS option is hidden from the export dropdown. Custom exporters mapped in `exportable` are used for both synchronous and queued exports.

Queued (batch) exports show no progress bar unless you pass `->progressView('your.view')`. The view receives `$exportState` and `$tableName`. See [Exporting Data](/data-management/exporting-data.html).

## Field HTML Requires HtmlString

🟥 Likelihood Of Impact: High

v7 escapes plain string field values with `e()`. HTML that used to render now shows as text. Escape user data inside the `HtmlString` yourself. Search `fields()` for `return '<` and `Blade::render(`. To keep v6 behavior while you migrate, set `'escape_closure_fields' => false`. See [HTML shows up as text in a cell](#html-shows-up-as-text-in-a-cell).

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\HtmlString;

->add('status_badge', fn ($product): string => $this->statusBadge($product->in_stock)); // [!code --]
->add('status_badge', fn ($product): HtmlString => new HtmlString( // [!code ++:3]
    '<span class="badge">'.e($product->in_stock ? 'Yes' : 'No').'</span>'
));
```

## Column Summaries

🟧 Likelihood Of Impact: Medium

```php [app/Livewire/ProductTable.php]
Column::make('Price', 'price')
    ->withSum('Sum Price', header: true, footer: false) // [!code --]
    ->summarize('sum', 'Sum Price', header: true, footer: false) // [!code ++]
```

`summarize()` accepts `sum`, `count`, `avg`, `min`, and `max`. For a custom calculation, use `withSummary($key, $label, Closure $using)`.

## Plugin Update Hooks

🟥 Likelihood Of Impact: High

Editable and Toggleable call only `onPluginUpdated()`. `onUpdatedEditable()` and `onUpdatedToggleable()` are deprecated and never called, so overriding them does nothing.

```php [app/Livewire/ProductTable.php]
public function onUpdatedEditable(string|int $id, string $field, string $value): void // [!code --:6]
{
    Product::query()->find($id)->update([
        $field => $value,
    ]);
}
public function onPluginUpdated(string $plugin, string $event, array $params): void // [!code ++:8]
{
    if (in_array($plugin, ['editable', 'toggleable']) && $event === 'updated') {
        Product::query()->find($params['id'])->update([
            $params['field'] => $params['value'],
        ]);
    }
}
```

`$params` contains `id`, `field`, and `value`. Built-in plugins live in `PowerGridManager::DEFAULT_PLUGINS`; `plugins()` merges extras and never drops the defaults.

## Server-Side Actions

🟩 Likelihood Of Impact: Low

Actions render as Blade on the server. `window.pgActions` / `window.pgActionsHeader` are gone. Switch custom JS to Livewire events, or use `Button` and `actionRules()`:

```php [app/Livewire/ProductTable.php]
public function actions($row): array
{
    return [
        Button::add('edit')
            ->slot('Edit')
            ->class('text-indigo-600')
            ->dispatch('edit', ['rowId' => $row->id]),
    ];
}
```

## Editable and Toggleable Views

🟩 Likelihood Of Impact: Low

To override the editable cell, place `resources/views/vendor/powergrid-plugins/Editable/index.blade.php` (it replaces v6 `components/frameworks/tailwind/editable.blade.php`). It is not in the `livewire-powergrid-views` tag.

The toggleable switch is built in PHP, so there is no view to override. Style it with the `toggleable` tokens (`color_on`, `color_off`, `color_on_dark`, `color_off_dark`, `knob_on`). See [Plugins](/extending/plugin-system.html).

## Multi-Select Libraries

🟧 Likelihood Of Impact: Medium

PowerGrid does not bundle TomSelect and does not inject TomSelect or SlimSelect from a CDN. Install the library and expose it on `window`:

```bash
npm install tom-select
```

```javascript [resources/js/app.js]
import TomSelect from 'tom-select'
window.TomSelect = TomSelect
```

For SlimSelect: `npm install slim-select` and `window.SlimSelect = SlimSelect`. If the library is missing, the filter does not load and the console says what to install.

The `plugins.select.slim` and `plugins.select.tom` arrays are now passed to the library constructor as options. The v6 `cdn` and `css` keys are gone — remove them, or they reach the constructor as unknown options.

## Date Picker

🟧 Likelihood Of Impact: Medium

`Filter::datetime()` and `Filter::date()` use flatpickr, which is not bundled. Install it and expose it on `window`:

```bash
npm install flatpickr
```

```javascript [resources/js/app.js]
import flatpickr from 'flatpickr'
window.flatpickr = flatpickr
```

Import flatpickr's CSS as well. Without `window.flatpickr` the date filter stays a plain input and the console says what to add.

The `timezone` param is now honored: the picked range is read in that timezone and converted to `app.timezone` before it reaches the query or your `builder()`. In v6 it was ignored. If you converted the range yourself, drop that code or the shift is applied twice.

`plugins.select.default` still chooses `tom` or `slim`. The default is now `slim` — set it back to `tom` if you republish the config and use TomSelect.

## Other Changes

🟩 Likelihood Of Impact: Low

- **Pulse:** remove `public bool $measurePerformance = true;`, `PowerGridPerformanceRecorder::class` from `config/pulse.php`, `POWERGRID_RECORD_ENABLED`, and `<livewire:powergrid-performance-card />`.
- **Detail rows:** `powergrid-detail` is gone. Rows render in the table body. Remove `<livewire:powergrid-detail>` and published `livewire/detail.blade.php`. `PowerGrid::detail()->view()` is unchanged.
- **Empty state:** `noDataLabel()` still works but is deprecated. Override `renderEmptyState()`.
- **Row templates:** `rowTemplates()` and `Column::template()` stay. They render on the server with escaped values. `pg-render-row-template.js` and `window.pgRowTemplates_*` are gone.
- **Icons:** `icon_resources` is gone, so v6 aliases such as `->icon('default-trash')` no longer resolve. Pass a Blade component name instead: `->icon('svg.trash')` for `resources/views/components/svg/trash.blade.php`.
- **Internal row keys:** `__powergrid_rules`, `__powergrid_loop`, and `__powergrid_actions` were renamed to `__turbine_*`.

## Configuration File

### Removed keys

```php [config/livewire-powergrid.php]
'icon_resources' => [...], // [!code --]
'filter_attributes' => [...], // [!code --]
'exportable' => [
    'openspout_v4' => [...], // [!code --]
],
```

### New keys

```php [config/livewire-powergrid.php]
'theme_overrides' => [
    // 'table' => ['layout' => ['th' => 'font-bold px-4 py-3']],
],

'filter_flyout' => [
    'position' => 'right',
    'close_on_escape' => true,
    'close_on_click_outside' => true,
],

'filter_wire' => [
    // 'input_text' => ['value' => 'live.debounce.800ms'],
],

'max_per_page' => 1000,
```

### Changed keys

- `theme` accepts `'tailwind'`, `'daisyui'`, `'flux'`, or an FQCN.
- `plugins.select.default` is `'slim'`.
- `plugins.select.slim` / `plugins.select.tom` hold constructor options only (`cdn` / `css` removed).
- `exportable` points at `Plugins\Export\OpenSpout\v5`.

## Public API

`datasource()`, `fields()`, `columns()`, `filters()`, `setUp()`, `Column`, `Button`, and the `PowerGrid`, `Filter`, and `Rule` facades work as before. Classes that moved into `power-components/turbine` still resolve under `PowerComponents\LivewirePowerGrid\...`. See [Portable Grid Definitions](/extending/portable-grid-definitions.html) if the same grid also feeds Inertia or a REST endpoint.

## Pre-Migration Checklist

```bash
grep -rn "theme_style\|isBootstrap5\|isTailwind" app/ resources/
grep -rn "PowerGrid::lazy\|LazyManager\|loadMore" app/
grep -rn "window.pgActions" resources/
grep -rn "WithExport\|measurePerformance" app/
grep -rn "Themes\\\\Bootstrap5\|Themes\\\\Base" app/ config/
grep -rn "powergrid-detail" app/ resources/
grep -rn "livewire-powergrid/dist" resources/
grep -rn "Components\\\\Exports\\\\OpenSpout\|filter_attributes" app/ config/
grep -rn "'filter' => 'outside'" app/ config/
grep -rn "withSum\|withCount\|withAvg\|withMin\|withMax" app/
grep -rn "onUpdatedEditable\|onUpdatedToggleable\|afterChanged" app/
grep -rn "Filter::dynamic" app/
grep -rn "filters\.\(input_text\|select\|number\|boolean\|multi_select\|datetime\|date\)" app/ tests/ resources/
grep -rn "pg-primary" app/ resources/
find resources/views/vendor/livewire-powergrid/components/frameworks -type f
```

- [ ] Custom themes rewritten with section methods and snake_case keys
- [ ] Published views republished from v7, nothing left in `frameworks/`
- [ ] `PowerGrid::lazy()` removed
- [ ] `WithExport` removed, export classes point to `Plugins\Export\OpenSpout\v5`
- [ ] HTML in `fields()` wrapped in `HtmlString` (or `escape_closure_fields` set to `false`)
- [ ] `withSum()` and friends replaced with `summarize()`
- [ ] `onUpdatedEditable()` / `onUpdatedToggleable()` moved to `onPluginUpdated()`
- [ ] Filter paths updated in tests, and dynamic filters applied in code
- [ ] JS and CSS import from `resources/js` and `resources/css`
- [ ] `filter` config is `inline`, `dropdown`, `flyout`, or `null`
- [ ] Tables that must not remember state call `withoutPersist()`
- [ ] flatpickr / TomSelect / SlimSelect exposed on `window` when used
- [ ] Pulse integration removed

## Step-by-Step Order

1. Upgrade PHP, Laravel, Livewire, and Tailwind to the versions above
2. Run `composer require power-components/livewire-powergrid:^7.0`
3. Merge the new config keys
4. Update the Vite entry (`powergrid.js` or `powergrid-flux.js`) and the CSS, then rebuild
5. Rewrite custom themes
6. Republish views if you need them, and replace the old helpers
7. Remove lazy loading
8. Remove `WithExport` and update export classes
9. Wrap HTML fields in `HtmlString`, or set `escape_closure_fields` to `false`
10. Replace summaries and plugin update hooks
11. Fix filter placement, filter paths, dynamic filters, and tests
12. Open every table and try sorting, filtering, pagination, export, editing, and toggles

## Troubleshooting

### Target class [...\Themes\Bootstrap5] does not exist

Set `'theme' => 'tailwind'` (or `daisyui` / `flux`) in `config/livewire-powergrid.php`.

### Unable to find component: [powergrid-detail]

Remove `<livewire:powergrid-detail>` and any published `livewire/detail.blade.php`.

### Call to undefined function theme_style()

Use `theme('table.layout.td')`: a dot path, no `$theme` argument.

### Call to undefined method ...PowerGridManager::lazy()

Remove it and use `PowerGrid::footer()->showPerPage()`.

### Method ...Column::withSum does not exist

Use `->summarize('sum', 'Label')`.

### View [components.frameworks.tailwind.header] not found

The namespace is now `components.themes`.

### HTML shows up as text in a cell

The cell shows markup like `<span class="badge">Yes</span>` instead of a badge. v7 escapes strings returned by `fields()` closures.

Return an `HtmlString` from the closure:

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\HtmlString;

->add('status_badge', fn ($product): string => Blade::render( // [!code --]
->add('status_badge', fn ($product): HtmlString => new HtmlString(Blade::render( // [!code ++]
    '<span class="badge">{{ $label }}</span>',
    ['label' => $product->in_stock ? 'Yes' : 'No'],
)); // [!code --]
))); // [!code ++]
```

Or keep v6 behavior for every table while you migrate. Closure strings then render as raw HTML, so escape user data with `e()` yourself:

```php [config/livewire-powergrid.php]
'escape_closure_fields' => false,
```

### Inline edits or toggles don't save

Move your code from `onUpdatedEditable()` / `onUpdatedToggleable()` to `onPluginUpdated()`.

### Filters don't apply

Use the new paths, for example `filters.name.value`. For dropdown and flyout, set `draftFilters.*` and call `applyFilters()`. Dynamic filters must be applied in your own code.

### A theme token has no effect

Use the snake_case key (`th_actions`, not `thActions`) in arrays, `merge()`, and `theme_overrides`.

### pgFlatpickr, pgExport, or pgTomSelect is not defined

Import `resources/js/powergrid.js` (or `powergrid-flux.js`) and rebuild. Also install and expose any third-party library you use: flatpickr, TomSelect, or SlimSelect.

### Styles are missing after the upgrade

On Tailwind, import `tailwind4.css`. On DaisyUI or Flux, add the `@source` lines for the package from [CSS and Tailwind 4](#css-and-tailwind-4). Tailwind skips `vendor/` otherwise.
