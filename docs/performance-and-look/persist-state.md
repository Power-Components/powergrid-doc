---
title: Persist State
description: Save table state so users return to the same view with their chosen columns, filters, and sorting already applied.
---

# Persist State

Columns, filters, and sorting are persisted by default so the same view is restored on the next visit.

[[toc]]

## What is saved

Default items: `columns`, `filters`, `sorting`.

Call `persist()` in `setUp()` to change the list or add a key prefix (for example per user). Call `withoutPersist()` to turn persistence off.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->persist( // [!code ++:4]
            tableItems: ['columns', 'filters', 'sorting'],
            prefix: (string) auth()->id()
        );

        return [];
    }
}
```

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    $this->withoutPersist(); // [!code ++]

    return [];
}
```

`withoutPersist(['filters'])` drops only those items from the default list.

The storage key is `pg:{tableName}`, or `pg:{prefix}-{tableName}` when a prefix is set. Set a unique [`$tableName`](/performance-and-look/table-reference-name.html).

Filter Builder state is separate: `PowerGrid::filterBuilder()->persist()`. See [Filter Builder](/table-structure/filter-builder.html).

::: warning
Filters saved by PowerGrid 6 use a different bag shape. v7 does not restore them. Saved sorting and columns from v6 still apply. See the [Upgrade Guide](/release-notes-and-upgrade/upgrade-guide.html#saved-state).
:::

## Driver

Storage comes from `persist_driver` in [configuration](/powergrid/configuration-options.html#persist-driver):

| Driver    | Description |
| --------- | ----------- |
| `cookies` | Default. Cookie, 5-year lifetime. |
| `session` | Laravel session. |
| `cache`   | Laravel cache. Set `persist_driver_store` to a cache store name, or leave it empty/null for the default store. |

Override the driver for one table from `boot()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function boot(): void // [!code ++:6]
    {
        config(['livewire-powergrid.persist_driver' => 'session']);

        parent::boot();
    }
}
```
