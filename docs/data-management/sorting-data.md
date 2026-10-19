---
title: Sorting Data
description: Enable column sorting, custom sort callbacks, natural order, and multi-column sort.
---

# Sorting Data

[[toc]]

## Introduction

Users sort by clicking a column header. Enable that control with `sortable()`. Set the initial field and direction on the component. Custom order uses `sortUsing()`.

## Sortable columns

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::make('Product name', 'name')
            ->sortable(),

        Column::make('Category', 'category_name', 'categories.name')
            ->sortable(),
    ];
}
```

Pass `$dataField` for custom fields and joined relationships. See [Sortable Column](/table-structure/columns.html#sortable-column).

## Default field and direction

Declare `$sortField` and `$sortDirection` (`asc` / `desc`):

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public string $sortField = 'name'; // [!code ++:3]

    public string $sortDirection = 'desc';
}
```

Defaults are `id` and `asc`.

## Custom sort

`sortUsing()` enables sort on the column and runs your callback instead of a plain `orderBy`.

For Eloquent / Query Builder, the callback receives the query and `'asc'` or `'desc'`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;
use Illuminate\Database\Eloquent\Builder;

Column::make('Name', 'name')
    ->sortUsing(function (Builder $query, string $direction) {
        $query->orderByRaw('LENGTH(name) '.$direction);
    }),
```

For a Collection datasource, the callback receives the collection and must return it:

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\Collection;
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Price', 'price')
    ->sortUsing(function (Collection $collection, string $direction) {
        return $collection->sortBy(
            fn ($item) => round(data_get($item, 'price') / 50) * 50,
            SORT_REGULAR,
            $direction === 'desc',
        );
    }),
```

## Natural sorting (string as number)

Sort alphanumeric strings in natural order, like PHP [`natsort()`](https://www.php.net/manual/en/function.natsort.php).

| Type     | Example                                  |
| -------- | ---------------------------------------- |
| Standard | img1.png, img10.png, img12.png, img2.png |
| Natural  | img1.png, img2.png, img10.png, img12.png |

`naturalSort(true)` also enables the column as sortable. Optional second argument qualifies the column by table name.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::make('Image', 'image')
            ->naturalSort(true), // [!code ++]
    ];
}
```

## Multi-column sorting

Set `$multiSort` to `true` to keep several columns in `$sortArray`. Clicking a sorted column cycles `asc` → `desc` → removed.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public bool $multiSort = true; // [!code ++]
}
```

Each click on a sortable header sets `multiSort` to whether `Shift` is held. `Shift`+click adds the column to the multi-sort; a plain click switches back to single-column sort, even when `$multiSort` is declared `true`.
