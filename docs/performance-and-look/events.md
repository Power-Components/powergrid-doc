---
title: PowerGrid Events
description: Learn how PowerGrid uses Livewire events to interact with built-in features, and register custom event listeners.
---

# PowerGrid Events

PowerGrid listens for Livewire events suffixed with [`$tableName`](/performance-and-look/table-reference-name.html). Set a unique table name so events hit the right instance.

[[toc]]

## Predefined Events

Plugin listeners are collected at runtime: each plugin method with `#[On]` is mapped in `getListeners()`. Core listeners (`toggleColumn`, `refresh`, `softDeletes`, `multiSelectChanged`) use `#[On]` on the table itself. You do not register either by hand.

| Event                         | Handler              |
| ----------------------------- | -------------------- |
| `pg:datePicker-{tableName}`   | Flatpickr plugin     |
| `pg:editable-{tableName}`     | Editable plugin      |
| `pg:toggleable-{tableName}`   | Toggleable plugin    |
| `pg:multiSelect-{tableName}`  | `multiSelectChanged` |
| `pg:toggleColumn-{tableName}` | `toggleColumn`       |
| `pg:eventRefresh-{tableName}` | `refresh`            |
| `pg:softDeletes-{tableName}`  | `softDeletes`        |

Editable, Toggleable, and Export call `onPluginUpdated()` on the table. See [Editing Data](/data-management/editing-data.html).

## Bulk Actions Events

See [Handling the Bulk Event](/table-structure/bulk-actions.html#handling-the-bulk-event).

## Adding Custom Events

Override `getListeners()` and merge `parent::getListeners()` so plugin events stay registered.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function getListeners(): array // [!code ++:9]
    {
        return [
            'edit-product'        => 'editProduct',
            'delete-product'      => 'deleteProduct',
            'clicked-on-product'  => 'clickedOnProduct',
            ...parent::getListeners()
        ];
    }
}
```

`#[On]` methods on the table (`pg:eventRefresh-…`, `pg:toggleColumn-…`, `pg:softDeletes-…`, `pg:multiSelect-…`) keep working even if you omit `parent::getListeners()`. Plugin events (`pg:editable-…`, `pg:toggleable-…`, `pg:datePicker-…`) do not.

## Dispatching Events

Dispatch the same way as any Livewire event:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function submit()
    {
        $this->dispatch('pg:eventRefresh-ProductTable');
    }
}
```
