---
title: Editing Data
description: Edit cells in place with click-to-edit inputs and boolean toggle switches.
---

# Editing Data

[[toc]]

## Introduction

`editOnClick()` and `toggleable()` are [plugins](/extending/plugin-system.html). They render in the cell and dispatch updates to `onPluginUpdated()`. They do not auto-save: you persist the value yourself, so they work with any datasource.

## Edit on click

Clicking a cell turns it into a contenteditable input. Enter submits. Escape discards. If the value is empty, a fallback can be shown.

Chain `editOnClick()` on a `Column`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
    public function columns(): array
    {
        return [
            Column::add()
                ->title('Name')
                ->field('name')
                ->editOnClick( // [!code ++:4]
                    hasPermission: auth()->check(),
                    fallback: '- empty -'
                ),
        ];
    }
}
```

If the column displays a [custom field](/data-management/formatting-data.html#transforming-data), the second argument to `field()` (or `editOnClick(dataField:)`) must be the database column that is saved:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Number;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('price')
            ->add('price_in_eur', function ($product) {
                return Number::currency($product->price, in: 'EUR');
            });
    }

    public function columns(): array
    {
        return [
            Column::add() // [!code focus:6]
                ->title('Price (EUR)')
                ->field('price_in_eur', 'price')
                ->editOnClick(
                    hasPermission: auth()->check(),
                    fallback: '€0,00'
                ),
        ];
    }
}
```

| Parameter              | Description                                                     | Default |
| ---------------------- | --------------------------------------------------------------- | ------- |
| (bool) $hasPermission  | When `true`, the cell is editable.                              | `true`  |
| (string) $dataField    | Field used as the editor value. Sets the column `dataField` when filled. | `''`    |
| (?string) $fallback    | Fallback text for empty values.                                 | `null`  |
| (bool) $saveOnMouseOut | If `true`, submit when clicking outside the input.              | `false` |

## Toggleable

The cell becomes a switch for a boolean. Without permission, a Yes/No badge is shown instead.

Relationship fields (`field` contains `.`) are not rendered as a switch.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
    public function columns(): array
    {
        return [
            Column::add()
                ->title('In Stock')
                ->field('in_stock')
                ->toggleable( // [!code ++:5]
                    hasPermission: auth()->check(),
                    trueLabel: 'Yes',
                    falseLabel: 'No'
                ),
        ];
    }
}
```

| Parameter             | Description                 | Default |
| --------------------- | --------------------------- | ------- |
| (bool) $hasPermission | Enable or disable the switch | `true`  |
| (string) $trueLabel   | Label when the value is true | Yes     |
| (string) $falseLabel  | Label when the value is false | No     |

## Handling updates

Editable and Toggleable call **only** `onPluginUpdated()`. [Validate](/data-management/validating-data.html) input before persisting.

| Parameter | Type                                                  | Description                                                         |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `$plugin` | `'editable' \| 'toggleable' \| string`                | Plugin that triggered the event.                                    |
| `$event`  | `string`                                              | `'updated'` for editable and toggleable.                            |
| `$params` | `array{id: string, field: string, value: string}`    | Record ID (as string), column `dataField`, and submitted value.     |

```php [app/Livewire/ProductTable.php]
use App\Models\Product;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function onPluginUpdated(string $plugin, string $event, array $params): void // [!code ++:13]
    {
        if ($plugin === 'editable' || $plugin === 'toggleable') {
            Product::query()->find($params['id'])->update([
                $params['field'] => $params['value'],
            ]);
        }
    }
}
```

`onUpdatedEditable()` and `onUpdatedToggleable()` remain as deprecated helpers that forward to `onPluginUpdated()`. The plugins never call them, so overriding them has no effect.

## Updating custom fields

`$params['field']` is the column's `dataField` (the `field()` value when no data field is set). If a custom field is edited without a data field (e.g. `Column::make('Price', 'price_formatted')`), the editor shows and submits the formatted value. Map it back and parse it before saving:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function onPluginUpdated(string $plugin, string $event, array $params): void
    {
        if ($plugin !== 'editable') {
            return;
        }

        $field = $params['field'];
        $value = $params['value'];

        if ($field === 'price_formatted') { // [!code ++:10]
            $field = 'price';
            $value = str($value)->replace('.', '')
                ->replace(',', '.')
                ->replaceMatches('/[^Z0-9\.]/', '')
                ->toString();
        }

        Product::query()->find($params['id'])->update([
            $field => $value,
        ]);
    }
}
```

## Reload data on update

Call `$this->fetchDatasource()` after a successful write if you need a full datasource refresh:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function onPluginUpdated(string $plugin, string $event, array $params): void
    {
        $updated = Product::query()->find($params['id'])->update([
            $params['field'] => $params['value'],
        ]);

        if ($updated) { // [!code ++:3]
            $this->fetchDatasource();
        }
    }
}
```

## Reload data from another component

Set a unique [table name](/performance-and-look/table-reference-name.html), then dispatch `pg:eventRefresh-{tableName}`:

```php [app/Livewire/SomeComponent.php]
namespace App\Livewire;

use Livewire\Component;

class SomeComponent extends Component
{
    public function save()
    {
        $this->dispatch('pg:eventRefresh-ProductTable'); // [!code ++]
    }
}
```

## Skip re-render after update

Call Livewire's [`skipRender()`](https://livewire.laravel.com/docs/actions#skipping-re-renders) after the update:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function onPluginUpdated(string $plugin, string $event, array $params): void
    {
        Product::query()->where('id', $params['id'])->update([
            $params['field'] => $params['value'],
        ]);

        $this->skipRender(); // [!code ++]
    }
}
```
