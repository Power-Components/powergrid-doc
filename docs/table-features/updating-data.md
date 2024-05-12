# Updating Data

This section covers validating and updating in your Table Component.
Here you will find:

[[toc]]

## Introduction

Some PowerGrid features like  [Toggleable](/table-features/columns.html#toggleable) and [Edit On Click](/table-features/columns.html#edit-on-click) provide a quick way to edit and update data directly from the grid.

On this page, you can find information on handling, processing, validating, and update data coming from the user input via.

## Toggleable Switch

Data submitted by the user via a [Toggleable](/table-features/columns.html#toggleable) switch will be handled by the method `onUpdatedToggleable()`.

To update your records, you must create a method `onUpdatedToggleable()` in your Table Component. This method will receive the parameters `string|int` `$id`, `string` `$field`, and `string` `$value`.

Using those parameters, you will have access to the record's primary key, the field being updated, and the value submitted, so you can perform an update operation.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function onUpdatedToggleable(string|int $id, string $field, string $value): void// [!code ++:6]
    {
        Dish::query()->find($id)->update([
            $field => e($value),
        ]);
    }
}
```

:::info 🌎 Online Demo
See an interactive example of [Saving Toggleable Data](https://demo.livewire-powergrid.com/examples/validation).
:::

## Edit On Click

Data submitted by the user via [Edit On Click](/table-features/columns.html#edit-on-click) will be handled by the method `onUpdatedEditable()`.

To update your records, you must create a method `onUpdatedEditable()` in your Table Component. This method will receive the parameters `string|int` `$id`, `string` `$field`, and `string` `$value`.

Using those parameters, you will have access to the record's primary key, the field being updated, and the value submitted, so you can perform an update operation.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function onUpdatedEditable(string|int $id, string $field, string $value): void // [!code ++:6]
    {
        Dish::query()->find($id)->update([
            $field => e($value),
        ]);
    }
}
```

::: danger ❗ WARNING
For security reasons, data input must be escaped and validated before it is stored in the database.

It's highly recommended to use Laravel's [`e() helper`](https://laravel.com/docs/strings#method-e) and [Livewire Validation](https://livewire.laravel.com/docs/validation#real-time-validation) when dealing with user input.
:::

:::info 🌎 Online Demo
See an interactive example of [Saving Edit On Click Data](https://demo.livewire-powergrid.com/examples/validation).
:::

## Updating Custom Fields

When using [Custom Fields](/table-component/data-source-fields.html#custom-fields), most likely the field name in the `$field` variable will not match your database column name.

Since you probably have formatted the data, the data received in the `$value` variable will not match your column data type.

To update Custom Fields, you must first "catch" the custom field name, override it with the original field name, and then, most likely, reverted its data formatting.

The next example demonstrates handling data from a formatted currency input (E.g, 10.000,00 $) to be saved in a `double` database field (E.g, 10000.00).

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function onUpdatedEditable(string|int $id, string $field, string $value): void
    {
        //Catch the "price_formatted" field // [!code ++:13]
        if ($field === 'price_formatted') { 

            //Override the field
            $field = 'price'; 
            
            // Parse the value
            // 10.000,00 $ => 10000.00
            $value = str($value)->replace('.', '')
                ->replace(',', '.')
                ->replaceMatches('/[^Z0-9\.]/', '')
                ->toString();
        }

        Dish::query()->find($id)->update([
            $field => e($value),
        ]);
    }
}
```

The field `price_formatted`, which the `$value` is formatted currency (E.g, 10.000,00 $). The formatted string will be reverted to `10000.00`, for a `double` database column. Moreover, note that the parameter `$field` is set to `price`, which is the database column to be updated.

## Reload Data on Update

You may call the method `$this->fillData()` to reload data after a successful update.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function onUpdatedEditable(string|int $id, string $field, string $value): void
    {
       $updated = Dish::query()->find($id)->update([// [!code highlight:1]
            $field => e($value),
        ]);

        if ($updated) {// [!code ++:3]
            $this->fillData();
        }
    }
}
```

## Reload Data from External Component

A web application might have other components that interact with the data displayed in your grid, requiring you to refresh your Table after an update has occurred.

In order to  refresh the data, first you must set a unique [Table Name](/table-component/component-configuration.html#table-name) for your Component.

Then, you can dispatch the [event](/table-component/component-configuration.html#events) `pg:eventRefresh-YourTableName` within your component to refresh your Table.

Example:

```php
namespace App\Livewire;

use Livewire\Component;

class SomeComponent extends Component
{
    public function save()
    {
        //... some code ...

        $this->dispatch('pg:eventRefresh-DishTable');// [!code ++]
    }
}
```

## Skip Reload After Update

You may use Livewire's [Skipping re-renders](https://livewire.laravel.com/docs/actions#skipping-re-renders) functionality by calling the method `$this->skipRender()` after the update.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function onUpdatedToggleable($id, $field, $value): void
    {
        Dish::query()->where('id', $id)->update([
            $field => $value,
        ]);

        $this->skipRender();// [!code ++]
    }
}
```

## Data Validation

PowerGrid Table Components can use the [Livewire Validation](https://livewire.laravel.com/docs/validation#real-time-validation) feature to validate inputted data.

Just add a call to `$this->validate()` inside the `onUpdatedEditable()` or `onUpdatedToggleable()` methods.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
    public function rules()// [!code ++:6]
    {
        return [
            'name.*' => ['required', 'alpha', 'max:130'],
        ];
    }

    public function onUpdatedEditable(string|int $id, string $field, string $value): void
    {
        $this->validate(); // [!code ++]
        
        Dish::query()->find($id)->update([
            $field => e($value),
        ]);
    }
}
```

:::info 🌎 Online Demo
See an interactive example of [Data Validation](https://demo.livewire-powergrid.com/examples/validation) in PowerGrid.
:::

## Custom Field Validation

If you are rendering a Blade component via a [Custom Fields](/table-component/data-source-fields.html#custom-fields), you may share your Validation Errors as exemplified below:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Support\Facades\Blade;

class DishTable extends PowerGridComponent
{
    public bool $showErrorBag = true;

    public function fields(): PowerGridFields// [!code ++:12]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('dish_review', function ($dish) {
                $error = isset($this->getErrorBag()->getMessages()['dish_review.'.$dish->id])
                    ? $this->getErrorBag()->getMessages()['dish_review.'.$dish->id][0]
                    : null;

                return Blade::render('<x-editable :id="'.$dish->id.'" errors="'.$error.'" />');
            });
    }
}
```

The Blade component may look something like this:

```php
// app/View/Components/Editable.php

@props([
    'id' => null,
    'errors' => null
])
<div>
    <input wire:model="dish_review.{{ $id }}" type="text" class="form-control" placeholder="Enter your review">
    @if($errors)
        <div class="text-red-800">
            {!! $errors !!}
        </div>
    @endif
</div>
```
