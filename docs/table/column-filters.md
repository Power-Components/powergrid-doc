# Column Filters

Filters can be configured under each column.

## Usage

The filters must be declared inside the array returned in the 'filters' method.

To use, you must use the Facade `Filter`, passing the column you want to apply the filter
and the `field` that will filter.

Example:

```php
public function filters(): array
{
    return [
       Filter::multiSelect('category_name', 'category_id')
          ->dataSource(Category::all())
          ->optionValue('id')
          ->optionLabel('name'),
    ];
}
```

Available filters:

* [inputText](./column-filters.html#inputtext)
* [select](./column-filters.html#select)
* [boolean](./column-filters.html#boolean)
* [datepicker](./column-filters.html#datepicker)
* multiSelect
* multiSelectAsync
* enumSelect
* dynamic


---

## Filter methods

These methods enable input for filters at your column header.

### inputText

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

`->operators(array $operators)`

* Empty - All operators will be loaded
* Only `contains` - Will hide the select and keep only the input text
  * Ex: `->operators(['contains'])`
* Some - You will be able to select some operators
  * Ex: `->operators(['contains', 'is_not'])`

| **Available Operators** |
|-------------------------|
| contains                |
| contains_not            |
| is                      |
| is_not                  |
| starts_with             |
| ends_with               |
| is_empty                |
| is_not_empty            |
| is_null                 |
| is_not_null             |
| is_blank                |
| is_not_blank            |

Example:

```php
public function filters(): array
{
    return [
       Filter::inputText('name', 'name')
          ->operators(['contains', 'is', 'is_not']),
    ];
}
```

Result:

![Output](/_media/examples/filters/makeInputText.png)

---

### select

Includes a specific field on the page to filter a hasOne relation in the column.

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->dataSource(Collection|array $collection)` : parameter must be a Datasource.
* `->optionValue(string $value)` : datasource field name to be displayed in options.
* `->optionLabel(string $value)` : field used by the filter.

Example:

```php{4-7}
public function filters(): array
{
    return [
        Filter::select('serving_at', 'serving_at')
            ->dataSource(Dish::servedAt())
            ->optionValue('serving_at')
            ->optionLabel('serving_at'),
    ];
}
```

Result:

![Output](/_media/examples/filters/makeInputSelect.png)

---

### boolean

Adds a filter for boolean values.

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->trueLabel(string $value)` : select option displayed for `true` (E.g, 'Active')
* `->falseLabel(string $value)` : select option displayed for `false` (E.g, 'Inactive')

Example:

```php{4-7}
public function filters(): array
{
    return [
        Filter::boolean('in_stock')
            ->trueLabel('yea')
            ->falseLabel('no'),
    ];
}
```

Result:

![Output](/_media/examples/filters/makeBooleanFilter.png)

---

### datePicker

Includes a specific field on the page to filter between the specific date in the column.

Set the language in the `config/livewire-powergrid.php` file as in the example according to your `config/app` - locale.

```php
 'plugins' => [
        // ..
        'flatpickr' => [
            // ..
            'locales'   => [
                'pt_BR' => [
                    'locale'     => 'pt',
                    'dateFormat' => 'd/m/Y H:i',
                    'enableTime' => true,
                    'time_24hr'  => true,
                ],
                'uk' => [
                    'locale'     => 'uk',
                    'dateFormat' => 'd/m/Y',
                    'enableTime' => false,
                    'time_24hr'  => true,
                ],
            ],
        ],
    ],
```

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->params(array $collection)` : Params must be passed as "key => value". Available keys are:
  - `'only_future' => true`: Will not allow to select dates in the past.
  - `'no_weekends' => true`: Will not allow to select weekends.

Example:

```php{4-7}
public function filters(): array
{
    return [
         Filter::datepicker('produced_at_formatted', 'produced_at'),
    ];
}
```
Result:

![Output](/_media/examples/filters/makeInputDatePicker.png)

---


### makeInputMultiSelect($dataSource, string $name, string $dataField)

Includes a specific field on the page to filter a hasOne relation in the column.

Parameters:

- `$dataSource`: parameter must be a [Datasource](datasource?id=datasource).
- `$name`: datasource field name to be displayed in options.
- `$dataField`: field used by the filter.

Example:

`->makeInputMultiSelect(Kitchen::all(), 'state', 'kitchen_id')`

Result:

![Output](/_media/examples/filters/makeInputMultiSelect.png)

---

### Select filter with labels

In some cases, you might want to change the displayed label for each option in your select filter.

For example, imagine a column `code` which holds numeric values representing certain product conditions.

The code 0 represents "Best before", 1 represents "Expiring" and 2 represents "Expired".

To build a table with a filter based on Database values, you can use:

```php

 public function addColumns(): PowerGridEloquent
    {
        return PowerGrid::eloquent()
            //...
            ->addColumn('code');
    }

    public function columns(): array
    {
        return [
            //...
            Column::add()
                ->title('code')
                ->field('code', 'code')
                ->makeInputSelect(Dish::select('code')->distinct()->get(), 'code', 'code')
        ];
    }
```

However, it results in very non-user-friendly Table:

![Output](/_media/examples/filters/selectWithoutLabel.png)

A better alternative is to pass the `$name` parameter to `makeInputSelect` and  `makeInputMultiSelect` to display a friendly value for the select option.

Let's see a full example:

First, let's create a method in `Dish` Model which will return a collection containing each code with the respective label.

This is very convenient as we can refer to it any time we need access to our product codes.

```php
// File: app/Models/Dish.php

<?php 

class Dish extends Model
{
    //...

    public static function codes()
    {
        return collect(
            [
                ['code' => 0,  'label' => 'Best before'],
                ['code' => 1,  'label' => 'Expiring'],
                ['code' => 2,  'label' => 'Expired'],
            ]
        );
    }
}
```

Now, we can use this method in `DishTable` to access our collection of codes.

```php

 public function addColumns(): PowerGridEloquent
    {
        return PowerGrid::eloquent()
            /*
              Returns the 'label' key of the first collection item matching the database value in column "code"
            */
            ->addColumn('code_label', fn ($dish) => Dish::codes()->firstWhere('code', $dish->code)['label'])
            ->addColumn('code');
    }

    public function columns(): array
    {
        return [
            //...
            Column::add()
                ->title('code')
                ->field('code_label', 'code')
                /*
                Uses the codes collection as datasource for the options with the key "label" as the option label.
                */
                ->makeInputSelect(Dish::codes(), 'label', 'code'),
        ];
    }
```

The example above results in a much more user-friendly table:

![Output](/_media/examples/filters/selectWithLabel.png)

---

### makeInputEnumSelect(array $enumCases, string $dataField = null, array $settings = [])

Includes a select filter based in a PHP Enum.

Available only in `Php 8.1+`.

Parameters:

- `$enumCases`: parameter must be a `enum`.
- `$dataField`: field used by the filter.
- `$settings`: Settings

Usage:  `->makeInputEnumSelect(Diet::cases(), 'dishes.diet')`

Example:

Consider the following Enum with Dietary restrictions.

The database field `diet` contains the `int` values (0, 1 or 2). In this Enum we added a method `label()` to display a human friendly value for each case.

```php
<?php

enum Diet: int
{
    case ALL      = 0;
    case VEGAN    = 1;
    case CELIAC   = 2;

    public function labels(): string
    {
        return match ($this) {
            self::ALL         => "🍽️ All diets",
            self::VEGAN       => "🌱 Suitable for Vegans",
            self::CELIAC      => "🥜 Suitable for Celiacs",
        };
    }
}
```

In PowerGrid you can make use of [closures](add-columns.html#enum) to display your Enum labels instead of the default database values.

Including the column with filter:

```php
//...

//Including column
Column::add()
    ->field('diet', 'dishes.diet')
    ->makeInputEnumSelect(Diet::cases(), 'dishes.diet')
    ->title(__('Dieta')),
```

Result:

![Output](/_media/examples/filters/makeInputEnumSelect.png)

To display your `labels` instead of case values, you can inlcude the `labelPowergridFilter` method inside your enum.

```php
<?php

enum Diet: int
{
    //...

   /**
     * Sends labels to PowerGrid Enum Input
     *
     */
    public function labelPowergridFilter(): string
    {
        return $this->labels();
    }
}
```

![Output](/_media/examples/filters/makeInputEnumSelectLabel.png)

---

### makeInputRange(string $dataField, string $thousands, string $decimal)

Adds a range filter input (min and max values).

The following example adds a range filter on "Dish Quality" column, filtering with `quantity` field.

```php
public function columns(): array
{
  return [
      Column::make('Dish Quantity', 'quantity'),
  ];
}
```

The example below sets `$thousands` and `$decimal` separators. This is useful with currency values.

PowerGrid parses the formatted `1.170,90` into a decimal number (`1170.90`) and filter data based on the `price` field.

```php
public function columns(): array
{
  return [
      Column::make('Price', 'price_in_brl')
          ->makeInputRange('price', '.', ','),
  ];
}
```

Result:

![Output](/_media/examples/filters/makeInputRange.png)

## Filter by Relationship

To filter by relationships, add each relationship of your main [Datasource](datasource?id=datasource) Table in the `relationSearch` method.

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

