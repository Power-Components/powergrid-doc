# Column Filters

Filters can be configured under each column.

## Usage

The filters must be declared inside the array returned in the 'filters' method.

To use, you must use the Facade `Filter`, passing the column you want to apply the filter
and the `field` that will filter.

**Filter::multiSelect('category_name', 'category_id')**

`category_name`: Column name defined in Column::field()

`category_id`: Column name defined in Column::field() or Column dataField

Example:
```php{4,5,11,17-20}
public function addColumns(): PowerGridEloquent
{
    return PowerGrid::eloquent()
        ->addColumn('category_id', fn ($dish) => $dish->category_id)
        ->addColumn('category_name', fn ($dish) => $dish->category->name);
}

public function columns(): array
{
    return [
       Column::make('Category Name', 'category_name'),
    ]
}
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

---
Result:

![Output](/_media/examples/filters/makeInputMultiSelect.png)

---

Available filters:

* [Filter::inputText](./column-filters.html#filter-inputtext)
* [Filter::select](./column-filters.html#filter-select)
* [Filter::enumSelect](./column-filters.html#filter-enumselect)
* [Filter::boolean](./column-filters.html#filter-boolean)
* [Filter::datepicker](./column-filters.html#filter-datepicker)
* [Filter::multiSelect](./column-filters.html#filter-multiselect)
* [Filter::multiSelectAsync](./column-filters.html#filter-multiselectasync)
* [Filter::dynamic](./column-filters.html#filter-dynamic)

## Filter methods

These methods enable input for filters at your column header.

### Filter::inputText

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

### Filter::select

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

#### Select filter with labels

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
            Column::make('Code', 'code'),
        ];
    }

    public function filters(): array
    {
        return [
            Filter::select('code', 'code')
                ->dataSource(Dish::select('code')->distinct()->get())
                ->optionValue('code')
                ->optionLabel('code'),
        ];
    }
```

However, it results in very non-user-friendly Table:

![Output](/_media/examples/filters/selectWithoutLabel.png)

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
                ->field('code_label', 'code'),
        ];
    }

    public function filters(): array
    {
        /*
        Uses the codes collection as datasource for the options with the key "label" as the option label.
        */
        return [
            Filter::select('code', 'code')
                ->dataSource(Dish::codes())
                ->optionValue('label')
                ->optionLabel('code'),
        ];
    }
```

The example above results in a much more user-friendly table:

![Output](/_media/examples/filters/selectWithLabel.png)

---

### Filter::enumSelect

Includes a select filter based in a PHP Enum.

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->dataSource(Collection|array $enumCases)` : Diet::cases()
* `->optionValue(string $value)` : datasource field name to be displayed in options.
* `->optionLabel(string $value)` : field used by the filter.

Example:

```php{4-7}
public function filters(): array
{
    return [
        Filter::enumSelect('diet', 'dishes.diet')
            ->dataSource(\App\Enums\Diet::cases())
            ->optionLabel('dishes.diet'),
    ];
}
```

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

// Including column
Column::make('Dieta', 'diet', 'dishes.diet'),
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

### Filter::boolean

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

### Filter::datePicker

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

```php{4}
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

### Filter::multiSelect

Includes a specific field on the page to filter a hasOne relation in the column.

To use the multiSelect filter you must choose which frontend framework will be responsible for rendering
the selector between [TomSelect](https://tom-select.js.org/) or [SlimSelect](https://slimselectjs.com/).

#### Using SlimSelect

* Install
```bash
npm i slim-select
```

* Configure

Add in `app.js`

```js
import SlimSelect from 'slim-select'
window.SlimSelect = SlimSelect
```

Add in `app.css`

```css
@import "~slim-select/dist/slimselect.css";
```

change in `config/livewire-powergrid.php`

```php{2,20-23}
'select' => [
     'default' => 'slim',

     /*
     * TomSelect Options
      * https://tom-select.js.org
      */
       'tom' => [
       'plugins' => [
             'clear_button' => [
                  'title' => 'Remove all selected options',
             ],
        ],
      ],

      /*
     * Slim Select options
      * https://slimselectjs.com/
      */
       'slim' => [
       'settings' => [
             'alwaysOpen' => false,
       ],
   ],
 ],
```

#### Using TomSelect

* Install
```bash
npm i tom-select
```

* Configure

Add in `app.js`

```js
import TomSelect from "tom-select";
window.TomSelect = TomSelect
```

Add in `app.css`

```css
@import "~tom-select/dist/scss/tom-select.bootstrap5";
```

change in `config/livewire-powergrid.php`

```php{2,8-13}
'select' => [
     'default' => 'tom',

     /*
     * TomSelect Options
      * https://tom-select.js.org
      */
       'tom' => [
       'plugins' => [
             'clear_button' => [
                  'title' => 'Remove all selected options',
             ],
        ],
      ],

      /*
     * Slim Select options
      * https://slimselectjs.com/
      */
       'slim' => [
       'settings' => [
             'alwaysOpen' => false,
       ],
   ],
 ],
```

#### Using

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->dataSource(array|Collection $collection)` : parameter must be a [Datasource](datasource?id=datasource).
* `->optionValue(string $value)` : datasource field name to be displayed in options.
* `->optionId(string $value)` : field used by the filter.

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
````

Result:

![Output](/_media/examples/filters/makeInputMultiSelect.png)

--- 

### Filter::multiSelectAsync

If you don't want to load the multiselect data immediately when starting the page, you can use this feature, it helps your datatable behave faster. 
As Powergrid uses TomSelect, set it in settings (here). 

::: warning
* Make sure you have [TomSelect](./column-filters.html#using-tomselect) set up beforehand.
* You must use an external API or create your own endpoint: route, controllers.
::: 

#### Using

| Parameter        |
|------------------|
| (string) $column |
| (string) $field  |

#### Methods:

* `->dataSource(array|Collection $collection)` : parameter must be a [Datasource](datasource?id=datasource).
* `->optionValue(string $value)` : datasource field name to be displayed in options.
* `->optionId(string $value)` : field used by the filter.

**Async methods**:

* `->url(string $url)` : API URL used by the filter ([See example](./column-filters.html#api-example)).
* `->method(string $method = 'get')` : API method (get,post ..) used by the filter.
* `->parameters(string $parameters = [])` :  Other options to send in the Body of the request along with the text search

Example:
```php
public function filters(): array
{
    return [
         Filter::multiSelectAsync('category_name', 'category_id')
                ->url(route('category.index'))
                ->method('POST')
                ->parameters([0 => 'Luan'])
                ->optionValue('id')
                ->optionLabel('name'),
    ];
}
````

### API Example

* Route:
```php
Route::post('category', Index::class)->name('category.index');
```

* API Controller
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class Index extends Controller
{
    public function __invoke(Request $request): Collection
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->when($request->search,
                fn (Builder $query) => $query
                    ->where('name', 'like', "%{$request->search}%")
            )
            ->get();
    }
}
```


Result:
![Output](/_media/examples/filters/makeInputMultiSelect.png)

---

### Filter::dynamic

TODO

---

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

