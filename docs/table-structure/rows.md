---
title: Table Rows
description: Enhance row interactivity. Add expandable detail rows, checkboxes, radio buttons, and action buttons to create a rich user experience.
---

# Table Rows

[[toc]]

## Checkboxes

Call `showCheckBox()` in `setUp()`. By default it uses the field `id`. Pass another attribute name when needed.

Selected values are in `$this->checkboxValues` (also via `checkedValues()`). For header buttons that act on the selection, see [Bulk Actions](/table-structure/bulk-actions.html).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->showCheckBox();// [!code ++]

        return [];
    }
}
```

```php [app/Livewire/ProductTable.php]
$this->showCheckBox('uuid');
```

## Radio Buttons

Call `showRadioButton()` in `setUp()`. By default it uses the field `id`. The selected value is `$this->selectedRow`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->showRadioButton();// [!code ++]

        return [];
    }
}
```

```php [app/Livewire/ProductTable.php]
$this->showRadioButton('uuid');
```

## Image in Cell

See [Formatting Data - Image](/data-management/formatting-data.html#image).

## Cell Data Formatting

See [Custom Fields](/data-management/formatting-data.html#transforming-data) and [Formatting Data Examples](/data-management/formatting-data.html#formatting-common-data-types).

## Summary row

See [Summarizing Data](/data-management/summarizing-data.html).

## Toggle Switch

See [Toggleable](/data-management/editing-data.html#toggleable).

## Inline Editing

See [Edit On Click](/data-management/editing-data.html#edit-on-click).

## Dropdown Menu

See [Dropdown Menu](/data-management/formatting-data.html#dropdown-menu).

## Buttons

See [Row Buttons](/table-structure/row-buttons.html).

## Conditionally Show/Hide Controls

See [Conditional Rules](/table-structure/conditional-rules.html).

## Collapsible Rows

See [Detail Row](/table-structure/detail-row.html).

## Multi-row Bulk Actions

See [Bulk Actions](/table-structure/bulk-actions.html).
