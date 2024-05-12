# Data Source

This section covers your PowerGrid Component's Data Source configuration.

Here you will find:

[[toc]]

## Introduction

The Data Source is responsible for feeding data into your PowerGrid Table Component.

Currently, PowerGrid can receive data from the Eloquent Builder, Query Builder, Collections, and arrays.

## Configuring the Data Source

You may return the following types as in your Table's `datasource()` method.

| Type      | Type                                         | Online Example                                                       |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| [Eloquent Builder](https://laravel.com/docs/eloquent) | Illuminate\Database\Eloquent\Builder::class | 🌎 [Eloquent Builder](https://demo.livewire-powergrid.com/examples/datasource-relationship) |
| [Query Builder](https://laravel.com/docs/queries)    | Illuminate\Database\Query\Builder::class    | 🌎 [Query Builder](https://demo.livewire-powergrid.com/examples/datasource-query-builder)   |
| [Collection](https://laravel.com/docs/collections)       | Illuminate\Support\Collection::class        | 🌎 [Collection](https://demo.livewire-powergrid.com/examples/datasource-collection)         |
| Native PHP Array | `array`                                        | -                                                                    |

Here is an example using Eloquent to get the data of the Model `Dish`.

```php{9-12}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;// [!code ++]
use App\Models\Dish;// [!code ++]

class DishTable extends PowerGridComponent
{
  public function datasource(): ?Builder// [!code ++:4]
  {
    return Dish::query();
  }
}
```

::: info 🎉 Job done!
Let's jump to the [Data Source Fields](/table-component/data-source-fields) section and configure the fields from your Data Source.
:::

## Relationships

Of course, you can also load Relationships in your data source.

In this example, let's bring in the `Kitchen` relationship, to show where each dish was cooked.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
  public function datasource(): ?Builder
  {
    return Dish::query();// [!code --]
    return Dish::query()->with('kitchen');// [!code ++]
  }
}
```

The Dish Model might look something like this:

```php
// app/Models/Dish.php

class Dish extends Model
{
    public function kitchen(): BelongsTo
    {
        return $this->belongsTo(Kitchen::class);
    }

    // ...
}
```

:::info 🌎 Online Demo
See an interactive example of using [Relationships](https://demo.livewire-powergrid.com/examples/datasource-relationship).
:::

## Join Tables

Some features like [Column sortable()](/table-component/component-columns.html#sortable) or [Column Filters](/table-features/filters.html) may require you to join your relationship in your data source. This will make the relationship Table fields available in the same result row.

This example loads joins the `categories` relationship.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Dish;

class DishTable extends PowerGridComponent
{
  public function datasource(): ?Builder
  {
    return Dish::query();// [!code --]
    return Dish::query()// [!code ++:9]
              ->join('categories', function ($categories) {
                  $categories->on('dishes.category_id', '=', 'categories.id');
              })
              ->select([
                  'dishes.id',
                  'dishes.calories',
                  'categories.name as category_name',
              ]);
  }
}
```

:::info 🌎 Online Demo
See an interactive example of using [Join](https://demo.livewire-powergrid.com/examples/datasource-join).
:::

## Custom Primary Key

By default, PowerGrid uses the field `id` as your Model's primary key.

If you need to use a different database column, just add the property `$primaryKey` in your PowerGrid Component.

You may also configure the `$sortField` property to match your primary key.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public string $primaryKey = 'dishes.custom_dish_id';// [!code ++]

    public string $sortField = 'dishes.custom_dish_id';// [!code ++]
}
```

## Column/Key conflict

You might encounter a conflict between primary keys using the same field name (E.g,  `id`).

To solve this problem, you must define your key in the `$primaryKey` and `$sortField` proprieties.

Read more in the [Custom Primary Key](#custom-primary-key) subsection.
