---
title: Plugins
description: PowerGrid plugins extend columns and header UI. Eight plugins ship by default. You can add your own without replacing the built-ins.
---

# Plugins

[[toc]]

Plugins add macros to `Column`, render custom cell content, inject header UI, and can contribute theme tokens.

Eight plugins ship by default. PowerGrid's service provider boots them. You do **not** register them in `AppServiceProvider`.

| Plugin                | Column macro / trigger                    | Active when                                              |
| --------------------- | ----------------------------------------- | -------------------------------------------------------- |
| `EditablePlugin`      | `Column::editOnClick()`                   | A declared column has `pluginData.editable`              |
| `ToggleablePlugin`    | `Column::toggleable()`                    | A declared column has `pluginData.toggleable`            |
| `FlatpickrPlugin`     | Date filters                              | `FilterDatePicker` / `FilterDateTimePicker` is declared  |
| `MultiSelectPlugin`   | `Filter::multiSelect()`                   | A declared filter class name contains `FilterMultiSelect` |
| `ExportPlugin`        | `PowerGrid::exportable()` in `setUp()`    | `setUp.exportable` is filled                             |
| `FilterBuilderPlugin` | `PowerGrid::filterBuilder()` in `setUp()` | `setUp.filterBuilder` is filled and filters exist        |
| `TabsPlugin`          | `PowerGrid::tabs()` in `setUp()`          | `hasTabs()` is true                                      |
| `TruncatePlugin`      | `Column::limit()` / `Column::tooltip()`   | A declared column has `pluginData.truncate`              |

A plugin is used on a given table only when `isEnabled()` returns true.

## How Registration Works

`PowerGridManager::DEFAULT_PLUGINS` always stays registered. `PowerGrid::plugins()` **merges** your classes on top. It does not replace the list, so omitting `ExportPlugin` from your array will not disable export, and skipping the call keeps the eight built-ins.

`PowerGrid::plugins()` does **not** call `boot()`. Call `YourPlugin::boot()` yourself so Column macros register. See [Step 2](#step-2-register-it).

::: warning
Do not assign `PowerGridManager::$plugins` yourself unless you intend to replace the entire list, including Export and Tabs. Prefer `PowerGrid::plugins()`.
:::

## Default Plugins

### EditablePlugin

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::make('Name', 'name')
            ->editOnClick(),
    ];
}
```

| Parameter         | Type    | Default | Description                                             |
| ----------------- | ------- | ------- | ------------------------------------------------------- |
| `$hasPermission`  | bool    | `true`  | Whether the user can edit                               |
| `$dataField`      | string  | `''`    | Custom database field (if different from display field) |
| `$fallback`       | ?string | `null`  | Fallback value when the field is empty                  |
| `$saveOnMouseOut` | bool    | `false` | Save when the user clicks outside                       |

The plugin calls `onPluginUpdated('editable', 'updated', ['id' => …, 'field' => …, 'value' => …])`. Overriding only `onUpdatedEditable()` does not run — that wrapper is never invoked by the plugin.

```php [app/Livewire/ProductTable.php]
public function onPluginUpdated(string $plugin, string $event, array $params): void
{
    if ($plugin !== 'editable') {
        return;
    }

    \App\Models\Product::query()->find($params['id'])?->update([
        $params['field'] => $params['value'],
    ]);
}
```

See [Editing Data](/data-management/editing-data.html).

### ToggleablePlugin

```php [app/Livewire/ProductTable.php]
Column::make('Active', 'in_stock')
    ->toggleable(),
```

| Parameter        | Type   | Default | Description                     |
| ---------------- | ------ | ------- | ------------------------------- |
| `$hasPermission` | bool   | `true`  | Whether the user can toggle     |
| `$trueLabel`     | string | `'Yes'` | Label shown when value is true  |
| `$falseLabel`    | string | `'No'`  | Label shown when value is false |

```php [app/Livewire/ProductTable.php]
public function onPluginUpdated(string $plugin, string $event, array $params): void
{
    if ($plugin !== 'toggleable') {
        return;
    }

    \App\Models\Product::query()->find($params['id'])?->update([
        $params['field'] => $params['value'],
    ]);
}
```

### FlatpickrPlugin

Activates when the table uses `Filter::datepicker()` or `Filter::datetimepicker()`. It does not add a Column macro.

Install Flatpickr and import its CSS. See [Flatpickr Configuration](/powergrid/configuration-options.html#flatpickr).

### MultiSelectPlugin

Activates when a declared filter's class name contains `FilterMultiSelect` (`Filter::multiSelect()` / `Filter::multiSelectAsync()`). It does not add a Column macro.

| Event                                        | When                               |
| -------------------------------------------- | ---------------------------------- |
| `pg:clear_multi_select::{tableName}:{field}` | One multi-select filter is cleared |
| `pg:clear_all_multi_select::{tableName}`     | All filters are cleared            |
| `pg:restore_multi_select::{tableName}`       | Filters are restored               |

### ExportPlugin

Renders the header export menu when `PowerGrid::exportable()` is in `setUp()`. See [Exporting Data](/data-management/exporting-data.html).

### FilterBuilderPlugin

Adds an AND / OR filter modal. Opt in with `PowerGrid::filterBuilder()`. Flux ships `powergrid-plugins::FilterBuilder.themes.flux`. Other themes render it when `header.filter_builder.view` points at a Blade view. If no view resolves, the plugin renders nothing. See [Filter Builder](/table-structure/filter-builder.html).

### TabsPlugin

Renders a tab strip above the toolbar when `PowerGrid::tabs()` is in `setUp()`. See [Tabs](/table-structure/tabs.html).

### TruncatePlugin

Adds `limit()` and `tooltip()` to columns. Truncation composes with the existing cell content. `handles()` stays false and there is no `render()` override.

```php [app/Livewire/ProductTable.php]
Column::make('Description', 'description')
    ->limit(24)
    ->tooltip(),
```

| Method      | Parameters                                             | Description                                  |
| ----------- | ------------------------------------------------------ | -------------------------------------------- |
| `limit()`   | `(int) $characters`, `(string) $end = '...'`           | Truncate the displayed value                 |
| `tooltip()` | `(bool) $enabled = true`, `(string) $position = 'top'` | Show the full value in a theme-aware tooltip |

Flux uses `<flux:tooltip>`. Other themes use a shared Alpine tooltip with a native `title` fallback.

## Creating a Custom Plugin

### Step 1: Create the Plugin Class

```php [app/PowerGrid/Plugins/RatingPlugin.php]
<?php

namespace App\PowerGrid\Plugins;

use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Plugins\PluginBase;

class RatingPlugin extends PluginBase
{
    public static function boot(): void
    {
        Column::macro('rating', function (int $max = 5): Column {
            /** @var Column $this */
            $this->pluginData['rating'] = ['max' => $max];

            return $this;
        });
    }

    public function name(): string
    {
        return 'rating';
    }

    public function isEnabled(): bool
    {
        return collect($this->component->declaredColumns())
            ->contains(fn ($col) => ! empty(data_get($col, 'pluginData.rating')));
    }

    public function handles(mixed $column): bool
    {
        return ! empty(data_get($column, 'pluginData.rating'));
    }

    public function render(mixed $column, mixed $row): ?string
    {
        $max = data_get($column, 'pluginData.rating.max', 5);
        $field = data_get($column, 'field');
        $value = data_get($row, $field);

        return view('components.rating-stars', compact('max', 'value', 'row'))->render();
    }
}
```

### Step 2: Register It

Call `boot()` so the macro exists, then merge the class so tables can resolve it:

```php [app/Providers/AppServiceProvider.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use App\PowerGrid\Plugins\RatingPlugin;

public function boot(): void
{
    RatingPlugin::boot();

    PowerGrid::plugins([
        RatingPlugin::class,
    ]);
}
```

### Step 3: Use the Macro

```php [app/Livewire/ProductTable.php]
public function columns(): array
{
    return [
        Column::make('Rating', 'rating_score')
            ->rating(max: 5),
    ];
}
```

## Plugin Lifecycle

| Phase      | Method                           | When                                               |
| ---------- | -------------------------------- | -------------------------------------------------- |
| Boot       | `boot()`                         | Once from a service provider — register macros     |
| Resolution | `isEnabled()`                    | Per-component — determines if the plugin is active |
| Handling   | `handles($column)`               | Per-column — claims columns for custom rendering   |
| Rendering  | `render($column, $row)`          | Per-cell — returns HTML content                    |
| Zone       | `handlesZone()` / `renderZone()` | Header / toolbar / footer injection                |
| Assets     | `scripts()` / `styles()`         | Inlined into the table markup when enabled         |
| Rules      | `ruleModifiers()`                | Per-row — conditional visibility / behavior        |
| Theming    | `themeTokens()`                  | At theme resolution — contributes CSS tokens       |

Inspect **declared** columns with `declaredColumns()`, not the client-hydrated `$this->component->columns` snapshot.

## Theme Tokens

`themeTokens()` is a **static** method on the plugin class, not a method on your table.

```php [app/PowerGrid/Plugins/RatingPlugin.php]
public static function themeTokens(): array
{
    return [
        'rating' => [
            'container' => 'flex items-center gap-0.5',
            'star' => 'w-4 h-4 text-yellow-400',
            'star_empty' => 'w-4 h-4 text-gray-300',
        ],
    ];
}
```

Read them in Blade with `{{ theme('rating.container') }}`. Keys must already be snake_cased; this array is not run through the theme builder.

## Plugin Views

Plugin blades load from the `powergrid-plugins` namespace (`src/Plugins` in the package). Override a plugin view at:

`resources/views/vendor/powergrid-plugins/[PluginName]/index.blade.php`

Laravel Boost includes the `create-powergrid-plugin` skill for scaffolding. See [AI Tools and Skills](/build-with-ai/tools-and-skills.html).
