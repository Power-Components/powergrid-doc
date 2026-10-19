---
title: Tabs
description: Add a themed status-tab strip above the toolbar. Each tab can scope the query and show a badge count.
---

# Tabs

[[toc]]

## Enabling Tabs

Tabs render a strip above the toolbar. Each tab can scope the query, so users switch between subsets of the same table. Tabs are a plugin (`TabsPlugin`) and activate when `PowerGrid::tabs()` is in `setUp()`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::header()->showSearchInput(),

            PowerGrid::tabs()
                ->add('all', label: 'All')
                ->add('in_stock', label: 'In stock', scope: ['in_stock', true])
                ->add('out', label: 'Out of stock', scope: ['in_stock', false])
                ->default('all'),
        ];
    }
}
```

A tab with no `scope` leaves the query unfiltered. `$activeTab` is a locked Livewire property; change tabs with `selectTab()`.

## Scope Syntax

`scope` is a list: `[column, value]` or `[column, operator, value]`.

The column must match a column declared in `columns()`: its `dataField`, or its `field` when it has no `dataField`. Unknown columns are ignored.

```php [app/Livewire/ProductTable.php]
PowerGrid::tabs()
    ->add('all', label: 'All')
    ->add('new', label: 'New', scope: ['status', 'new'])
    ->add('done', label: 'Done', scope: ['status', 'in', ['shipped', 'delivered']])
    ->default('new');
```

| Form                        | SQL equivalent                |
| --------------------------- | ----------------------------- |
| `['status', 'new']`         | `where('status', '=', 'new')` |
| `['status', 'in', $values]` | `whereIn('status', $values)`  |

Allowed operators: `=`, `!=`, `<>`, `<`, `>`, `<=`, `>=`, `like`, `not like`, `in`. Built-in scope runs only on Eloquent, Query Builder, and Relation datasources.

## Alignment

Default alignment is `center`. Chain `left()`, `center()`, `right()`, or `align('left'|'center'|'right')`.

```php [app/Livewire/ProductTable.php]
PowerGrid::tabs()
    ->left()
    ->add('all', label: 'All')
    ->add('in_stock', label: 'In stock', scope: ['in_stock', true]);
```

## Badges and Icons

`add()` accepts `badge` and `icon`.

| Parameter | Type      | Default            | Description                                                           |
| --------- | --------- | ------------------ | --------------------------------------------------------------------- |
| `$key`    | string    | —                  | Stable identifier stored in `$activeTab`                              |
| `$label`  | string    | headline of `$key` | Visible label                                                         |
| `$scope`  | ?array    | `null`             | Query constraint                                                      |
| `$badge`  | bool\|int | `true`             | `true` counts matching rows. `false` hides. An `int` is a fixed count |
| `$icon`   | string    | `''`               | Icon name resolved like `Button::icon()`                              |
| `$classes`| string    | `''`               | Extra CSS classes on that tab's button                                |

```php [app/Livewire/ProductTable.php]
PowerGrid::tabs()
    ->add('all', label: 'All', icon: 'squares-2x2')
    ->add('in_stock', label: 'In stock', scope: ['in_stock', true], badge: true)
    ->add('featured', label: 'Featured', badge: 3);
```

Auto counts (`badge: true`) run on Eloquent / Query Builder datasources, after current filters. Collection datasources skip auto counts. Override a count with `tabBadge()`:

```php [app/Livewire/ProductTable.php]
public function tabBadge(string $tab): int|string|null
{
    if ($tab === 'in_stock') {
        return \App\Models\Product::query()->where('in_stock', true)->count();
    }

    return null;
}
```

## Custom Query Per Tab

When a list `scope` is not enough, implement `tabQuery()`. It runs after the built-in scope, if one exists.

```php [app/Livewire/ProductTable.php]
public function tabQuery(string $tab, mixed $query): mixed
{
    return match ($tab) {
        'low_stock' => $query->where('stock', '<', 5),
        default => $query,
    };
}
```

## Extra Classes

Append CSS to this grid's tab strip with `classes()`. Slots: `container`, `list`, `tab`, `tab_active`, `tab_inactive`, `badge`, `badge_active`, `badge_inactive`. Repeated calls merge. For one tab only, use the `classes` argument of `add()`.

```php [app/Livewire/ProductTable.php]
PowerGrid::tabs()
    ->classes([
        'list' => 'bg-slate-900 border-slate-700',
        'tab_active' => 'bg-emerald-500 text-white',
    ])
    ->add('all', label: 'All');
```

## Theme Tokens

Tabs read `tabs.list`, `tabs.tab`, `tabs.tab_active`, `tabs.tab_inactive`, `tabs.badge`, `tabs.badge_active`, and `tabs.badge_inactive` (set them in a theme with `tabActive()`, `badgeActive()`, … on `Components\Tabs`). Flux points `tabs.view` at its own blade. See [Custom Theme](/extending/custom-theme.html#section-methods).

Updates to the strip go through the `pg-tabs-{tableName}` Hot Zone. See [Partials and Hot Zones](/extending/partials-and-hot-zones.html).
