# Custom Columns

You can create Custom using the `addColumns()` method.

This method is inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

The `addColumns()` expects two arguments:

- *string* `$field` with the column name.
- `closure function` retuning the data processed for this column.

Example:

```php
//..
public function addColumns(): ?PowerGridEloquent
{
  return PowerGrid::eloquent()
    ->addColumn('name_uppercase', function (Dish $model) {
      return strtoupper($dish->name);
    })
    ->addColumn('price_after_taxes', function (Dish $model) {
      return taxCalculator::vat($model->price, 'PT');
    });
}
```

The example above creates two custom columns:

- *name_uppercase*: transforms the dish name to UPPER CASE.
- *price_after_taxes*: returns the dish price including taxes, making use of a fictitious tax calculator class.

> **❗ Important:** After creating a Custom column, you must include it in your Table using the [Column::add()](https://livewire-powergrid.docsforge.com/main/columns/) method.

## Examples

Sometimes, you need to display data in a human-friendly way.

This is often the case with date, currency and boolean values.

Let's check some examples!

### Date

The database field `created_at` has date stored as `yyyy-mm-dd H:i:s` (2021-01-20 10:05:44).

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

---
