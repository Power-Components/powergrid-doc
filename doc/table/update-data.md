# Update Data

Some PowerGrid features like [Cell Action Buttons](https://livewire-powergrid.docsforge.com/main/cell-action-buttons/) and [Row Action Buttons](https://livewire-powergrid.docsforge.com/main/row-action-buttons/) allow the user to modify Table data and update the database.

You will need to configure your PowerGrid Table file (e.g. `DishTable.php`) to save data.

## Usage

First you must uncomment both, the `update()` method and the `updateMessages()` method.

```php
  public function update(array $data ): bool
  {
      //...
  }
  public function updateMessages(string $status, string $field = '_default_message'): string
  {
      //...
  }
```

The `update()` method will receive data from your `field` and try to update it in your database.

Let's take the following example:

The column "Name" reads the field `name` and is configured to [Edit on click](https://livewire-powergrid.docsforge.com/main/cell-action-buttons/#editonclickbool-iseditable).

```php
Column::add()
    ->title('Dish name')
    ->field('name')
    ->editOnClick(),
```

When the user edits a dish name, the `update()` method will "catch" all data sent for the that row ID and perform a database update on `name` for this row.

> **❗ Important:** You must treat and validate all data before the update query takes place. Additionally, you can also verify if the user has permission to edit data.

## Treating data

Some data needs to be treated and formatted to fit your database field type.

In the following example, the user sends the field `price_formatted` (`4.947,70 €`) but the database requires a decimal number (`4947.70`) to be saved in the `price` field.

A similar situation happens when editing dates: the date is sent as `dd/mm/yyyy` but the database expects `yyyy-mm-dddd`.

PowerGrid will NOT perform this conversion automatically. You must treat this data in your code, parsing and converting the value and saving on the correct database field.

```php
public function update(array $data): bool
{
    // Gets price_formatted (4.947,70 €) and convert to price (44947.70).
    
    if ($data['field'] == 'price_formatted') {
          $data['field'] = 'price'; //Update the field price
          $data['value'] = Str::of($data['value'])
            ->replace('.', '')
            ->replace(',', '.')
            ->replaceMatches('/[^Z0-9\.]/', '');
    }

      //Parses the date from d/m.Y (25/05/2021) 

      if ($data['field'] == 'created_at_formatted' && $data['value'] != '') {
        $data['field'] = 'created_at'; // Updates created_at
        $data['value'] =  Carbon::createFromFormat('d/m/Y', $data['value']);
      }
      
  try {
      // Update query
      $updated = Dish::query()
        ->find($data['id'])
        ->update([
          $data['field'] => $data['value']
        ]);
  } catch (QueryException $exception) {
      $updated = false;
  }

  return $updated;
}
```

## Reload data after update

To reload data after a successful update, add `$this->fillData()` inside the `update()` method.

This might be useful when the data is changed with [Edit on click](https://livewire-powergrid.docsforge.com/main/cell-action-buttons/#editonclickbool-iseditable) and the table must be re-sorted.

Example:

```php
public function update(array $data): bool
{
  //...

  try {
      // Update query
      $updated = Dish::query()
        ->find($data['id'])
        ->update([
          $data['field'] => $data['value']
        ]);
  } catch (QueryException $exception) {
      $updated = false;
  }

  // Reload data after a successful update
  if ($updated) (
      $this->fillData();
  }
  
  return $updated;
}


## Messages

The update operation will generate `success` or `error` messages.

A `_default_message` key is provided with a generic message to be used for all fields.

Custom messages can be configured for specific fields (columns) inside the `updateMessages()` method.

The following example shows the generic message and custom messages for `name` and `price` field.

```php
public function updateMessages(string $status, string $field = '_default_message'): string
{
    $updateMessages = [
        'success'   => [
          '_default_message' => __('Data has been updated successfully!'),

          //'custom_field' => __('Success updating custom field.'),
          'name' => 'Dish name updated successfully!'), // Custom message for name field
          'price' => 'Price updated! Inform the chef!'), // Custom message for price field
          
          ],

        "error" => [
          '_default_message' => __('Error updating the data.'),

          //'custom_field' => __('Error updating custom field.'),
          'price' => 'Error updating price, contact the support team!'), // Custom message for price field
        ]

    ];
    //...
```
