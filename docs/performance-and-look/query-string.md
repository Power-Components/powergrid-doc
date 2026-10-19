---
title: Query String
description: Learn how Query Strings work in PowerGrid tables, how to enable them, and how to exclude specific fields from the URL state.
---

# Query String

Opt in to put **declared filters** in the URL so a view can be shared or bookmarked.

[[toc]]

## Enabling Query String

Override Livewire's `queryString()` and return `powerGridQueryString()`. Pagination already uses the URL (`?page=`) via Livewire. Search, sort, and column visibility are **not** included unless you add them.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    protected function queryString(): array // [!code ++:4]
    {
        return $this->powerGridQueryString();
    }
}
```

`powerGridQueryString(string $prefix = '')` builds aliases from `filters()`:

| Filter        | URL keys |
| ------------- | -------- |
| `input_text`  | `{field}` (value), `{field}_operator` |
| `number`      | `{field}_start`, `{field}_end` |
| Other types   | `{field}` (value) |
| `dynamic`     | The `wire:model` path declared on the filter |

Dots in the field become underscores. Each binding uses `except => ''` so empty values stay out of the URL.

Pass a prefix when two tables share a page:

```php
return $this->powerGridQueryString('products');
// ?products_name=Pastel&products_price_start=5
```

## Extra keys

Merge extra Livewire query-string entries with the filter map. `search` is a public property on the table; adding it puts the search box in the URL.

```php [app/Livewire/ProductTable.php]
protected function queryString(): array // [!code ++:8]
{
    return [
        'search' => ['except' => ''],
        ...$this->powerGridQueryString(),
    ];
}
```

See Livewire [excluding query string values](https://livewire.laravel.com/docs/url#excluding-certain-values).
