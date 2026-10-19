---
title: Validating Data
description: Validate inline edits with Livewire rules before persisting PowerGrid table updates.
---

# Validating Data

[[toc]]

## Introduction

PowerGrid uses [Livewire Validation](https://livewire.laravel.com/docs/validation#real-time-validation). Define rules on the table component and call `$this->validate()` in `onPluginUpdated()` before you persist.

The Editable plugin writes the submitted value onto the component as `$this->{$field}[$id]` before it calls `onPluginUpdated()`. Rules therefore target `{field}.*` (for example `name.*`).

## Defining validation rules

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function rules() // [!code ++:6]
    {
        return [
            'name.*' => ['required', 'string', 'max:130'],
        ];
    }

    public function onPluginUpdated(string $plugin, string $event, array $params): void
    {
        $this->validate(); // [!code ++]

        Product::query()->find($params['id'])->update([
            $params['field'] => $params['value'],
        ]);
    }
}
```

See [Editing Data](/data-management/editing-data.html) for the plugin update flow.

## Showing edit-on-click errors

The Editable plugin renders `@error($field.'.'.$id)` next to the cell when `config('livewire-powergrid.show_error_bag')` is truthy.

That key is not in the published config by default. Enable it in `config/livewire-powergrid.php`:

```php [config/livewire-powergrid.php]
'show_error_bag' => true,
```

## Validating custom fields

If you render a Blade component from a [custom field](/data-management/formatting-data.html#transforming-data), pass Livewire error messages into the view:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\HtmlString;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields // [!code ++:12]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('product_review', function ($product) {
                $error = $this->getErrorBag()->getMessages()['product_review.'.$product->id][0] ?? null;

                return new HtmlString(
                    Blade::render('<x-editable :id="'.$product->id.'" errors="'.$error.'" />')
                );
            });
    }
}
```

```php [app/View/Components/Editable.php]
@props([
    'id' => null,
    'errors' => null
])
<div>
    <input wire:model="product_review.{{ $id }}" type="text" class="form-control" placeholder="Enter your review">
    @if($errors)
        <div class="text-red-800">
            {!! $errors !!}
        </div>
    @endif
</div>
```
