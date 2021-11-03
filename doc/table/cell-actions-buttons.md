# Cell Action Buttons

Cell Action buttons can be configured in each column inside the [columns()](https://livewire-powergrid.docsforge.com/main/include-columns/) method.

This method is inside your PowerGrid file (e.g. `DishTable.php`).

## Usage

You can add buttons to your each cell of a column by chaining [Cell Action methods](#cell-action-methods) to `Column::add()`.

The following example adds a `toggleable` button to each cell of "In Stock" column.

```php
//..
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

### editOnClick(bool $isEditable)

If `$isEditable` is `true`, an "action link" will be displayed in the cell.

When the user clicks on this link, the cell is converted into an input text.

The content can be edited and saved by pressing the `<enter>` key.

Example:

```php
//...
$canEdit = true; //User has edit permission

Column::add()
    ->title('Name')
    ->field('name'),
    ->editOnClick($canEdit),
```

Result:

![editOnClick](../img/examples/cell_buttons/editOnClick.png)

> **❗ Important:** editOnClick on click requires [Update Data](https://livewire-powergrid.docsforge.com/main/update-data/) method to be configured.

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

Result: 

![toggleable](../img/examples/cell_buttons/toggleable.png)

> **❗ Important:** toggleable requires [Update Data](https://livewire-powergrid.docsforge.com/main/update-data/) method to be configured.

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

![clickToCopy](../img/examples/cell_buttons/clickToCopy.png)

---
