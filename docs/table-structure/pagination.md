---
title: Pagination
description: Divide large datasets into pages with per-page controls, record counts, and a customizable paginator.
---

# Pagination

[[toc]]

## Enabling Pagination

Chain `showPerPage()` on `PowerGrid::footer()` to enable the paginator and the per-page dropdown.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++]
                 ->showPerPage(perPage: 10, perPageValues: [0, 50, 100, 500]), // [!code ++]
        ];
    }
}
```

`$perPage` is the default page size (default `10`). `$perPageValues` is the dropdown (default `[10, 25, 50, 100, 0]`). `0` is "show all".

::: tip
If `$perPage` is missing from `$perPageValues`, PowerGrid adds it.
:::

Config `max_per_page` (default `1000`) caps rows fetched in one request. Set `0` to disable the cap. See [Max Per Page](/powergrid/configuration-options.html#max-per-page).

## Disabling Pagination

Without `showPerPage()`, the per-page dropdown is hidden but rows are still paginated, 10 per page. To render every row on one page, use `showPerPage(0, [0])`. `max_per_page` still caps the rows.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++]
                 ->showPerPage(perPage: 0, perPageValues: [0]) // [!code ++]
                 ->showRecordCount(mode: 'full'),
        ];
    }
}
```

## Record Count

Chain `showRecordCount()` on `PowerGrid::footer()`.

| Mode  | Description                                     |
| ----- | ----------------------------------------------- |
| full  | Full sentence: _Showing 1 to 10 of 100 Results_ |
| short | Short: _1 - 10 │ 100_                           |
| min   | Minimal: _1 - 10_                               |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++]
                 ->showRecordCount(mode: 'full'), // [!code ++]
        ];
    }
}
```

## URL Page Parameter

`pageName()` changes the query-string key (default `page`). Use it when two tables share a page so their paginators do not collide. Non-alphanumeric characters are stripped; an empty result falls back to `page`.

The example below yields `?productPage=2&userPage=5`.

::: code-group

```php [ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++:2]
                ->pageName('productPage'),
        ];
    }
}
```

```php [UserTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class UserTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++:2]
                ->pageName('userPage'),
        ];
    }
}
```

```php [my-view.blade.php]
<div>
    <livewire:product-table />// [!code ++:2]
    <livewire:user-table />
</div>
```

:::

## Custom Pagination Component

Chain `pagination()` on `PowerGrid::footer()` and pass a view path. The view receives `$perPage` and `$perPageValues`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::footer()// [!code ++]
                ->showPerPage(25)// [!code ++]
                ->showRecordCount()// [!code ++]
                ->pagination(viewPath: 'components.pagination'),// [!code ++]
        ];
    }
}
```
