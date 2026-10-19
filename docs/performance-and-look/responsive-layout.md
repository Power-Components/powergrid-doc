---
title: Responsive Layout
description: Use responsive layout configuration and styling in PowerGrid Tables.
---

# Responsive Layout

Hide overflowing columns on narrow viewports and show their values in an expandable row. Works with the shipped themes (Tailwind, DaisyUI, Flux).

[[toc]]

## Enabling Responsive Layout

Add `PowerGrid::responsive()` in `setUp()`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::responsive(), // [!code ++]
        ];
    }
}
```

## Methods

`PowerComponents\Turbine\Components\SetUp\Responsive`, returned by `PowerGrid::responsive()`:

| Method | Description |
| ------ | ----------- |
| `fixedColumns(string ...$columnNames)` | Columns that stay visible. **Replaces** the default list. Default: `id`, `checkbox`, `actions`. |
| `sortOrder(string\|array ...$columnNames)` | Hide priority. Lower numbers stay visible longer. Pass names in order, or `['field' => int]`. |

Match `field` or `dataField`. The actions column is also recognized as `actions`. A column with [`fixedOnResponsive()`](/table-structure/columns.html#fixed-on-responsive-mode) stays visible regardless of `fixedColumns()`.

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    return [
        PowerGrid::responsive() // [!code ++:3]
            ->fixedColumns('checkbox', 'name', 'actions')
            ->sortOrder('calories', 'price', 'name'),
    ];
}
```

```php
PowerGrid::responsive()
    ->sortOrder(['calories' => 1, 'price' => 2, 'name' => 3]);
```

## Customizing CSS Styles

Hidden-cell content is copied into the expand row with these classes:

```css [resources/css/app.css]
.responsive-row-expand-container {}

.responsive-row-expand-item-container {}

.responsive-row-expand-item-name {}

.responsive-row-expand-item-value {}
```
