---
title: PowerGrid Configuration Options
description: Keys in config/livewire-powergrid.php — theme, filters, persist, export, and discovery.
---

# PowerGrid Configuration Options

[[toc]]

Publish the file, then edit `config/livewire-powergrid.php`.

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

Base JS/CSS setup is in [Configure PowerGrid](/get-started/configure-powergrid.html).

## Core Settings

### UI Theme

Themes: `Tailwind` (default), `DaisyUI`, and `Flux`. Value is a registered name or an FQCN.

```php [config/livewire-powergrid.php]
'theme' => 'tailwind',
// 'theme' => 'daisyui',
// 'theme' => 'flux',
// 'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class,
```

Register a custom name with `PowerGridManager::registerTheme()`. See [Custom Theme](/extending/custom-theme.html).

### Theme Overrides

Restyle any token without a Theme class. Merged last, highest precedence.

```php [config/livewire-powergrid.php]
'theme_overrides' => [
    'table' => [
        'layout' => [
            'th' => 'font-bold px-4 py-3',
        ],
    ],
],
```

### Max Per Page

Upper bound for rows fetched per page. The per-page value travels in component state, so this ceiling keeps one request from loading an unbounded number of rows. Set to `0` to disable.

```php [config/livewire-powergrid.php]
'max_per_page' => 1000,
```

### Persist Driver

[Persist State](/performance-and-look/persist-state.html) saves columns, sorting, and filters.

| Driver    | Description                         |
| --------- | ----------------------------------- |
| `cookies` | Store data in cookies (default).    |
| `session` | Store data in the session.          |
| `cache`   | Store data in the cache.            |

```php [config/livewire-powergrid.php]
'persist_driver' => 'cookies',
'persist_driver_store' => null, // not in the published file; add it when needed
```

When the driver is `cache`, set `persist_driver_store` to a cache store name (empty uses the default store). Any other driver value throws `Invalid persist driver`.

### Filter Position

Global placement for [Filters](/table-structure/filters.html).

| Filter     | Placement                                                               |
| ---------- | ----------------------------------------------------------------------- |
| `inline`   | Filters inside the table (live, debounced)                              |
| `dropdown` | Popover anchored to a Filter button. Edits stay in a draft until Apply. |
| `flyout`   | Drawer sliding from a side edge. Edits stay in a draft until Apply.     |
| `null`     | No filter UI                                                            |

```php [config/livewire-powergrid.php]
'filter' => 'flyout',
```

When `filter` is `flyout`:

```php [config/livewire-powergrid.php]
'filter_flyout' => [
    'position' => 'right', // left or right
    'close_on_escape' => true,
    'close_on_click_outside' => true,
],
```

Per-table position: [Filter Position](/table-structure/filters.html#filter-position). The v6 value `outside` is gone; use `dropdown` or `flyout`.

### Filter Wire

`filter_wire` sets the Livewire modifier chain on each filter control. Applied to `wire:model` — `live.debounce.600ms`, `live`, `blur`, `lazy`, or `''` when a JavaScript widget pushes its own update.

Slots: `value`, `operator`, `start`, `end`, `formatted`. Only the entries you set are overridden. Defaults from `Support\FilterWire`:

| Filter type    | Slots               | Default               |
| -------------- | ------------------- | --------------------- |
| `input_text`   | `value`, `operator` | `live.debounce.600ms` |
| `number`       | `start`, `end`      | `live.debounce.600ms` |
| `select`       | `value`             | `live`                |
| `boolean`      | `value`             | `live`                |
| `multi_select` | `value`             | `''`                  |
| `date`         | `formatted`         | `''`                  |
| `datetime`     | `formatted`         | `''`                  |

```php [config/livewire-powergrid.php]
'filter_wire' => [
    // 'input_text' => ['value' => 'live.debounce.800ms'],
],
```

A single grid overrides the same map with `filterWire()`. That array is merged on top of this config.

```php [app/Livewire/ProductTable.php]
public function filterWire(): array
{
    return [
        'input_text' => ['value' => 'live.debounce.800ms'],
    ];
}
```

A slot name outside those five throws `InvalidArgumentException`. Keys for filter types not listed above are ignored.

### Cache TTL

TTL in seconds for cached **action-rule** resolution. `null` or `0` disables it (default).

> **Note:** This key only affects action-rule caching. Query cache TTL is set per table with `PowerGrid::cache()->ttl()` (default 300 seconds). See [Cache](/performance-and-look/cache.html).

```php [config/livewire-powergrid.php]
'cache_ttl' => null,
```

## Third-party Integrations

### OpenSpout

Exports use OpenSpout v5, which is not installed with PowerGrid. Run `composer require openspout/openspout:^5.0` (see [Exporting Data](/data-management/exporting-data.html)).

```php [config/livewire-powergrid.php]
'exportable' => [
    'default' => 'openspout_v5',
    'openspout_v5' => [
        'xlsx' => \PowerComponents\LivewirePowerGrid\Plugins\Export\OpenSpout\v5\ExportToXLS::class,
        'csv' => \PowerComponents\LivewirePowerGrid\Plugins\Export\OpenSpout\v5\ExportToCsv::class,
    ],
],
```

### Flatpickr

Used by the [Datetime Picker Filter](/table-structure/filters.html#datetime-picker-filter) and [Date Picker Filter](/table-structure/filters.html#date-picker-filter).

```bash
npm i flatpickr --save
```

```javascript [resources/js/app.js]
import flatpickr from "flatpickr";
```

```css [resources/css/app.css]
@import "flatpickr/dist/flatpickr.min.css";
```

Locale options live under `plugins.flatpickr`:

```php [config/livewire-powergrid.php]
'plugins' => [
    'flatpickr' => [
        'locales' => [
            'pt_BR' => [
                'locale' => 'pt',
                'dateFormat' => 'd/m/Y H:i',
                'enableTime' => true,
                'time_24hr' => true,
            ],
        ],
    ],
],
```

### TomSelect

Optional driver for the [Multi Select Filter](/table-structure/filters.html#multi-select-filter).

```bash
npm i tom-select
```

```javascript [resources/js/app.js]
import TomSelect from "tom-select";
window.TomSelect = TomSelect
```

```php [config/livewire-powergrid.php]
'plugins' => [
    'select' => [
        'default' => 'tom',

        'tom' => [
            'cdn' => 'https://cdn.jsdelivr.net/npm/tom-select@2.4.1/dist/js/tom-select.complete.min.js',
            'css' => 'https://cdn.jsdelivr.net/npm/tom-select@2.4.1/dist/css/tom-select.css',
        ],
    ],
],
```

### SlimSelect

Default driver for the [Multi Select Filter](/table-structure/filters.html#multi-select-filter).

```bash
npm i slim-select
```

```javascript [resources/js/app.js]
import SlimSelect from 'slim-select'
window.SlimSelect = SlimSelect
```

```php [config/livewire-powergrid.php]
'plugins' => [
    'select' => [
        'default' => 'slim',

        'slim' => [
            'cdn' => 'https://unpkg.com/slim-select@2.9.1/dist/slimselect.min.js',
            'css' => 'https://unpkg.com/slim-select@2.9.1/dist/slimselect.css',
        ],
    ],
],
```

::: tip
For both select drivers, PowerGrid does not load the `cdn` / `css` URLs. Install the library and expose it on `window`. The active driver's array is passed to the library constructor as options.
:::

## Application Structure

These keys affect `powergrid:create`, not table runtime.

### Custom Namespace

Components are generated under Livewire's `class_namespace` (not a PowerGrid config key):

```php [config/livewire.php]
'class_namespace' => 'Domain',
```

See [Create Command](/powergrid/artisan-commands.html#create-table).

### Auto-Discover Models

Directories scanned for Eloquent models in the create assistant:

```php [config/livewire-powergrid.php]
'auto_discover_models_paths' => [
    app_path('Models'),
    base_path('Domain'),
],
```
