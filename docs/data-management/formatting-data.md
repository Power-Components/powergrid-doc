---
title: Formatting Data
description: Transform datasource values with PowerGrid fields before they are rendered in the table.
---

# Formatting Data

[[toc]]

## Introduction

`fields()` maps datasource values to column fields. Closures on `PowerGrid::fields()->add()` create custom fields for dates, currency, badges, and other display-only values.

## Security

Never trust data being rendered. Scalar field values are escaped with `e()` automatically. If a `fields()` closure returns HTML (badges, images, Blade), wrap it in `Illuminate\Support\HtmlString`. A plain string that contains tags is shown as text.

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\HtmlString;

->add('status_badge', fn ($product): HtmlString => new HtmlString(
    '<span class="badge">'.e($product->in_stock ? 'Yes' : 'No').'</span>'
));
```

Use Laravel's [`e()` helper](https://laravel.com/docs/strings#method-e) on any untrusted value you interpolate into that HTML.

## Transforming data

`PowerGrid::fields()` returns a `PowerGridFields` instance. `add($name)` copies the datasource attribute. `add($name, $closure)` stores the closure result on the row.

Custom fields are used in columns like any other field. See [Defining Columns](/table-structure/columns.html#defining-columns).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use PowerComponents\LivewirePowerGrid\Column;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('id')
        ->add('name')
        ->add('price')
        ->add('name_uppercase', function ($product) { // [!code ++:6]
            return strtoupper($product->name);
        })
        ->add('price_with_discount', function ($product) {
            return floatval($product->price - ($product->price * 0.1));
        });
}

public function columns(): array
{
    return [
        Column::make('Uppercased name', 'name_uppercase', 'name'),

        Column::make('Discount Applied', 'price_with_discount', 'price'),
    ];
}
```

## Formatting common data types

[[sub-toc]]

### Date

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Carbon; // [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('created_at') // 2024-01-20 10:05:44
        ->add('created_at_formatted', function ($product) { // [!code ++:3]
            return Carbon::parse($product->created_at)->format('d/m/Y H:i'); // 20/01/2024 10:05
        });
}
```

### Plain number

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Number; // [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('calories') // 1234.56
        ->add('calories_formatted', function ($product) {
            return Number::format($product->calories, precision: 0).' kcal'; // 1,235 kcal
        });
}
```

### Currency

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Number; // [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('price') // 170.90
        ->add('price_in_eur', function ($product) { // [!code ++:3]
            return Number::currency($product->price, in: 'EUR', locale: 'pt_PT'); // € 170,90
        });
}
```

### Boolean

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('in_stock') // 1/0
        ->add('in_stock_label', function ($product) { // [!code ++:3]
            return $product->in_stock ? 'Yes' : 'No';
        });
}
```

### Text clipping

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('description')
        ->add('description_clipped', function ($product) { // [!code ++:3]
            return str($product->description)->words(8);
        });
}
```

For character truncation in the cell, see `Column::limit()` in [Table Columns](/table-structure/columns.html).

### Image

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\HtmlString;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('avatar', function ($product) { // [!code ++:3]
            return new HtmlString(
                '<img src="'.e(asset("images/{$product->id}.jpg")).'" alt="">'
            );
        });
}
```

### Status badge

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\HtmlString;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('status')
        ->add('status_badge', function ($product) { // [!code ++:9]
            $classes = match ($product->status) {
                'in_stock' => 'bg-green-100 text-green-800',
                'sold_out' => 'bg-red-100 text-red-800',
            };

            return new HtmlString(sprintf(
                '<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium %s">%s</span>',
                $classes,
                e($product->status)
            ));
        });
}
```

### HTML link

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\HtmlString;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('search_product_name', function ($product) { // [!code ++:7]
            return new HtmlString(sprintf(
                '<a href="https://www.google.com/search?q=%s">Search "%s"</a>',
                urlencode($product->name),
                e($product->name)
            ));
        });
}
```

### Dropdown menu

Render a Blade component as a custom field. Wrap the HTML in `HtmlString`.

::: code-group

```php [ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\HtmlString;

public function fields(): PowerGridFields
{
    $options = collect([1 => 'Category A', 2 => 'Category B', 3 => 'Category C']); // [!code ++]

    return PowerGrid::fields()
        ->add('id')
        ->add('name')
        ->add('category_name', function ($product) use ($options) { // [!code ++:8]
            return new HtmlString(Blade::render(
                '<x-select-category :options="$options" :productId="$productId" :selected="$selected" />',
                [
                    'options' => $options,
                    'productId' => intval($product->id),
                    'selected' => intval($product->category_id),
                ]
            ));
        });
}
```

```php [SelectCategory.php]
namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class SelectCategory extends Component
{
    public function __construct(public Collection $options, public int $productId, public string $selected)
    {
    }

    public function render(): View|Closure|string
    {
        return view('components.select-category');
    }
}
```

```php [select-category.blade.php]
@props(['selected', 'productId'])
<div>
    <select wire:change="categoryChanged($event.target.value, {{ $productId }})">
        @foreach ($options as $id => $name)
            <option
                value="{{ $id }}"
                @if ($id == $selected)
                    selected="selected"
                @endif
            >
                {{ $name }}
            </option>
        @endforeach
    </select>
</div>
```

:::

### Blade component

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Facades\Blade; // [!code ++]
use Illuminate\Support\HtmlString;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('rating_stars', fn ($product) => new HtmlString( // [!code ++]
            Blade::render('<x-rate rate="'.e($product->rating).'"/>')
        ));
}
```

### Enum

```php [app/Enums/Diet.php]
enum Diet: int
{
    case ALL = 0;
    case VEGAN = 1;
    case CELIAC = 2;

    public function labels(): string
    {
        return match ($this) {
            self::ALL => 'All diets',
            self::VEGAN => 'Suitable for Vegans',
            self::CELIAC => 'Suitable for Celiacs',
        };
    }
}
```

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use App\Enums\Diet; // [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('diet', function ($product) { // [!code ++:3]
            return Diet::from($product->diet)->labels();
        });
}
```
