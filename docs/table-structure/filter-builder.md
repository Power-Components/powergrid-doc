---
title: Filter Builder
description: Let users compose multi-condition filters from your existing filters() definitions, without writing extra query code.
---

# Filter Builder

[[toc]]

## Introduction

The Filter Builder is a plugin (`FilterBuilderPlugin`). It adds a header button that opens a modal where users stack conditions from your `filters()` definitions. Conditions are validated against that allowlist and applied to Eloquent, Query Builder, and Collection datasources.

You do not redeclare columns for the builder. Types and operators in the modal come from `filters()`. The plugin is disabled when `filters()` is empty.

Additional rows can be joined with **AND** or **OR**. There is no nested grouping. `match()` only sets the default connector when the modal opens.

Supported `filters()` types: `inputText`, `number`, `select` / `enumSelect`, `boolean`, `datepicker`, `datetimepicker`. Multi-select and dynamic filters are skipped.

## Theme Support

The plugin renders when a view exists for the active theme.

- Flux ships a `<flux:modal>` view
- Other themes render the builder when `header.filter_builder.view` points at a Blade view, or when a packaged variant exists

If no view resolves, the plugin renders nothing and the table is unchanged.

## Setup

Opt in from `setUp()` and keep `filters()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function setUp(): array
{
    return [
        PowerGrid::header()->showSearchInput(),
        PowerGrid::filterBuilder(),
    ];
}

public function filters(): array
{
    return [
        Filter::inputText('name'),
        Filter::number('price'),
        Filter::datepicker('created_at'),
        Filter::boolean('in_stock'),
    ];
}
```

## Configuration

All methods are chainable on `PowerGrid::filterBuilder()`.

| Method                                  | Description                                                                                             | Default |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| `match(string $match)`                  | Default connector for additional rows when the modal opens (`and` or `or`).                             | `and`   |
| `maxConditions(int $max)`               | Hard cap on how many conditions may be applied.                                                         | `30`    |
| `hideDefaultFilters(bool $hide = true)` | Hide inline / dropdown / flyout filters so the builder is the only filtering UI. Pills stay visible.    | `false` |
| `only(array $fields)`                   | Restrict which `filters()` columns appear (empty = all). Matches field or column.                       | `[]`    |
| `except(array $fields)`                 | Hide specific `filters()` columns from the builder.                                                     | `[]`    |
| `persist(bool $persist = true)`         | Persist applied conditions across requests.                                                             | `false` |
| `title(string $title)`                  | Header button title.                                                                                    | —       |
| `icon(string $icon)`                    | Header button icon.                                                                                     | —       |

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    return [
        PowerGrid::filterBuilder()
            ->match('or')
            ->maxConditions(10)
            ->only(['name', 'price', 'created_at'])
            ->hideDefaultFilters()
            ->title('Filter')
            ->icon('funnel'),
    ];
}
```

## Before Query Hook

Override `beforeFilterBuilderApply()` to run right before the builder applies conditions. It receives the query (or collection) plus the validated `{ match, rows }` payload. Return the (optionally modified) query.

```php [app/Livewire/ProductTable.php]
public function beforeFilterBuilderApply(mixed $query, array $conditions): mixed
{
    logger()->info('Filter Builder applied', $conditions);

    return $query->where('tenant_id', auth()->user()->tenant_id);
}
```

The `$conditions` shape:

```php [app/Livewire/ProductTable.php]
[
    'match' => 'and',
    'rows' => [
        ['column' => 'name', 'operator' => 'contains', 'value' => 'a', 'value2' => '', 'boolean' => 'and'],
    ],
]
```

`boolean` on each row after the first is the AND / OR connector used in the query. The hook fires only when there is at least one applied condition.

## Validating Before Apply

Override `validateFilterBuilder()` to reject a submission. Throw to keep the previous state. Conditions have already been validated against your `filters()` allowlist.

```php [app/Livewire/ProductTable.php]
public function validateFilterBuilder(array $conditions): void
{
    foreach ($conditions['rows'] as $row) {
        if ($row['column'] === 'price' && (float) $row['value'] < 0) {
            throw new \InvalidArgumentException('Price cannot be negative.');
        }
    }
}
```

## Persistence

The builder uses the same persist driver as the rest of PowerGrid (`cookies`, `session`, or `cache`). Builder conditions are stored with regular filters when `'filters'` is persisted, or on their own via `PowerGrid::filterBuilder()->persist()`.

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    $this->persist(['filters']);

    return [
        PowerGrid::filterBuilder(),
    ];
}
```

Builder only:

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    return [
        PowerGrid::filterBuilder()->persist(),
    ];
}
```

When only the builder is persisted, its enabled-filter pills are rebuilt from the restored conditions.

See [Persist State](/performance-and-look/persist-state.html).
