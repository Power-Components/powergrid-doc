# Add Columns

Before adding columns to your table, you must make [Datasource](table/datasource) fields available as columns.

To make a new column, use the `addColumns()` method. This method is inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

The `addColumns()` method requires the datasource `$field` name as the first parameter.

Optionally, you can pass a `closure` as  a second parameter to process the data coming from your field.

The example above creates 4 columns:

- *id*:  based on the `id` field.
- *name*: based on the `name` field.
- *name_uppercase*: returns the `name` field value transformed to UPPER CASE.
- *price_after_taxes*: returns the `price` value with taxes. This example uses a fictitious tax calculator class.

```php
//..
public function addColumns(): ?PowerGridEloquent
{
  return PowerGrid::eloquent()
    ->addColumn('id')
    ->addColumn('name')
    ->addColumn('name_uppercase', function (Dish $model) {
      return strtoupper($model->name);
    })
    ->addColumn('price_after_taxes', function (Dish $model) {
      return taxCalculator::vat($model->price, 'PT');
    });
}
```

> **❗ Important:** After creating a column, you must include it in your Table using the [Column::add()](table/include-columns) method.

## Closure Examples

Sometimes, you need to display data in a human-friendly way.

This is often the case with date, currency and boolean values.

Let's check some examples using `closures` to format data!


### Link in cell

You can use `closures` to render `HTML` inside table cells.

The example below creates a new column called `location_link` containing a link formed by the `lat_long` field and the `location_name` field.

```php
//..
public function addColumns(): ?PowerGridEloquent
{
  return PowerGrid::eloquent()
    ->addColumn('location_link', function (Dish $model) {
      return '<a href="https://www.google.com/maps/search/' . $model->lat_long . '">'. $model->location_name .'</a>'; 
    });
}
```

The example above produces the HTML `<a href="https://www.google.com/maps/search/-22.973587702676607,-43.18527287193542">Copacabana</a>` which would look like: [Copacabana](https://www.google.com/maps/search/-22.973587702676607,-43.18527287193542).

<br/>

### Date

The database field `created_at` has date stored as `yyyy-mm-dd H:i:s` 2021-01-20 10:05:44.

The following code demonstrates a new custom column `created_at_formatted`.

In this column, date is parsed and displayed as `d/m/Y H:i` (20/01/2021 10:05).

```php
//..
public function addColumns(): ?PowerGridEloquent
{

  return PowerGrid::eloquent()
    ->addColumn('created_at_formatted', function (Dish $model) {
      return Carbon::parse($model->created_at)->format('d/m/Y H:i');
    });
}
```

### Currency

The next example creates a new custom column called `price_in_eur`.

This custom column displays the `price` amount (`170.90`) formatted as Portuguese Euro (`170,90 €`):

```php
//..
public function addColumns(): ?PowerGridEloquent
{
  $fmt = new NumberFormatter('pt_PT', NumberFormatter::CURRENCY);

  return PowerGrid::eloquent()
    ->addColumn('price_in_eur', function (Dish $model) {
      return $fmt->formatCurrency($model->price, "EUR");
    });
}
```

### Text summary

Large amounts of text can compromise the readability of your table. This is often the case with a product description, list of items, or blog posts.

It is a common practice to display an introduction of your text, an excerpt containing a certain number of words, instead of the full content.

This example shows how to trim the full text in the `$dish->description` database field:

```text
Homemade Lasagna with our slow-cooked beef ragù, traditional bechamel and parmesan. 
Lasagna is comfort food and it's always good when prepared correctly.
```

Into a new column named `description_excerpt`:

```text
"Homemade Lasagna with our slow-cooked beef ragù, traditional..."
```

Code:

```php
<?php

use Illuminate\Support\Str;

//...

public function addColumns(): ?PowerGridEloquent
{

  return PowerGrid::eloquent()
    ->addColumn('description_excerpt', function (Dish $model) {
        return Str::words($model->description, 8); //Gets the first 8 words
    });
}
```

### Boolean

True/false is not friendly for the end user. Displaying "Yes/No" is a better alternative.

In this example, we have a new custom column `available` which displays "yes"/"no" based on the database field `in_stock` (true/false).

```php
//..
public function addColumns(): ?PowerGridEloquent
{

  return PowerGrid::eloquent()
    ->addColumn('available', function (Dish $model) {
      return ($model->in_stock ? 'yes' : 'no');
    });
}
```

### Enum

If you have an Enum with labels, you can use a `closure` to display label values instead of default `case` values.

Available only in `Php 8.1+`.

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

The following example makes your table rows show `🍽️ All diets` instead of the database value `0`.

```php
//..
public function addColumns(): ?PowerGridEloquent
{

  return PowerGrid::eloquent()
    ->addColumn('diet', function (Dish $dish) {
        return Diet::from($dish->diet)->labels();
    });
}
```

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/include-columns">Include Columns →</a></span>
</footer>
