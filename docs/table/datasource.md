# Datasource

The `datasource()` method feeds data to your PowerGrid Table.

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

Example of usage with an Eloquent Model:

```php
//..
public function datasource(): ?Builder
{
  return Dish::query();
}
```

You can also load Relationships. See the following example:

```php
//..
public function datasource(): ?Builder
{
  return Dish::query()->with('kitchen');
}
```

::: tip
datasource supports these types of returns:
* **Eloquent Builder** - \Illuminate\Database\Eloquent\Builder::class
* **Query Builder** - \Illuminate\Database\Query\Builder::class
* **Collection** - \Illuminate\Support\Collection::class
* **array** - native array
:::

## Custom Primary Key

By default, PowerGrid uses the field `id` as your Model's primary key.

If your model uses a custom primary key, you must configure the property `$primaryKey` in your PowerGrid component.

The next example uses the column `custom_id` as primary key.

```php{5,7}
final class RestaurantsTable extends PowerGridComponent
{
    use ActionButton;

    public string $primaryKey = 'restaurants.custom_id';

    public string $sortField = 'restaurants.custom_id';

     //...
```

## Join Tables

Some features like [Column sortable()](include-columns?id=sortable) or [Column Filters](column-filters) may require you to join your relationship in your Datasource. This will make the relationship table fields available in the same result row.

The following example shows how to `join` the `categories` relationship:

```php{5-7}
//..
public function datasource(): ?Builder
{
  return Dish::query()
            ->join('categories', function ($categories) {
                $categories->on('dishes.category_id', '=', 'categories.id');
            })
            ->select([
                'dishes.id',
                'dishes.calories',
                'categories.name as category_name',
            ]);
}
```

## Keys conflict

You might encounter a conflict between primary keys using the same field name (E.g,  `id`).

To fix this problem, declare your `$primaryKey` and `$sortField` properties as the example shows:

```php{2,4}
//...
public string $primaryKey = 'dishes.id';

public string $sortField = 'dishes.id';
```

## Sort by join column

If you need to sort by a column that is in another table, you can add the table name along with the column. (E.g, `categories.name`)

```php
//...
public function columns(): array
{
      //...
      Column::make(__('Category'), 'category_name', 'categories.name')
          ->makeInputMultiSelect(Category::all(), 'name', 'category_id')
          ->sortable(),
      //...
}
```

