# Update Data

**** WIP ****

All data sent by the user should go under validation and treatment. For instance, the user sends price_formatted with the value of $ 4.947,70 to update the Product price.

The database has the field price and expects 44947.70. The developer must handle this data and point where to save it. Powergrid will not perform this conversion automatically. The same would happen wi

```php
public function update(array $product): bool
{
        /**
        * Reverts "price_formatted" to the database format and saves in the 'price' field.
        *  $ 4.947,70 --> 44947.70
        **/
        if ($data['field'] == 'price_formatted') {
              $data['field'] = 'price'; //Update the field price
              $data['value'] = Str::of($data['value'])
                ->replace('.', '')
                ->replace(',', '.')
                ->replaceMatches('/[^Z0-9\.]/', '');
        }
        /**
        *  Parses the date from d/m.Y (25/05/2021) 
        **/
         if ($data['field'] == 'created_at_formatted' && $data['value'] != '') {
            $data['field'] = 'created_at'; // Updates created_at
            $data['value'] =  Carbon::createFromFormat('d/m/Y', $data['value']);
         }
      try {
          $updated = Product::query()
            ->find($product['id'])
            ->update([
              $product['field'] => $product['value']
            ]);
      } catch (QueryException $exception) {
          $updated = false;
      }
      return $updated;
}
```

The update() method supports custom messages for each field.

To modify the displayed message after saving data, edit or add items on the updateMessages() method.

```
public function updateMessages(string $status, string $field = '_default_message'): string
    {
        $updateMessages = [
            'success'   => [
              '_default_message' => __('Data has been updated successfully!'),
               //...
              'name' => 'Product name updated successfully!'), // Custom message for name field
              ],

            "error" => [
              '_default_message' => __('Error updating the data.'),
               //'custom_field' => __('Error updating custom field.'),
            ]

        ];

        return ($updateMessages[$status][$field] ?? $updateMessages[$status]['_default_message']);
    }
    ```
