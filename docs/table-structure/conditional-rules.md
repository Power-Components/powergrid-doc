---
title: Conditional Rules
description: Make important data stand out automatically. Apply custom styles, colors, or hide buttons dynamically based on the data values in each row.
---

# Conditional Action Rules

[[toc]]

Use Action Rules to change a row, button, checkbox, radio, toggle switch, or detail toggle when a condition matches. Register them in `actionRules()`. Rules run on the server while PowerGrid renders the rows.

## Defining Action Rules

A Rule targets one element: [rows](/table-structure/rows.html), [buttons](/performance-and-look/buttons.html), [checkboxes](/table-structure/rows.html#checkboxes), or [radios](/table-structure/rows.html#radio-buttons). Start with `Rule::button()`, `Rule::rows()`, `Rule::checkbox()`, or `Rule::radio()`, then chain one condition and one or more [modifiers](#modifiers).

Each Rule accepts **one** condition: `when()`, or on `Rule::rows()` also `loop()`, `firstOnPage()`, `lastOnPage()`, or `alternating()`. Combining two conditions on the same Rule throws `InvalidArgumentException`. A Rule with no condition never applies.

`actionRules()` may receive the current `$row`. Closures passed to `when()` always receive it.

In the example below:

- The **Order** button text and style change when the product price is below 100.
- The **Order** button is hidden when the product is out of stock.
- Checkboxes are hidden when the product is out of stock.
- The row background changes when the product is out of stock.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Rule; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function actionRules(): array // [!code ++:21]
    {
        return [
            Rule::button('order-product')
                ->when(fn ($product) => $product->price < 100)
                ->slot('Order NOW! 🔥')
                ->setAttribute('class', '!bg-orange-400'),

            Rule::button('order-product')
                ->when(fn ($product) => $product->in_stock === false)
                ->hide(),

            Rule::checkbox()
                ->when(fn ($product) => $product->in_stock === false)
                ->hide(),

            Rule::rows()
                ->when(fn ($product) => $product->in_stock === false)
                ->setAttribute('class', '!bg-red-200'),
        ];
    }
}
```

`actionRules()` applies to **row** buttons, not [header](/table-structure/header-and-footer.html) buttons. Hide a header button with [`Button::can()`](/performance-and-look/buttons.html#can).

## Modifiers

Modifiers run when the Rule condition is true.

[[sub-toc]]

### disable()

Disables the target (buttons, checkboxes, and radios). On a button this sets the HTML `disabled` attribute. Disabled checkboxes are skipped by "select all".

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-product')
    ->when(fn ($product) => $product->in_stock === false)
    ->disable(),
```

### dispatch()

Sets the Livewire event dispatched by a **button** (`wire:click="$dispatch(...)"`). Parameters are JSON-encoded as you pass them — use `$row` for row values.

| Parameter       | Description   |
| --------------- | ------------- |
| (string) $event | Name of event |
| (array) $params | Parameters    |

::: tip
See [Dispatch](https://livewire.laravel.com/docs/events#dispatching-events) in the Livewire documentation.
:::

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

public function actionRules($row): array
{
    return [
        Rule::button('order-product')
            ->when(fn ($product) => $product->is_spicy === true)
            ->dispatch('showSpiceAlert', ['id' => $row->id]),
    ];
}
```

### hide()

Hides the target (buttons, checkboxes, and radios). Hidden checkboxes are also skipped by "select all".

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::checkbox()
    ->when(fn ($product) => $product->in_stock === false)
    ->hide(),
```

### hideToggleable()

Hides every [Toggleable](/data-management/editing-data.html#toggleable) switch on the row and shows the Yes/No labels instead. See also [showToggleable()](#showtoggleable) and [Toggleable column](#toggleable-column).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => $product->trashed())
    ->hideToggleable(),
```

### showToggleable()

Shows every [Toggleable](/data-management/editing-data.html#toggleable) switch on the row. See also [hideToggleable()](#hidetoggleable).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => ! $product->trashed())
    ->showToggleable(),
```

### loop()

A condition (not a modifier) for `Rule::rows()`: tests the current page's loop (`index`, `first`, `last`, `even`, `odd`, …) instead of the row. Same one-condition limit as `when()`.

Shortcuts: `firstOnPage()`, `lastOnPage()`, and `alternating()` (even rows).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->loop(fn ($loop) => $loop->index % 2)
    ->setAttribute('class', '!bg-gunmetal-100'),

Rule::rows()
    ->alternating()
    ->setAttribute('class', '!bg-gunmetal-100'),
```

### slot()

Replaces the button caption.

| Parameter      |
| -------------- |
| (string) $slot |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-product')
    ->when(fn ($product) => $product->on_sale === true)
    ->slot('Order 💰 ON SALE 💰'),
```

### setAttribute()

Sets an HTML attribute on the target.

On **buttons**, you may chain several `setAttribute()` calls. On **rows**, each call replaces the previous one — use a second `Rule::rows()` for another attribute.

| Parameter           | Description                               |
| ------------------- | ----------------------------------------- |
| (string) $attribute | HTML attribute (class, id, x-on:click …)  |
| (string) $value     | Attribute value                           |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => $product->in_stock === false)
    ->setAttribute('class', '!bg-red-200'),

Rule::button('order-product')
    ->when(fn ($product) => $product->in_stock === false)
    ->setAttribute('class', '!bg-red-200')
    ->setAttribute('title', 'Out of stock'),
```

### bladeComponent()

Replaces the button with a Blade component. Pass concrete values (use `$row`); field-name placeholders are not interpolated.

| Parameter           | Description                 |
| ------------------- | --------------------------- |
| (string) $component | View component path (Blade) |
| (array) $params     | Component attributes        |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

public function actionRules($row): array
{
    return [
        Rule::button('order-product')
            ->when(fn ($product) => $product->in_stock === false)
            ->bladeComponent('another-custom-button', ['productId' => $row->id]),
    ];
}
```

### hideToggleDetail() / showToggleDetail()

Hides or shows the [Detail Row](/table-structure/detail-row.html) collapse icon on the row.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => $product->trashed())
    ->hideToggleDetail(),
```

### disableEditOnClick() / enableEditOnClick()

Disables or enables every [Edit On Click](/data-management/editing-data.html#edit-on-click) cell on the row.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => $product->trashed())
    ->disableEditOnClick(),
```

### detailView()

Overrides the [Detail Row](/table-structure/detail-row.html) view and options for the matching row.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($product) => $product->has_extras)
    ->detailView('components.product-detail', ['showCalories' => true]),
```

## Toggleable column

Hide or show a **single** Toggleable column. `Rule::rows()->hideToggleable()` still hides every switch on the row.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::toggleable('in_stock')
    ->when(fn ($product) => $product->trashed())
    ->hide(),
```

`show()` is the counterpart.

## Radio

Same modifiers as checkboxes: `hide()`, `disable()`, `setAttribute()`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::radio()
    ->when(fn ($product) => $product->in_stock === false)
    ->disable(),
```

## Applying Conditional Data Formatting

To change how a **value** is displayed (currency, labels, HTML), use [Custom Fields](/data-management/formatting-data.html#transforming-data) rather than Action Rules.

## Performance

Rules run on the server for each row. For heavy per-row markup, prefer [Actions From Blade View](/table-structure/row-buttons.html#actions-from-blade-view) or [`Button::can()`](/performance-and-look/buttons.html#can) / [`Button::view()`](/table-structure/row-buttons.html#custom-button-view) instead of stacking many rules.
