# Cell Action Buttons

**** WIP ****

Cell Action buttons can be configured in each column inside the [columns()](https://livewire-powergrid-doc.docsforge.com/main/columns/) method.

## Usage

You can add buttons to your each cell of a column by chaining [Action methods](#cell-action-methods) to `Column::add()`.

The following example `toggleable` button to each cell of "In Stock" column.

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

These methods will add action button to each cell of specific column in your Table.

### editOnClick(bool $isEditable)

If `$isEditable` is true, the table cell will be converted into an input text.

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

If `isToggleable` is `true`, the table cell will be converted into `toggleable` button.

When `false`, the table cell will contain the text informed in `$trueLabel` or `$falseLabel`, according to your boolean field value.

This is useful when users do not have permission to edit data and must see a text instead of a button.

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

> **❗ Important:** editOnClick on click requires [Update Data](https://livewire-powergrid-doc.docsforge.com/main/update-data/) method to be configured.

---

### clickToCopy(bool $hasPermission, string $label)

If `$hasPermission` is `true`, Powergrid appends a click to copy button to your table cell.

Example:

```php
//...
Column::add()
    ->title('Name')
    ->field('name'),
    ->clickToCopy(),
```

---
