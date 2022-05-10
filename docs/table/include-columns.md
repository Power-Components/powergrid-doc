# Include Columns

Table columns are controlled by the `columns()` method.

You can find this method is inside your PowerGrid file (e.g., `DishTable.php`).

!> **❗ Important:** Before proceeding, check if you have [Added the column](table/add-columns) in order to have it available for including.

## Usage

To display a column to your table, include a new `Column::add()` in the `columns()` method.

Place your code inside the method's `return []` statement.

You should always provide both [title()](#titlestring-title) and [field()](#fieldstring-field-string-datafield).  View all [Column Methods](#column-methods).

Example:

```php
public function columns(): array
{
  return [
    Column::add()
        ->title('ID')
        ->field('id'),

    Column::add()
        ->title('Dish name')
        ->field('name')
        ->searchable(),

    Column::add()
        ->title('Price + taxes')
        ->field('price_after_taxes')
        ->sortable(),
  ];
}
```
`or using make() method`
```php
public function columns(): array
{
  return [
    Column::make(title: 'ID', field: 'id'),

    Column::make(title: 'Dish name', field: 'name')
        ->searchable(),

    Column::make(title: 'Price + taxes', field: 'price_after_taxes')
        ->sortable(),
  ];
}
```

## Column Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Column` class.

### add()

Adds a new column to your PowerGrid Table.

Example:

`Column::add()`

---

### title(string $title)

Sets a title in the column header.

Example:

`->title('Price in EUR')`

> 💡 **TIP:**  You can translate your title using Laravel's [translation strings](https://laravel.com/docs/8.x/localization#retrieving-translation-strings) feature.

---

### placeholder(string $placeholder)

Sets the placeholder for this column when using a [Column Filter](table/column-filters).

Example:

`->title('Price')`

---

### field(string $field, string $dataField)

Links the column to an existing [Datasource](table/datasource) field or [Custom Column](table/custom-columns).

Example:

`->field('price_formatted')`

Optionally, you may pass a second parameter `$dataField` referring to the data source table and field. This is useful when you join tables and must maintain unique field names.

For example:

`->field('category_name', 'categories.name')`

---

### searchable()

By default, columns are not included when searching with [Search Input](table/features-setup?id=showsearchinput).

This method allows the column's content to be searched with this feature.

Example:

`->searchable()`

---

### sortable()

Adds a sort button to the column header.

Example:

`->sortable()` 

!> **❗ Important:** If your column fetches data via relationship, you must `join` the related table in your [Datasource](table/datasource) query.

---

### hidden()

Hides the column in your PowerGrid table.

Example:

`->hidden()`

---

### visibleInExport($visible)

When `true`, the column when be included when using the `export to file` function.

This method can be useful when you want a column to appear in the file but not at the web-page.

Example:

```php
Column::add()
    ->title('Postal envelope data')
    ->field('postal_data')
    ->hidden()
    ->visibleInExport(true),
```

---

### headerAttribute(string $class, string $style)

Adds the class or style to the column header.

Example:

`->headerAttribute('text-center', 'color:red')`

---

### bodyAttribute(string $class, string $style)

Adds the class or style to each table row in this column.

Example:

`->bodyAttribute('text-center', 'color:red')`

---
<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/column-filters">Column Filters →</a></span>
</footer>
