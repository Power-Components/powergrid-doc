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

## Join Tables

Some features like [Column sortable()](https://livewire-powergrid.docsforge.com/main/include-columns/#sortable) or [Column Filters](https://livewire-powergrid.docsforge.com/main/column-filters/) may require you to join your relationship in your Datasource. This will make the relationship table fields available in the same result row.

The following example shows how to `join` the `categories` relationship:

```php
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

```php
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
      Column::add()
          ->title(__('Categoria'))
          ->field('category_name')
          ->makeInputMultiSelect(Category::all(), 'name', 'category_id')
          ->sortable('categories.name'),
      //...
}
```