# Column Filters

This section covers PowerGrid Column Filters.

Here you will find:

[[toc]]

## Introduction

The Search and Filter features are especially useful for when dealing with large tables. Rather than imposing limitations on the displayed data, users can have the freedom to choose which data they want to see.

In addition to the [Global Search Input](/table-features/header-and-footer.html#search-input), PowerGrid offers customizable Column Filters that enable users to selectively exclude rows that do not meet specific criteria based on column values.

## Activating Filters

Filters are registered inside the method `filters()` in your Table Component class.

To enable a new Column Filter, add a call to a [`Filter Facade`](/table-features/filters.html#/table-features/filters.html), indicating in the parameter `$column` the [Column](/table-component/component-columns.html#include-columns) to display the Filter. Then, proceed to configure the Filter by chaining its configuration methods.

If your Column is connected to a [Custom Field](/table-component/data-source-fields.html#custom-fields), you must pass the [Field](/table-component/component-columns.html#column-data-field) to the parameter `$field`, indicating the data source for the filtering query.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;// [!code ++]

class DishTable extends PowerGridComponent
{
    public function filters(): array // [!code ++:11]
    {
        return [
            Filter::inputText('name')->placeholder('Dish Name'),

            Filter::boolean('in_stock')->label('In Stock', 'Out of Stock')

            Filter::number('price_BRL', 'price')->thousands('.')
            ->decimal(','),
        ];
    }
}
```

:::info 🌎 Online Demo
See an interactive example of using [Filters](https://demo.livewire-powergrid.com/examples/filters-inline).
:::

## Filter Position

To configure PowerGrid's Filter display position, visit [Filter Configuration](/get-started/powergrid-configuration.html#filter-configuration) section.

If you want to configure it individually per component, use Laravel's [`config()`](https://laravel.com/docs/helpers#method-config) helper in your  component's `boot()` method.

In this example, the filters are set to "outside" position exclusively for this component.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function boot(): void// [!code ++:4]
    {
        config(['livewire-powergrid.filter' => 'outside']);
    }
}
```

## Expand/Collapse Outside Filters

When working with Outside Filters, you may want to initialize the filters in either an expanded or collapsed state.

To display expanded filters, simply declare the property `$showFilters` as `true` in your Components class.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public bool $showFilters = true;// [!code ++]
}
```

## Standard Filters

Here you can find PowerGrid Standard Filters.

* [Text Filter](/table-features/filters.html#text-filter)
* [Boolean Filter](/table-features/filters.html#boolean-filter)
* [Select Filter](/table-features/filters.html#select-filter)
* [Multi-Select Filter](//table-features/filters.html#multi-select-filter)
* [Multi-Select Filter Async](/table-features/filters.html#multi-select-async-filter)
* [Enum Select Filter](/table-features/filters.html#enum-select-filter)
* [Datetime Picker Filter](/table-features/filters.html#datetime-picker-filter)
* [Date Picker Filter](/table-features/filters.html#date-picker-filter)

---

### Text Filter

Includes text input and a dropdown menu with text search options in the chosen column header.

By default, the filter has all searching options enabled. To customize the available options, see the method `->operators()` below.

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
       Filter::inputText('name', 'name')
          ->operators(['contains', 'is', 'is_not']),
    ];
}
```

---

#### Input Filter Methods

Here you can find all configuration methods available for the Text Filter.

**operators(array $operators)**

Configures input text search options.

The parameter `$operator` accepts the following items:

```plain
contains, contains_not, 
is, is_not, 
starts_with, ends_with, 
is_empty, is_not_empty, 
is_null, is_not_null, 
is_blank, is_not_blank
```

---

### Boolean Filter

Includes a dropdown menu containing the options: "All", "true" and "false" in the chosen column header.

To customize the labels, see the `->label()` method below.

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::boolean('in_stock')
            ->label('yes', 'no'),
    ];
}
```

---

#### Boolean Filter Methods

Here you can find all configuration methods available for the Boolean Filter.

**label(string $trueLabel, string $falseLabel)**

Set the labels for `true` and `false` options (E.g, 'Active'/'Inactive').

---

### Select Filter

Includes dropdown menu with options from a data source in the chosen column header.

Example:

```php
use App\Models\Category;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::select('category_name', 'category_id')
            ->dataSource(Category::all())
            ->optionLabel('name')
            ->optionValue('id'),
    ];
}
```

---

#### Select Filter Methods

Here you can find all configuration methods available for the Select Filter.

**datasource(Collection|array|Closure $collection)**

Set a datasource to populate the select options.

---

**optionValue(string $value)**

Indicate the data source field to be displayed in options.

---

**optionLabel(string $value)**

Indicate the data source field to be used as each option ID.

---

### Multi-Select Filter

Includes multi-select dropdown menu with options from a data source in the chosen column header.

PowerGrid supports [TomSelect](https://tom-select.js.org/) and [SlimSelect](https://slimselectjs.com/) to render a multi-select filter.

For this filter to work properly, you must install and configure either of these packages. For more information, refer to the section on [Configuring TomSelect](/get-started/powergrid-configuration.html#tomselect) or [Configuring SlimSelect](/get-started/powergrid-configuration.html#slimselect).

Example:

```php
use App\Models\Category;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::multiSelect('category_name', 'category_id')
            ->dataSource(Category::all())
            ->optionValue('id')
            ->optionLabel('name'),
    ];
}
```

---

#### Multi-Select Filter Methods

Here you can find all configuration methods available for the Multi-Select Filter.

**datasource(Collection|array|Closure $collection)**

Set a datasource to populate the select options.

---

**optionValue(string $value)**

Indicate the data source field to be displayed in options.

---

**optionLabel(string $value)**

Indicate the data source field to be used as each option ID.

---

### Multi-Select Async Filter

If you don't want to load all together with the page loading, you may use this Async filter option. This filter works similarly to the [Multi-Select Filter](/table-features/filters.html#multi-select-filter).

PowerGrid relies on [TomSelect](https://tom-select.js.org/) for loading Async data, you must install and configure it for this filter to work properly. For more information, refer to the section on [Configuring TomSelect](/get-started/powergrid-configuration.html#tomselect).

The example below returns data from an API endpoint.

::: code-group

```php [PowerGrid Table]
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::multiSelectAsync('category_name', 'category_id')
                ->url(route('category.index'))
                ->method('POST')
                ->parameters(['Pasta'])
                ->optionValue('id')
                ->optionLabel('name'),
        ],
    }
}
```

```php [Route]
// routes/web.php
use App\Http\Controllers\Api\CategorySearch;

Route::post('category', CategorySearch::class)->name('category.index');
```

```php [API Controller]
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class CategorySearch extends Controller
{
    public function __invoke(Request $request): Collection
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->when($request->search,
                fn (Builder $query) => $query
                    ->where('name', 'like', "%{$request->search}%")
            )
            ->get();
    }
}
```

:::

#### Multi-Select Async Filter Methods

Here you can find all configuration methods available for the Multi-Select Async Filter.

**datasource(Collection|array|Closure $collection)**

Set a datasource to populate the select options.

---

**optionValue(string $value)**

Indicate the data source field to be displayed in options.

---

**optionLabel(string $value)**

Indicate the data source field to be used as each option ID.

---

**datasource(Collection|array|Closure $collection)**

Set a datasource to populate the select options.

---

**url(string $url)**

Set the API URL to load Filter data.

---

**method(string $method = 'get')**

Set the HTTP Request method.

---

**parameters(string $parameters = [])**

Sets the Request Payload.

---

### Enum Select Filter

Includes a dropdown menu with options using an [Enum](https://www.php.net/manual/en/language.types.enumerations.php) as data source in the chosen column header.

To display labels instead of case values, you can call the `labelPowergridFilter()` method inside your enum returning a string for each Enum case.

Example:

::: code-group

```php [PowerGrid Table]
// app/Livewire/DishTable.php

use App\Enums\Diet;
use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::enumSelect('diet', 'dishes.diet') // [!code highlight:3]
                ->datasource(Diet::cases())
                ->optionLabel('dishes.diet'),
        ];
    }

    public function columns(): array
    {
        return [
            Column::make('Dieta', 'diet', 'dishes.diet') // [!code highlight:1]
            //...
        ];
    }
}
```

```php [Enum Diet]
//app/Enums/Diet.php

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

    public function labelPowergridFilter(): string// [!code highlight:4]
    {
        return $this->labels();
    }
}
```

:::

:::info 🌎 Online Demo
See an interactive example of [Enum Filter](https://demo.livewire-powergrid.com/examples/filters-inline).
:::

---

#### Enum Filter Methods

Here you can find all configuration methods available for the Enum Filter.

**datasource(Collection|array $enumCases)**

Set a datasource to populate the select options.

---

**optionValue(string $value)**

Indicate the data source field to be displayed in options.

---

**optionLabel(string $value)**

Indicate the data source field to be used as each option ID.

---

### Datetime Picker Filter

Includes a [Flatpickr](https://flatpickr.js.org/) date picker input in the chosen column header.

For this filter to work properly, you must install and configure Flatpickr. For more information, refer to the section on [Configuring Flatpickr](/get-started/powergrid-configuration.html#flatpickr).

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::datetimepicker('produced_at_formatted', 'produced_at'),
            ->params([
                    'timezone' => 'America/Sao_Paulo',
            ]),
    ];
}
```

---

#### Datetime Filter Methods

Here you can find all configuration methods available for Datetime filter.

---

**params(array $params)**

This method configures the Flatpick behavior. The options passed to the `$params` parameter must be in a `key => value` format.

Available options:

| Parameter   | value    | Description                                          |
|-------------|----------|------------------------------------------------------|
| only_future | `bool`   | Disallow selecting dates in the past.                |
| no_weekends | `bool`   | Disallow selecting weekend dates.                    |
| timezone    | timezone | Parse the searched date with the specified timezone. |

---

### Date Picker Filter

Includes a [Flatpickr](https://flatpickr.js.org/) date picker input in the chosen column header.

The Date Picker Filter functions similarly to the Date Time filter and shares all of its methods and configuration.

For more details, refer to the section on [Datetime Picker Filter](/table-features/filters.html#datetime-picker-filter).

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::datepicker('creation_date_formatted', 'creation_date'),
    ];
}
```

## Dynamic Filter

Dynamic Filter lets you use an external component as a PowerGrid Filter. This is useful if you want to integrate packages like [WireUI](https://wireui.dev).

The example below renders the `<x-select>` component in the chosen column header.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::dynamic('in_stock', 'in_stock')
                ->component('select')
                ->attributes([
                    'class'           => 'min-w-[170px]',
                    'async-data'      => route('categories.index'),
                    'option-label'    => 'name',
                    'multiselect'     => false,
                    'option-value'    => 'id',
                    'placeholder'     => 'Test',
                    'wire:model.lazy' => 'filters.select.in_stock'
                ]),    
        ];
    }
}
```

---

**component(string $component)**

Set the component to be rendered.

---

**attributes(array $attributes)**

Passes attributes to the component.

## Interdependent Filters

Many web applications require establishing hierarchical relationships between filters. The selection of the initial filter will directly impact the available options in the second filter. A common example is State > City filters.

To create a dependent filter in PowerGrid, you must chain the method `depends()` passing which fields this filter depends on. Next, you need to pass a closure containing the filter logic to the `datasource()` method.

In the example below, choosing a category will affect the chef filter, displaying only chefs in the selected category.

```php
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;
use App\Models\Chef;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::select('category_name', 'category_id')
                    ->dataSource(Category::all())
                    ->optionLabel('name')
                    ->optionValue('id'),

                Filter::select('chef_name', 'chef_id')
                    ->depends(['category_id'])
                    ->dataSource(fn ($depends) => Chef::query()
                        ->when(isset($depends['category_id']),
                            fn (Builder $query) => $query->whereRelation('categories',
                                fn (Builder $builder) => $builder->where('id', $depends['category_id'])
                            )
                        )
                        ->get()
                    )
                    ->optionLabel('name')
                    ->optionValue('id'), 
        ];
    }
}
```

:::info 🌎 Online Demo
See an interactive example of using [Dependent Filter](https://demo.livewire-powergrid.com/examples/filters-inline).
:::

## Filter Builder

Sometimes, you may need to customize a Filter functionality to deal with different data formats and improve user experience.

The Filter Builder lets you change the way a Filter works by interacting the query in a `closure` function.

For example, while `calories` is not a boolean field, "caloric or light" is a boolean choice. So, here we can use the Filter `builder()` method to interpret the given option and build a query on the calorie counting. In this example, the criteria of "is caloric?" selects between dishes of 300 kcal or more ("caloric"/`true`) and dishes under 300 kcal ("light"/`false`).

```php
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array 
    {
        Filter::boolean('calories')// [!code ++:11]
            ->label('Caloric', 'Light')
            ->builder(function (Builder $query, string $value) {
                $q = match ($value) {
                    default => ['operator' => '>=', 'calories' => 0],
                    'true'  => ['operator' => '>=', 'calories' => 300],
                    'false' => ['operator' => '<', 'calories' => 300],
                };

                return $query->where('calories', $q['operator'], $q['calories']);
            }),
    }
}
```

Additionally, you may use the `collection()` similarly when working with Collections:

```php
use Illuminate\Support\Collection;

->collection(function (Collection $collection, mixed $value) {
    return $collection->where('some_field', '!=', $value);
})
```

:::info 🌎 Online Demo
See an interactive example of using [Filter Builder](https://demo.livewire-powergrid.com/examples/filters-inline).
:::

## Filter by Relationship

To filter by relationships, you must indicate your relationships in your Component's [`relationSearch()`](/table-features/searching-data.html#searching-with-relationship) method.

Then, you may configure the filter with the `filterRelation()` method passing the field and the dataField.

```php
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::inputText('category_name')// [!code ++:2]
                ->filterRelation('category', 'name')
        ];
    }
}
```

## Custom Components

If you need to further customize your filters, you may render Blade Components with the Filter. This is useful when working with external packages like [WireUI](https://livewire-wireui.com/).

To render a component, chain the `component()` method to your Filter passing the Blade View and the attributes you may want to use in your component(E.g, wire:model or classes).

To use default PowerGrid attributes, just call `$attributes->getAttributes()` within your component.

Example:

```php
// app/Livewire/DishTable.php

use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class DishTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::boolean('in_stock')
                ->component('my-custom-select', [
                    'class' => 'p-2',
            ]),
        ];
    }
}
```

Your component will look something like this:

```php
// resources/views/components/my-custom-select.blade.php

<div>
    @json($attributes->getAttributes())

    <input {{ $attributes->get('inputAttributes') }} />
</div>
```
