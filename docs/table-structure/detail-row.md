---
title: Detail Row
description: Learn how to configure expandable detail rows to display additional content for each row in a PowerGrid Table.
---

# Detail Row

[[toc]]

Detail Row expands a table row and includes a Blade view **inline** in the table body. It is not a nested Livewire component.

The view receives `$row` (the current record), `$id` (the row primary key), and `$options` (values from `params()`).

## Enabling Detail Row

Call `PowerGrid::detail()` in `setUp()`, then `view()` with the Blade view to include. Chain `showCollapseIcon()` to show the expand/collapse control (optional custom icon view as `$viewIcon`). You can omit the icon and toggle from a [row button](/table-structure/row-buttons.html) with [Button::toggleDetail()](/performance-and-look/buttons.html#toggledetail) instead. To use a different view for some rows, see the [`detailView()`](/table-structure/conditional-rules.html#detailview) rule.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
           PowerGrid::detail()// [!code ++:4]
                ->view('components.detail')
                ->showCollapseIcon()
                ->params(['name' => 'Luan', 'custom_data' => 'foobar']),
        ];
    }
}
```

```blade [resources/views/components/detail.blade.php]
<div>
    <div>ID: {{ $id }}</div>
    <div>{{ $row->name }}</div>
    <div>@json($options)</div>
</div>
```

## Single Expanded Row

By default several rows can stay expanded. `singleExpand()` keeps only one open; expanding another collapses the previous row.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
           PowerGrid::detail()
                ->view('components.detail')
                ->params(['name' => 'Luan', 'custom_parameter' => 'foobar'])
                ->showCollapseIcon()
                ->singleExpand(), // [!code ++]
        ];
    }
}
```
