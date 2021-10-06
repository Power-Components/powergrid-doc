# Columns

Table columns are controlled by the `columns()` method.

You can find this method is inside your PowerGrid file (e.g., `DishTable.php`).

## Usage

To add a column, include a new `Column::add()` in the `columns()` method.

Place your code inside the method's `return []` statement.

You should always provide both [title()](#titlestring-title) and [field()](#fieldstring-field).  View all [Column Methods](#column-methods).

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

### field(string $field)

Links the column to an existing [Datasource](https://livewire-powergrid-doc.docsforge.com/main/datasource/) field or [Custom Column](https://livewire-powergrid-doc.docsforge.com/main/custom-columns/).

Example:

`->field('price_formatted')`

---

### searchable()

Allows the column's content to be searched when using the [Search Input](https://livewire-powergrid-doc.docsforge.com/main/features-setup/#showsearchinput)

Example:

`->searchable()`

---

### sortable()

Adds a sort button to the column header.

Example:

`->sortable()`

> **❗ Important:** If your column fetches data via relationship, you must `join` the related table in your [Datasource](https://livewire-powergrid-doc.docsforge.com/main/datasource/) query.

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
