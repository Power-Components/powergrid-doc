# Column Filters

Filters can be configured under each column, inside the [columns()](https://livewire-powergrid-doc.docsforge.com/main/columns/) method.

## Usage

You can add a filter to your column header by chaining a [Filter method](#filter-methods) to `Column::add()`.

The following example adds a range filter (min/max) to the "Dish Quantity" column.

```php
public function columns(): array
{
  return [
    Column::add()
        ->title('Dish Quantity')
        ->field('quantity'),
        ->makeInputRange(),
  ];
}
```

## Filter methods

These methods enable input for filters at your column header.

### makeInputText(string $dataField)

Adds an input text filter on the column.

Example:

`->makeInputText('name')`

---

### makeBooleanFilter(string $dataField, string $trueLabel, string $falseLabel)

Adds a filter for boolean values.

Example:

`->makeBooleanFilter('in_stock', 'yes', 'no')`

---

### makeInputDatePicker(string $class)

Includes a specific field on the page to filter between the specific date in the column.

Default class: `col-3`

Example:

`->makeInputDatePicker()`

---

### makeInputSelect($data_source, string $display_field, string $relation_id, array $settings)

Includes a specific field on the page to filter a hasOne relation in the column.

Parameters:

- `$data_source`: parameter must be a [Datasource](https://livewire-powergrid-doc.docsforge.com/main/datasource/).
- `$display_field`: value to be fetched from the datasource.
- `$relation_id`:  datasource row ID.

Options:

- `live-search =>  [true/false]` feature works only with Bootstrap.
- `class => ''` adds a class to your select element.

Example:

`->makeInputSelect(Category::all(), 'category', 'category_id', ['live-search' => true])`

---

### makeInputMultiSelect($data_source, string $display_field, string $relation_id)

Includes a specific field on the page to filter a hasOne relation in the column.

Parameters:

- `$data_source`: parameter must be a [Datasource](https://livewire-powergrid-doc.docsforge.com/main/datasource/).
- `$display_field`: value to be fetched from the datasource.
- `$relation_id`:  datasource row ID.

Example:

`->makeInputSelect(Category::all(), 'category', 'category_id'])`

---

### makeInputRange(string $dataField, string $thousands, string $decimal)

Adds a range filter input (min and max values).

The following example adds a range filter on "Dish Quality" column, filtering with `quantity` field.

```php
public function columns(): array
{
  return [
    Column::add()
        ->title('Dish Quantity')
        ->field('quantity'),
  ];
}
```

The example below sets `$thousands` and `$decimal` separators. This is useful with currency values.

PowerGrid parses the formatted `1.170,90` into a decimal number (`1170.90`) and filter data based on the `price` field.

```php
public function columns(): array
{
  return [
    Column::add()
      ->title('Price in EUR')
      ->field('price_in_eur')
      ->makeInputRange('price', '.', ','),
  ];
}
```

## Filter by Relationship

To filter by relationships, add each relationship of your main [Datasource](https://livewire-powergrid-doc.docsforge.com/main/datasource/) Table in the `relationSearch` method.

The relationships must be added in the format:

`'model_name' => ['search_column_A', 'search_column_B'...]`.

Example:  

```php
public function relationSearch(): array
{
    return [
        'kitchen' => [ // relationship on dishes model
            'name', // column enabled to search
        ],
        //...
    ];
}
```

The example above adds the relationship to the `kitchen`  Model and allows the column `name` to be searched.
