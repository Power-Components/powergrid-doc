---
title: Empty Data State
description: Customize the message shown when a PowerGrid Table has no records.
---

# Empty Data State

[[toc]]

## Introduction

When a table returns no rows, PowerGrid shows a message. The default is the translation `livewire-powergrid::datatable.labels.no_data` ("No records found"). Override `renderEmptyState()` to return a string or a [View](https://laravel.com/docs/views).

## Customizing the empty state

String:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\View\View;

class ProductTable extends PowerGridComponent
{
    public function renderEmptyState(): string|View // [!code ++:4]
    {
        return 'No items found. Create your first product.';
    }
}
```

View:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\View\View; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function renderEmptyState(): string|View // [!code ++:4]
    {
        return view('products.empty-data');
    }
}
```

When the return value is a View, PowerGrid passes `emptyState` (the default translated string) and `data` (an empty array) into it.

`noDataLabel()` still exists and is the default implementation of `renderEmptyState()`. It is deprecated; override `renderEmptyState()` instead.
