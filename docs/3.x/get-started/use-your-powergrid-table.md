# Use your PowerGrid Table

## Including Table

There are two ways to use a PowerGrid Table in your page:

You can include it using a `<livewire>` tag:

```html
<livewire:dish-table/>
```

Or, using a Blade directive:

```html
@livewire('dish-table')
```

The preceding examples make use of the `DishTable` table. You must replace `dish-table` with your table name.

## Sub-folder

If your PowerGrid Table is located in a sub-folder (e.g.: Restaurants/DishTable.php), use:

```html
<livewire:restaurants.dish-table/>
```

## Passing arguments

You can pass arguments to your PowerGrid Table using the `<livewire>` tag.

For example, include the argument "type" in your tag to load only "pasta" dishes.

You can also put the "tableName" argument as well - this will avoid some conflict sending events to the same livewire component

```html
<livewire:dish-table type="pasta" tableName="table1"/>

<livewire:dish-table type="desserts" tableName="table2"/>
```

The argument should be declared as a `public property` inside your PowerGrid table (in this example: `DishTable.php`).

Then, the `$type` property can be used in your `datasource()` method:

```php
public string $type;

public string $tableName = 'default';

public function datasource(): ?Builder
{
    return Dish::query()->where('type', $this->type);
}
```

::: tip
💡 Read more about the [Datasource](table/datasource) method.
:::

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="../table/features-setup">Powergrid Table →</a></span>
</footer>
