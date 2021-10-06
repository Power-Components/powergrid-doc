# Datasource

The `datasource()` method feeds data to your PowerGrid Table.

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

Example of usage with an Elloquent Model:

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

Some features like Column [sortable()](https://livewire-powergrid-doc.docsforge.com/main/columns/#sortable) requires you to `join` your relationship in your datasource.

The following example shows how to `join` the `categories` relationship:

```php
//..
public function datasource(): ?Builder
{
  return Dish::query()->join('categories', function($categories) { 
      $categories->on('dishes.category_id', '=', 'categories.id'); 
  })->select('dishes.*', 'categories.name as category_name'); 
}
```
