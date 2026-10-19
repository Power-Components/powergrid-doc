---
title: Bulk Actions
description: Manage multiple records at once. Set up checkboxes, header buttons, and process selected rows.
---

# Bulk Actions

[[toc]]

Select rows with [checkboxes](/table-structure/rows.html#checkboxes) and run an action from a [header](/table-structure/header-and-footer.html) [Button](/performance-and-look/buttons.html).

## Enable Checkboxes

Call `showCheckBox()` in `setUp()`. By default it uses the `id` field; pass another attribute if needed.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->showCheckBox(); // [!code ++]

        return [];
    }
}
```

See [Checkboxes](/table-structure/rows.html#checkboxes). Hide or disable a row checkbox with [Conditional Rules](/table-structure/conditional-rules.html). Hidden or disabled rows are skipped by "select all".

## Header Buttons

Return `Button` instances from `header()`. They render as Blade HTML in the table header.

A typical bulk button [dispatches](/performance-and-look/buttons.html#dispatch) an event. Include [`$this->tableName`](/performance-and-look/table-reference-name.html) in the event name when more than one table can be on the page, and listen with Livewire's `{tableName}` placeholder.

Header buttons have no default styles — set them with `class()`. Use `order()` to control their order (lower first). `actionRules()` does **not** apply to header buttons; use [`can()`](/performance-and-look/buttons.html#can) to hide one.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Button;

class ProductTable extends PowerGridComponent
{
    public function header(): array // [!code ++:8]
    {
        return [
            Button::add('bulk-delete')
                ->slot('Delete Selected')
                ->class('rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700')
                ->dispatch('bulkDelete.' . $this->tableName, []),
        ];
    }
}
```

See [Button methods](/performance-and-look/buttons.html#button-methods) for `confirm()`, `icon()`, `can()`, and the rest.

## Handling the Bulk Event

Listen with Livewire [`#[On]`](https://livewire.laravel.com/docs/events#listening-for-events). Selected IDs are on the component: `$this->checkboxValues` (or `checkedValues()`).

The Alpine store `window.pgBulkActions` mirrors the selection for the header count. Do not use it as the source of truth for deletes or updates.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Product;
use Livewire\Attributes\On; // [!code ++]

class ProductTable extends PowerGridComponent
{
    #[On('bulkDelete.{tableName}')] // [!code ++:12]
    public function bulkDelete(): void
    {
        if ($this->checkboxValues === []) {
            return;
        }

        Product::destroy($this->checkboxValues);

        $this->checkboxValues = [];
        $this->checkboxAll = false;
        $this->js('window.pgBulkActions.clear(\'' . $this->tableName . '\')');
    }
}
```

`window.pgBulkActions.get('yourTableName')` returns the same IDs in JavaScript. `clear(tableName)` resets one table; `clearAll()` resets every table.

## Show Selected Items Count

`window.pgBulkActions.count(tableName)` is the selected count. Put it in the button `slot()` with Alpine [`x-text`](https://alpinejs.dev/directives/text):

```php [app/Livewire/ProductTable.php]
public function header(): array
{
    return [
        Button::add('bulk-delete')
            ->slot('Delete Selected') // [!code --]
            ->slot(__('Delete Selected (<span x-text="window.pgBulkActions.count(\'' . $this->tableName . '\')"></span>)')) // [!code ++]
            ->class('rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700')
            ->dispatch('bulkDelete.' . $this->tableName, []),
    ];
}
```
