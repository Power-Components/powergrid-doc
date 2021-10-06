# Update Data

Some PowerGrid features like [Cell Action Buttons](https://livewire-powergrid-doc.docsforge.com/main/cell-action-buttons/) and [Row Action Buttons](https://livewire-powergrid-doc.docsforge.com/main/row-action-buttons/) will modify data in your Table.

To save this data, you must uncomment configure the `update()` method. 

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

First, uncomment the `update()` method and the `updateMessages()` method.

The `update()` method will receive data from your `field` and try to update it in your Datasource.

For example, you added a column with the field `name` and configured [Edit on click](https://livewire-powergrid-doc.docsforge.com/main/cell-action-buttons/#editonclickbool-iseditable) on it.

```php
Column::add()
    ->title('Dish name')
    ->field('name')
    ->editOnClick(true),
```

When the user edits a dish name and presses `<enter>`, the `update()` method will look for data with the row ID and update the field `name` for this row.

> **❗ Important:** You must treat and validate all data before the update query takes place. Additionally, you can also verify if the user has permission to edit data.

## Treating data

Some data needs to be treated and formatted to fit your database field type.

In the following example, the user sends the field `price_formatted` (`4.947,70 €`) but the database requires a decimal number (`4947.70`) to be saved in the `price` field.

A similar situation happens when editing dates: the date is sent as `dd/mm/yyyy` but the database expects `yyyy-mm-dddd`.

PowerGrid will NOT perform this conversion automatically. You must treat this data in your code, parsing and converting the value and saving on the correct database field.

```php
public function update(array $dish): bool
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
        ->find($dish['id'])
        ->update([
          $dish['field'] => $dish['value']
        ]);
  } catch (QueryException $exception) {
      $updated = false;
  }
  return $updated;
}
```

## Messages

The update operation will generate `success` or `error` messages.

A `_default_message` key is provided with a generic message.

Custom messages for specific fields (columns) can be configured inside the `updateMessages()`.

The following example shows the generic message and custom messages for `name` and `price` field.

```php
public function updateMessages(string $status, string $field = '_default_message'): string
{
    $updateMessages = [
        'success'   => [
          '_default_message' => __('Data has been updated successfully!'),

          //'custom_field' => __('Succes with custom field.'),
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
