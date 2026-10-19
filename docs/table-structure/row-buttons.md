---
title: Row Buttons
description: Learn how to add action buttons to each row in a PowerGrid Table.
---

# Row Buttons

[[toc]]

Add buttons to each row from `actions()`. PowerGrid renders them as Blade HTML on the server.

Button appearance and behavior (`slot()`, `class()`, `dispatch()`, `route()`, `can()`, `confirm()`, …) live on the [`Button` class](/performance-and-look/buttons.html). This page covers how those buttons get onto rows.

## Actions Method

Define row actions in `actions()`. You must also add an [Action Column](/table-structure/columns.html#action-column).

`$row` is the current record (`Model` or `array`). Use it to pass row-specific values into each `Button`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function actions($row): array // [!code ++:6]
    {
        return [
            // ...
        ];
    }
}
```

## Defining Row Buttons

Return `Button` instances from `actions()`. Chain the methods you need from the [Button class](/performance-and-look/buttons.html#button-methods).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Button;

class ProductTable extends PowerGridComponent
{
    public function actions($row): array
    {
        return [
            Button::add('edit-stock') // [!code ++:4]
                ->slot('Edit <strong>' . e($row->name) . '</strong>')
                ->class('bg-indigo-500 text-white')
                ->dispatch('clickToEdit', ['productId' => $row->id]),
        ];
    }
}
```

Hide a button for some rows with [`can()`](/performance-and-look/buttons.html#can) (bool or closure). For style, caption, or disable rules, see [Conditional Rules](/table-structure/conditional-rules.html).

```php [app/Livewire/ProductTable.php]
Button::add('order')
    ->slot('Order')
    ->class('bg-indigo-500 text-white')
    ->can(fn ($row) => $row->in_stock)
    ->dispatch('orderProduct', ['id' => $row->id]),
```

## Custom Button View

To replace **one** button with a Blade view, chain `view()`. The view receives `$action` (the `Button`) and `$row`.

```php [app/Livewire/ProductTable.php]
Button::add('edit')
    ->view('components.tables.edit-button'),
```

## Actions From Blade View

To render a custom view for the whole [Action Column](/table-structure/columns.html#action-column) cell, add `actionsFromView()` and return a `View`. `$row` is the current record.

You can use this together with `actions()`, or on its own.

```php [app/Livewire/ProductTable.php]
use Illuminate\View\View;

public function actionsFromView($row): View
{
    return view('actions-view', ['row' => $row]);
}
```

```php [resources/views/actions-view.blade.php]
<div>
    @if ($row->in_stock)
        <button>Order now</button>
    @else
        - out of stock -
    @endif
</div>
```

## Bulk Actions Buttons

See [Bulk Actions](/table-structure/bulk-actions.html) for header buttons that run on selected rows.
