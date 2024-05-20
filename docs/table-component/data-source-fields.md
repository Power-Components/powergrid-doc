# Data Source Fields

This section covers the PowerGrid Data Source fields.

Here you will find:

[[toc]]

## Introduction

Once your [Table Data Source](/table-component/data-source) method is properly configured, it's time to decide which fields you want to bring as columns to be later displayed on your Table.

## Adding Fields

To include fields from your data source, call the `PowerGrid::fields()` inside the `fields()` method. Then, proceed to chain as many data source fields as you need.

The next example adds the fields `id`, `name`, and `price`, bringing data directly from the database.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\PowerGrid;// [!code ++:2]
use PowerComponents\LivewirePowerGrid\PowerGridFields;

class DishTable extends PowerGridComponent
{
    public function fields(): PowerGridFields// [!code ++:7]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('price');
    }
}
```

<div class="success custom-block">
  <p class="custom-block-title">🎉 Super!</p>
  <p>Now, let's check out how to <a href="/table-component/component-columns.html">Add Columns</a>.</p>
</div>

## Custom Fields

Sometimes, we need to modify data from the database before showing it on the Table Component.

In addition to a data source field name, `PowerGrid::fields()->add()` also accepts a `closure` as a second parameter, allowing you to modify the data coming from the database.

::: danger ❗ WARNING
**Be careful:** Data returned in Custom Fields is **NOT escaped** by default. As a result, your application might be vulnerable to [XSS attacks](https://owasp.org/www-community/attacks/xss/).

It's highly recommended to use Laravel's [`e() helper`](https://laravel.com/docs/strings#method-e) to escape data return in Custom Fields.
:::

In the next example, in addition to the database `name` and `price` fields, the data source will have two new `Custom Fields`. These Custom Fields will output the `name` in UPPER CASE and the `price` with a 10% discount.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;// [!code ++:2]
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
    ->add('id')
    ->add('name')
    ->add('price')
    ->add('name_uppercase', function ($dish) {// [!code ++:6]
        return e(strtoupper($dish->name));
    })
    ->add('price_with_discount', function ($dish) {
        return floatval($dish->price - ($dish->price * 0.1));
    });
}
```

## Formatting Data Examples

Sometimes, you need might to display data in a human-friendly way. This is often the case with dates, currencies and boolean values.

[`Custom Fields`](/table-component/data-source-fields.html#custom-fields) provides you a convenient way to prepare and format your data.

Here are examples of some common ways of data formatting.

---

### Date

This example adds a new column `created_at_formatted` to display the formatted `created_at` datetime column.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Carbon;// [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('created_at') // 2024-01-20 10:05:44
        ->add('created_at_formatted', function ($dish) {// [!code ++:3]
            return Carbon::parse($dish->created_at)->format('d/m/Y H:i'); //20/01/2024 10:05
        });
}
```

---

### Currency

Displaying formatted currency can vastly improve the user experience.

This example adds a new column `price_in_eur` to display the formatted `price`.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Number;// [!code ++]

public function fields(): PowerGridFields
{
  return PowerGrid::fields()
        ->add('price') // 170.90
        ->add('price_in_eur', function ($dish) {// [!code ++:3]
            return Number::currency($dish->price, in: 'EUR', locale: 'pt_PT'); //€ 170,90
        });
}
```

---

### Boolean

Boolean values are not user-friendly.

This example adds a new column `in_stock_label` to return yes/no instead of true/false in `in_stock`.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
  return PowerGrid::fields()
        ->add('in_stock') // 1/0
        ->add('in_stock_label', function ($dish) {// [!code ++:3]
            return $dish->in_stock ? 'Yes' : 'No'; // Yes/No
        });
}
```

---

### Text summary

Large amounts of text can compromise the readability of your Table

This example adds a `description_excerpt` with only the first 8 words of the `description` field.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('description')
        ->add('description_excerpt', function ($dish) {// [!code ++:3]
           return str(e($dish->description))->words(8); //Gets the first 8 words
       });
}
```

::: danger ❗ WARNING
**Be careful:** Data returned in Custom Fields is **NOT escaped** by default. As a result, your application might be vulnerable to [XSS attacks](https://owasp.org/www-community/attacks/xss/).

It's highly recommended to use Laravel's [`e() helper`](https://laravel.com/docs/strings#method-e) to escape data return in Custom Fields.
:::

---

### HTML Link

Sometimes, you may need to render an HTML link inside a Table cell.

This example adds a `search_dish_name` column with a link to search for a dish name on Google, based on the `name` field.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('search_dish_name', function ($dish) {// [!code ++:7]
            return sprintf(
                '<a href="https://www.google.com/search?q=%s">Search "%s"</a>',
                urlencode(e($dish->name)),
                e($dish->name)
            );
        });
}
```

::: danger ❗ WARNING
**Be careful:** Data returned in Custom Fields is **NOT escaped** by default. As a result, your application might be vulnerable to [XSS attacks](https://owasp.org/www-community/attacks/xss/).

It's highly recommended to use Laravel's [`e() helper`](https://laravel.com/docs/strings#method-e) to escape data return in Custom Fields.
:::

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example generating an <a target="_blank" href="https://demo.livewire-powergrid.com/examples/custom-field-html-link">HTML Link</a>.</p>
</div>

---

### Dropdown Menu

Dropdown menus allow users to choose an option from a pre-established list. This can be very useful in a grid for manipulating data.

In the example below, we have created a [Blade component](https://laravel.com/docs/blade) that receives a list of options and the select category ID of each item. The component is rendered as a Custom Field, and it displays a select input with the category of each dish pre-selected.

::: code-group

```php [DishTable.php]
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

 public function fields(): PowerGridFields
    {
        $options = collect([1 => 'Category A', 2 => 'Category B',  1 => 'Category C' ]);// [!code ++]
 
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('category_name', function ($dish){// [!code ++:8]
               return Blade::render('<x-select-category type="occurrence" :options=$options  :dishId=$dishId  :selected=$selected/>',
                [
                    'options' => $options, 
                    'dishId' => intval($dish->id), 
                    'selected' => intval($dish->category_id)
                ]);
            });
    }
```

```php [SelectCategory.php]
//app/View/Components/SelectCategory.php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class SelectCategory extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Collection $options, public int $dishId, public string $selected)
    {
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.select-category');
    }
}
```

```php [select-category.blade.php]
//resources/views/components/select-category.blade.php

@props(['selected', 'dishId'])
<div>
    <select wire:change="categoryChanged($event.target.value, {{ $dishId }})">
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

::: code-group

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using <a target="_blank" href="https://demo.livewire-powergrid.com/examples/input-select">Dropdown Menu</a> on a Table.</p>

</div>

---

### Image

This example demonstrates how to display images within a cell.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('avatar', function ($dish) { // [!code ++:3]
            return '<img src="' . asset("images/{$dish->id}.jpg") . '">';
        });
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using <a target="_blank" href="https://demo.livewire-powergrid.com/examples/custom-field-image">Images</a> on a Table.</p>

</div>

---

### Blade Component

Combining [`Custom Fields`](/table-component/data-source-fields.html#custom-fields) with [Blade components](https://laravel.com/docs/blade) can be a powerful tool to display customized content inside cells.

You can return a Blade Component as demonstrated below:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use Illuminate\Support\Facades\Blade; // [!code ++]

public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('name')
        ->add('rating_stars', fn ($dish) => Blade::render('<x-rate rate="' . $dish->rating . '"/>')); // [!code ++]
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using  a <a target="_blank" href="https://demo.livewire-powergrid.com/examples/custom-field-blade-component">Custom Field Blade Component</a>.</p>

</div>

---

### Enum

When you have an Enum with labels, you can use a `closure` to display label values instead of the default `case` values.

```php
// app/Enums/Diet.php

enum Diet: int
{
    case ALL      = 0;
    case VEGAN    = 1;
    case CELIAC   = 2;

    public function labels(): string
    {
        return match ($this) {
            self::ALL         => "🍽️ All diets",
            self::VEGAN       => "🌱 Suitable for Vegans",
            self::CELIAC      => "🥜 Suitable for Celiacs",
        };
    }
}
```

The following example renders `🍽️ All diets` instead of the database value `0`.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridFields;
use App\Enums\Diet;// [!code ++]

public function fields(): PowerGridFields
{

  return PowerGrid::fields()
        ->add('name')
        ->add('diet', function ($dish) {// [!code ++:3]
            return Diet::from($dish->diet)->labels();
        });
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using  <a target="_blank" href="https://demo.livewire-powergrid.com/examples/enum">Enums</a>.</p>

</div>

## Exporting Data

Sometimes, it may be necessary to omit certain formatted Columns when exporting data but still show them in the grid. This might be the case with images or HTML links.

To remove these Columns, see [Exclude Columns From Exporting](/table-features/exporting-data.html#exclude-columns-from-exporting).

## addColumns() (Deprecated)

The method `PowerGridFields::addColumns()` is deprecated, and it will be removed in PowerGrid 6.0.

Use the [PowerGridFields::fields()](/table-component/data-source-fields.html#adding-fields) method instead.

```php
use PowerComponents\LivewirePowerGrid\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridColumns;

//deprecated
public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
        ->addColumn('id')
        ->addColumn('name')
        ->addColumn('name_uppercase', function ($model) {
            return e(strtoupper($model->name));
        })
        ->addColumn('price_with_discount', function ($dish) {
            return floatval($dish->price - ($dish->price * 0.1));
        });
}
```
