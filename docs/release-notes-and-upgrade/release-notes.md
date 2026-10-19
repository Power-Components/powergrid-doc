---
title: Release Notes
description: Stay up to date with PowerGrid 7. Explore the new theme system, plugins, filter panels, and the changes designed to simplify your tables.
---

# Release Notes

What is new in PowerGrid 7. For every breaking change and migration snippet, use the [Upgrade Guide](/release-notes-and-upgrade/upgrade-guide.html).

[[toc]]

## PowerGrid 7

Themes are built from section methods and inherit from each other. Inline editing, toggles, export, tabs, and truncation are plugins. Sorting, filtering, and paging update only the parts of the table that changed.

## Requirements

| Requirement  | v6       | v7                        |
| ------------ | -------- | ------------------------- |
| PHP          | 8.2+     | **8.3+**                  |
| Laravel      | 10+      | **12+** (13 is supported) |
| Livewire     | 3.5.4+   | **4.0+**                  |
| Tailwind CSS | v3 or v4 | **v4**                    |

`composer require power-components/livewire-powergrid:^7.0` also installs `power-components/turbine` and `power-components/partials`.

## New Features

### Unified Theme Architecture

`struct()` only sets the base view. Tokens live in section methods: `layout()`, `header()`, `table()`, `footer()`, `cols()`, `tabs()`, `filter()`, `editable()`, and `toggleable()`. A child theme sets `$parentTheme` and overrides only the sections it changes.

DaisyUI ships no Blade files — it reuses Tailwind markup and changes tokens. Flux has `<flux:*>` Blade files only where the HTML differs.

Restyle a few tokens with `theme_overrides` in the config, or write a plain-array theme with `ArrayTheme`. See [Custom Theme](/extending/custom-theme.html).

### Theme Registry

`config('livewire-powergrid.theme')` accepts a name from `PowerGridManager::DEFAULT_THEMES` (`tailwind`, `daisyui`, `flux`) or an FQCN:

```php [config/livewire-powergrid.php]
'theme' => 'tailwind',
// 'theme' => 'daisyui',
// 'theme' => 'flux',
// 'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class,
```

Register your own name:

```php [app/Providers/AppServiceProvider.php]
use App\PowerGridThemes\BrandTheme;
use PowerComponents\LivewirePowerGrid\PowerGridManager;

public function boot(): void
{
    PowerGridManager::registerTheme('brand', BrandTheme::class);
}
```

### Modular Plugin System

`PowerGridManager::DEFAULT_PLUGINS` is always registered. `PowerGridManager::plugins()` merges extras on top and never drops the defaults:

| Plugin | What it adds |
| ------ | ------------ |
| `EditablePlugin` | `Column::editOnClick()` |
| `ToggleablePlugin` | `Column::toggleable()` |
| `FlatpickrPlugin` | Date and date-time filters |
| `MultiSelectPlugin` | Multi-select filters with TomSelect or SlimSelect |
| `ExportPlugin` | Header export UI when `PowerGrid::exportable()` is set |
| `FilterBuilderPlugin` | AND / OR filter modal |
| `TabsPlugin` | Status tabs above the toolbar |
| `TruncatePlugin` | `Column::limit()` and `Column::tooltip()` |

See [Plugins](/extending/plugin-system.html).

### Filter Panels

- `inline` — inside the table, live and debounced
- `dropdown` — popover on a Filter button, committed on Apply
- `flyout` — side drawer, committed on Apply

See [Filters](/table-structure/filters.html).

### Partials and Hot Zones

`power-components/partials` updates only the fragments that changed. See [Partials and Hot Zones](/extending/partials-and-hot-zones.html).

### Server-Side Action Rendering

Row and header actions render as Blade on the server. `window.pgActions` and `window.pgActionsHeader` are gone.

### PowerGrid Lite

`<x-pg-*>` Blade components use the active theme for simple tables that do not need the full engine. See [PowerGrid Lite](/powergrid-lite/blade-components.html).

### Status Tabs

`PowerGrid::tabs()` adds a themed tab strip above the toolbar. `classes()` restyles it per grid. See [Tabs](/table-structure/tabs.html).

### Filter Builder

`PowerGrid::filterBuilder()` opens a modal where users compose AND / OR conditions from your `filters()` definitions. See [Filter Builder](/table-structure/filter-builder.html).

### Configurable Header Buttons

Header buttons resolve icon, title, and label from `setUp()`, then the theme token, then the package default. An icon is a Blade component name; an unknown one renders nothing. See [Header and Footer](/table-structure/header-and-footer.html#header-element-configuration).

### Laravel Boost Skills

Agent Skills for [Laravel Boost](https://laravel.com/docs/boost) ship in `resources/boost/skills`: `powergrid-theme`, `upgrade-theme-v6-to-v7`, and `create-powergrid-plugin`. See [AI Tools and Skills](/build-with-ai/tools-and-skills.html).

### Portable Grid Definitions

If the same grid also feeds Inertia or a REST endpoint, describe it once and swap the adapter. See [Portable Grid Definitions](/extending/portable-grid-definitions.html).

### Other Changes

- Plain string field values are escaped. Return `HtmlString` for markup.
- `max_per_page` (default `1000`) caps the rows a page loads, including "All".
- Changing rows per page keeps the selected rows.

## Removed in v7

See the [Upgrade Guide](/release-notes-and-upgrade/upgrade-guide.html) for replacements.

- Bootstrap 5 theme and `Themes\Base`
- `PowerGrid::lazy()` load-more API (Livewire `#[Lazy]` still works)
- Laravel Pulse integration
- `WithExport` trait (`PowerGrid::exportable()` is enough)
- OpenSpout 4 export driver
- Built-in batch-export progress UI — use `->progressView()`
- `withSum()`, `withCount()`, `withAvg()`, `withMin()`, `withMax()` — use `summarize()` / `withSummary()`
- `theme_style()` — use `theme()`. `isBootstrap5()` / `isTailwind()` — use `instanceof`
- `pg-primary-*` — Tailwind uses `accent-*`. `pg-secondary-*` still exists in `tailwind4.css`
- `window.pgActions` / `window.pgActionsHeader`
- Nested Livewire `powergrid-detail`
- View namespace `components.frameworks.*`
- `filter_attributes` (use `filter_wire`)
- Bundled TomSelect
- Tailwind 3 and the pre-built `dist/` bundles

## Unchanged Core API

- `datasource()`, `fields()`, `columns()`, `filters()`, `setUp()`
- `Column::make()` / `Column::add()`
- `Button::add()` fluent API
- Filter types: InputText, Boolean, Select, MultiSelect, Number, DatePicker, DateTimePicker (`$filters` is now keyed by field)
- `actions()` and `actionRules()`
- Sorting, searching, pagination
- Persist drivers (cookies, session, cache). Filters saved by v6 are not applied
- Cache configuration
- Lifecycle hooks `transformQuery`, `transformRows`, `transformActions`
