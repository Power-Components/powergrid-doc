# Cell Action Buttons

Cell Action buttons can be configured in each column inside the [columns()](table/include-columns) method.

This method is inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

You can add buttons to your each cell of a column by chaining [Cell Action methods](#cell-action-methods) to `Column::add()`.

The following example adds a `toggleable` button to each cell of "In Stock" column.

```php
//...
public function columns(): array
{
  $canEdit = true; //User has edit permission

    return [

        Column::add()
            ->title('In Stock')
            ->field('in_stock'),
            ->makeBooleanFilter('in_stock', 'yes', 'no')
            ->toggleable($canEdit, 'yes', 'no'),
    ];
}
```

## Cell Action Methods

These methods will add action buttons to each cell of a specific column in your Table.

### editOnClick(hasPermission: true, fallback: 'Type here', saveOnMouseOutSide: false)

If `$hasPermission` is `true`, an "action link" will be displayed in the cell.

If the value is null and `$fallback` is filled, the input value will receive this value.

If `$saveOnMouseOutSide` is true, clicking anywhere outside will save the data

When the user clicks on this link, the cell is converted into an input text.

The content can be edited and saved by pressing the `<enter>` key.

When pressing esc the value entered will be canceled and returned to the normal state.

Example:

```php
//...
$canEdit = auth()->can('user_edit'); // User has edit permission

Column::add()
    ->title('Name')
    ->field('name'),
    ->editOnClick($canEdit),
```

> When pressing enter, powergrid will send the received value to a public property, which you can use however you want, 
but we recommend using the native powergrid method: `onUpdatedEditable`

```php
public ?string $name = null;

public function onUpdatedEditable($id, $field, $value): void
{   
    User::query()->find($id)->update([
            $field => $value,
    ]);
}
```

### Validation

> To do the validation, make sure you put **$rules** and the **validate()** method before saving

```php
public ?string $name = null;

protected array $rules = [
     'name.*' => ['required', 'min:6'],
];

public function onUpdatedEditable($id, $field, $value): void
{   
    $this->validate();
    
    User::query()->find($id)->update([
            $field => $value,
    );
}
```

Result:

<img class="result-image" alt="editOnClick" src="../_media/examples/cell_buttons/editOnClick.png" width="300"/>

!> **❗ Important:** editOnClick on click requires [Update Data](table/update-data?id=update-data) method to be configured.

!> **❗ ️Important:** This feature is not available when using table.column notation on $primaryKey (E.g., $primaryKey = 'dishes.name')

--- 

### toggleable(bool $isToggleable, string $trueLabel, string $falseLabel)

If `isToggleable` is `true`, the table cell will be converted into a `toggleable` button.

When it is `false`, the table cell will contain the text passed in `$trueLabel`/`$falseLabel`, according to its `boolean` value.

This is useful when the user do not have permission to edit data and must see a text instead of a button.

Example:

```php
//...
$canEdit = true; //User has edit permission

Column::add()
    ->title('In Stock')
    ->field('in_stock'),
    ->makeBooleanFilter('in_stock', 'yes', 'no')
    ->toggleable($canEdit, 'yes', 'no'),
```

> To get the data from a toggleable, use the `onUpdatedToggleable` method

```php
public function onUpdatedToggleable($id, $field, $value): void
{
   Dish::query()->find($id)->update([
       $field => $value,
   ]);
}
```
Result:

<img class="result-image" alt="toggleable" src="../_media/examples/cell_buttons/toggleable.png" width="100"/>

!> **❗ Important:** toggleable requires [Update Data](table/update-data?id=update-data) method to be configured.

!> **❗ Important:** This feature is not available when using table.column notation on $primaryKey (E.g., $primaryKey = 'dishes.name').

---

### clickToCopy(bool $hasPermission, string $caption)

If `$hasPermission` is `true`, PowerGrid appends a `click to copy button` to your table cell.

The argument `$caption` sets the button caption.

Example:

```php
//...
$canCopy = true; //User has permission to copy

Column::add()
    ->title('Name')
    ->field('name'),
    ->clickToCopy($canCopy, 'Copy name to clipboard'),
```

Result:

<img class="result-image" alt="clickToCopy" src="../_media/examples/cell_buttons/clickToCopy.png" width="200"/>

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/row-actions-buttons">Row Actions Buttons →</a></span>
</footer>
