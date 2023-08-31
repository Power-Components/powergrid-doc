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
Column::make(__('Price'), 'price')
    ->withSum('Sum', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withSum.png)

---

### withCount

* Will display the count of all records in the field

| Parameter       | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| (string) $label | The argument $label sets the button caption.                              | 'Count' |
| (bool) $header  | If is `true`, Powergrid will create a row in the table below the filters. | false   |
| (bool) $string  | If is `true`, Powergrid will create a row in the footer of the table.     | false   |


Example:

```php{5}
//...
Column::make(__('Price'), 'price')
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
Column::make(__('Price'), 'price')
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
Column::make(__('Price'), 'price')
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
Column::make(__('Price'), 'price')
    ->withMax('Max', true, false),
```

Result:
![Output](/_media/examples/cell_buttons/withMax.png)

### Summarizing formatted data

PowerGrid provides a convenient way to use `summarizeFormat()` method to display formatted data in your table.

To summarize formatted data (e.g. currency), you must add the passing summaryFormat method that returns an array of key and value (field, Closure).

Ex: 
```php
  public function summarizeFormat(): array
  {
        return [
            'price.{sum,avg}' => function ($value) {
               return (new \NumberFormatter('en_US', \NumberFormatter::CURRENCY))
                    ->formatCurrency($value, 'USD');
             },
             'price.{count,min,max}' => fn ($value) => $value,
        ];
  }
```

![Output](/_media/examples/summarize_format.png)

---

