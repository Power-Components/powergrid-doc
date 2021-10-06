# Cell Action Buttons

Cell Action buttons can be configured in each column inside the [columns()](https://livewire-powergrid-doc.docsforge.com/main/columns/) method.

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

If `$isEditable` is `true`, the table cell will be converted into an input text.

The user can edit the content and save it by hit `<enter>`.

Example:

```php
//...
$canEdit = true; //User has edit permission

Column::add()
    ->title('Name')
    ->field('name'),
    ->editOnClick($canEdit),
```

> **❗ Important:** editOnClick on click requires [Update Data](https://livewire-powergrid-doc.docsforge.com/main/update-data/) method to be configured.

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

> **❗ Important:** toggleable requires [Update Data](https://livewire-powergrid-doc.docsforge.com/main/update-data/) method to be configured.

---

### clickToCopy(bool $hasPermission, string $label)

If `$hasPermission` is `true`, PowerGrid appends a `click to copy button` to your table cell.

Example:

```php
//...
Column::add()
    ->title('Name')
    ->field('name'),
    ->clickToCopy(),
```

---
