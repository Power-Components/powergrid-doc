# Update Data

Some PowerGrid features like [Cell Action Buttons](table/cell-action-buttons) and [Row Action Buttons](table/row-action-buttons) allow the user to modify Table data and update the database.

You will need to configure your PowerGrid Table file (e.g. `DishTable.php`) to save data.

**Listeners:**

* [editOnClick()](table/update-data?id=editonclick)
* [toggleable()](table/update-data?id=toggleable)

### editOnClick

The column "Name" reads the field `name` and is configured to [editOnClick](table/cell-action-buttons?id=editonclickbool-iseditable).

```php
Column::add()
    ->title('Dish name')
    ->field('name')
    ->editOnClick(),
```

When the user edits a dish name, the `onUpdatedEditable()` method will "catch" all data sent for the that row ID and perform a database update on `name` for this row.

```php
public function onUpdatedEditable(string $id, string $field, string $value): void
{
    Dish::query()->find($id)->update([
        $field => $value,
    ]);
}
```

!> **❗ Important:** You must treat and validate all data before the update query takes place. Additionally, you can also verify if the user has permission to edit data.

---

## toggleable

The column "In Stock" reads the field `in_stock` and is configured to [toggleable](cell-actions-buttons?id=toggleablebool-istoggleable-string-truelabel-string-falselabel).

```php 
Column::add()
    ->title('In Stock')
    ->field('in_stock')
    ->makeBooleanFilter('in_stock', 'yes', 'no')
    ->toggleable($canEdit, 'yes', 'no'),

```

When the user edits a dish name, the `onUpdatedToggleable()` method will "catch" all data sent for the that row ID and perform a database update on `in_stock` for this row.

```php
public function onUpdatedToggleable(string $id, string $field, string $value): void
{
    Dish::query()->find($id)->update([
        $field => $value,
    ]);
}
```

---

## Custom columns

If your Table has [Custom Columns](table/add-columns?id=closure-examples), you must modify the `$data['field']` specifying the database field where the data will be saved.

For instance, the custom column `name_uppercase` must update the database field `name`. See the example below:

```php
public function addColumns(): PowerGridEloquent
{
  return PowerGrid::eloquent()
            ->addColumn('name')
            ->addColumn('name_uppercase', function (Dish $model) {
              return strtoupper($model->name);
            });
}

public function onUpdatedEditable(string $id, string $field, string $value): void
{
    //Read from column name_uppercase
    if ($field == 'name_uppercase') {
          Dish::query()->find($id)->update([
            'name' => $value,
          ]);// Update the database field name
    }
    //...
```

---

## Treating data

Some data needs to be treated and formatted to fit your database field type.

In the following example, the user sends the field `price_formatted` (`4.947,70 €`) but the database requires a decimal number (`4947.70`) to be saved in the `price` field.

A similar situation happens when editing dates: the date is sent as `dd/mm/yyyy` but the database expects `yyyy-mm-dddd`.

PowerGrid will NOT perform this conversion automatically. You must treat this data in your code, parsing and converting the value and saving on the correct database field.

```php
public function onUpdatedEditable(string $id, string $field, string $value): void
{
    // Gets price_formatted (4.947,70 €) and convert to price (44947.70).
    
    if ($field == 'price_formatted') {
          $field = 'price'; //Update the database field price
          $value = Str::of($value)
            ->replace('.', '')
            ->replace(',', '.')
            ->replaceMatches('/[^Z0-9\.]/', '');
    }

    //Parses the date from d/m.Y (25/05/2021) 
    if ($field == 'created_at_formatted' && $value != '') {
        $field = 'created_at'; // Updates the database field created_at
        $field =  Carbon::createFromFormat('d/m/Y', $value);
    }
      
    try {
        Dish::query()
            ->find($id)
            ->update([
                $field => $value
        ]);
    } catch (QueryException) {
    }
}
```

---

## Reload data after update

To reload data after a successful update, add `$this->fillData()` inside the `update()` method.

This might be useful when the data is changed with [Edit on click](table/cell-action-buttons?=editonclickbool-iseditable) and the table must be re-sorted.

Example:

```php
public function onUpdatedEditable(string $id, string $field, string $value): void
{
  //...

  try {
      // Update query
      $updated = Dish::query()
            ->find($id)
            ->update([
              $field => $value
            ]);
  } catch (QueryException $exception) {
      $updated = false;
  }

  // Reload data after a successful update
  if ($updated) {
      $this->fillData();
  }
  
  return $updated;
}
```

---

## Validation

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/queue-export">Queue Export →</a></span>
</footer>
