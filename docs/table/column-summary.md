# Column Summary

PowerGrid can include data summaries inside each [columns()](include-columns) header.

Summaries can display the column's sum, count, average, min and max value.

## Usage

Summaries are chained to the `Column::add()` method.

### withSum

* Will display the sum of all records in the field

| Parameter       | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| (string) $label | The argument $label sets the button caption.                              | 'Sum'   |
| (bool) $header  | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string  | If is `true`, Powergrid will create a row in the footer of the table.     | false   |


::: warning
This will pre-process all the data in your database to work with the sum of all records. **->get()**, in all cases, only one request is made;
:::

Example:

```php{5}
//...
Column::add()
    ->title(__('Price'))
    ->field('price')
    ->withSum('Sum', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withSum.png)

---

### withCount

* Will display the count of all records in the field

| Parameter      | Description                                                               | Default |
|----------------|---------------------------------------------------------------------------|---------|
| (string) $label  | The argument $label sets the button caption.                              | 'Count' |
| (bool) $header | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string | If is `true`, Powergrid will create a row in the footer of the table.     | false   |


Example:

```php{5}
//...
Column::add()
    ->title(__('Price'))
    ->field('price')
    ->withCount('Count', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withCount.png)

---

### withAvg

* Will display the avg of all records in the field

| Parameter       | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| (string) $label | The argument $label sets the button caption.                              | 'Avg'   |
| (bool) $header  | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string  | If is `true`, Powergrid will create a row in the footer of the table.     | false   |

Example:

```php{5-7}
//...
Column::add()
    ->title(__('Price'))
    ->field('price')
    ->withAvg('Avg', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withAvg.png)

---

### withMin

* Will display the min of all records in the field

| Parameter       | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| (string) $label | The argument $label sets the button caption.                              | 'Min'   |
| (bool) $header  | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string  | If is `true`, Powergrid will create a row in the footer of the table.     | false   |

Example:

```php{5-9}
//...
Column::add()
    ->title(__('Price'))
    ->field('price')
    ->withMin('Min', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withMin.png)

---

### withMax

* Will display the max of all records in the field

| Parameter       | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| (string) $label | The argument $label sets the button caption.                              | 'Max'   |
| (bool) $header  | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string  | If is `true`, Powergrid will create a row in the footer of the table.     | false   |

Example:

```php{5}
//...
Column::add()
    ->title(__('Price'))
    ->field('price')
    ->withMax('Max', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withMax.png)

### Summarizing formatted data

PowerGrid provides a convenient way to use [closures](add-columns.html?id=closure-examples#closure-examples) to display formatted data in your table.

To summarize formatted data (e.g, currency), you must pass the `formatted column` and `original column` to the methdo `field()`:

In the example next example, we have a column `price_BRL` formatting the amount in Brazilian Real currency format.

```php
public function addColumns(): PowerGridEloquent
{
    return PowerGrid::eloquent()
        ->addColumn('id')
            
        //1000.00
        ->addColumn('price')
            
        //R$ 1.000,00
        ->addColumn('price_BRL', fn (Dish $dish) => 'R$ ' . number_format(e($dish->price), 2, ',', '.'));
}
```

Next, we must pass the two columns to the `field()` method, when [including](include-columns.html) the "formatted price" column in our table:

-Column `price_BRL` containing the formatted value (R$ 1.000,00).

-Column `price` containing the raw amount (1000.00);

```php
public function columns(): array
{
    return [
        Column::add()
            ->title(__('ID'))
            ->field('id', 'dishes.id')
            ->searchable()
            ->sortable(),
            
        Column::add()
            ->title(__('Price'))
            ->field( 'price_BRL', 'price') //formatted field, original field
            ->withSum('Total amount', true, true),
    ];
}
```
