# Bulk Actions

This section covers the Bulk Action feature.

Here you will find:

[[toc]]

## Introduction

PowerGrid offers a convenient perform multi-row actions by displaying a [Button](/table-features/button-class.html) in your Table Component Header and [Checkboxes](/table-features/rows.html#checkboxes) in each Table row.

Currently, this feature is only available on the Tailwind theme.

## Display the Bulk Button

To implement Bulk Actions in PowerGrid, you must add a [Button](/table-features/button-class.html) inside the `header()` method of your Table Component.

Typically, a Bulk Button will dispatch an event that can be handled by your component.

The next example displays a button at the Table header which will dispatch the `bulkDelete` concatenated with the Table name.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Button;

class DishTable extends PowerGridComponent
{
    public function header(): array// [!code ++:8]
    {
        return [
            Button::add('bulk-delete')
                ->slot('Bulk Delete')
                ->dispatch('bulkDelete.' . $this->tableName, []),
        ];
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using <a target="_blank" href="https://demo.livewire-powergrid.com/examples/bulk-actions">Bulk Actions</a> in PowerGrid.</p>

</div>

## Handling the Bulk Event

You may handle the event using the [#[On]](https://livewire.laravel.com/docs/events#listening-for-events) Livewire Attribute.

The selected item's IDs will be available in the global `pgBulkActions` JavaScript component:

```javascript
window.pgBulkActions.get('name-of-your-table');
```

The example below will simply display an alert containing the row IDs.

```php  
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Livewire\Attributes\On; 

class DishTable extends PowerGridComponent
{
    #[On('bulkDelete.{tableName}')]// [!code ++:5]
    public function bulkDelete(): void
    {
        $this->js('alert(window.pgBulkActions.get(\'' . $this->tableName . '\'))');
        if($this->checkboxValues){
            YouModel::destroy($this->checkboxValues);
            $this->js('window.pgBulkActions.clearAll()'); // clear the count on the interface.
        }
    }
}
```

## Show Select Items Count

The selected items count is available in the global `pgBulkActions` JavaScript component, in the `count` property:

```javascript
window.pgBulkActions.count('detail');
```

To display the selected items count in the button, you must add a [`slot()`](/table-features/button-class.html#slot), using the Alpine [x-text](https://alpinejs.dev/directives/text) directive to display the count.

Example:

```php{5}
public function header(): array
{
     return [
        Button::add('bulk-delete')
            ->slot('Bulk Delete')// [!code --]
            ->slot(__('Bulk delete (<span x-text="window.pgBulkActions.count(\'' . $this->tableName . '\')"></span>)'))// [!code ++]
            ->class('cursor-pointer block bg-white-200 text-gray-700 ')
            ->dispatch('bulkDelete-' . $this->tableName, []),
     ];
 }
```
