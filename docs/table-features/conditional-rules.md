# Conditional Action Rules

This section covers the Conditional Action Rules feature.

Here you will find:

[[toc]]

## Introduction

Many web applications require control over what data and actions are available and how they are displayed to the end user.

For example, you may want to remove a button if the user doesn't have the right permissions or to show a red background if a product is sold out.

PowerGrid provides a comprehensive set of `Action Rules` that can be used to manage the style, visibility, and behavior of Table rows, checkboxes, and buttons. These rules can be combined to meet specific conditions and requirements.

## Usage

Action Rules are registered inside the method `actionRules()` in your Table Component class.

Rules can be applied to 3 different targets: [Rows](/table-features/rows.html), [Buttons](/table-features/button-class.html) and [checkboxes](/table-features/rows.html#checkboxes).  A target may appear in more than one rule.

Each Rule consists of a `target object` and a `single condition` that must be satisfied, along with any number of [`modifiers`](/table-features/conditional-rules.html#modifiers). The modifiers will be applied once the condition is met.

To add a Rule, you must add a call to `Rule::class`, and proceed by defining a target using the methods `button()`, `row()` or `checkbox`. Next, you must chain a condition using the method `when()` and proceed by chaining [modifiers](/table-features/conditional-rules.html#modifiers).

For instance, a single button can be the target of two different rules. The first rule will change the button text and its background if the price is under a certain amount. The second rule will disable the button if the product is sold out.

In addition to these two Rules, we can also hide the checkboxes and change the row background when the product is out of stock.

Let's see the code for the example above:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Rule; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function actionRules(): array // [!code ++:21]
    {
        return [                
            Rule::button('order-dish')
                ->when(fn($dish) => $dish->price < 100)
                ->slot('Order NOW! 🔥')
                ->setAttribute('class', '!bg-orange-400'),

            Rule::button('order-dish')
                ->when(fn($dish) => $dish->in_stock === false)
                ->hide()

            Rule::checkbox()
                ->when(fn ($dish) => $dish->in_stock == false)
                ->hide(),
                
            Rule::rows()
                ->when(fn ($dish) => $dish->in_stock == false)
                ->setAttribute('class', '!bg-red-200'),
        ];
    }
}
```

:::info 🌎 Online Demo
See an interactive example of [Conditional Rules](https://demo.livewire-powergrid.com/examples/conditional-rules) on a Table.
:::

## Performance

Actions Rules are processed on the server side. If you are working with many Rules or [caching data](/table-component/component-configuration.html#cache), you should consider using [Actions From View](/table-features/rows.html#actions-from-blade-view) to improve your application's performance.

## Conditional Cell Data Formatting

See [Custom Fields](/table-component/data-source-fields.html#custom-fields) and [Formatting Data Examples](/table-component/data-source-fields.html#formatting-data-examples).

## Modifiers

The `Modifiers` will take effect when the Rule condition is satisfied.

Available methods:

- [`disable()`](#disable)
- [`dispatch()`](#dispatch)
- [`dispatchTo()`](#dispatchto)
- [`hide()`](#hide)
- [`hideToggleable()`](#hidetoggleable)
- [`redirect()`](#redirect)
- [`loop()`](#loop)
- [`slot()`](#slot)
- [`setAttribute()`](#setattribute)
- [`showToggleable()`](#showtoggleable)
- [`bladeComponent()`](#bladecomponent)

---

### disable()

Disables the Rule target (available for Buttons and Checkboxes).

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->in_stock == false)
    ->disable(),
```

---

### dispatch()

Sets the event to be emitted by the Rule target (available for Buttons).

| Parameter       | Description   |
|-----------------|---------------|
| (string) $event | Name of event |
| (array) $params | Parameters    |

:::tip 💡 TIP
Read more about [Dispatch](https://livewire.laravel.com/docs/events#dispatching-events) in the Livewire documentation.
:::

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->dispatch('showSpiceAlert', ['id' => 'id']),
```

---

### dispatchTo()

Sets the target component and the event name to be emitted by the Rule target (available for Buttons).

| Parameter       | Description    |
|-----------------|----------------|
| (string) $to    | Component name |
| (string) $event | Name of event  |
| (array) $params | Parameters     |

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->dispatchTo('alert-component', 'showSpiceAlert', ['id' => 'id']),
```

:::tip 💡 TIP
Read more about [Dispatch](https://livewire.laravel.com/docs/events#dispatching-events) in the Livewire documentation.
:::

---

### hide()

Hides the Rule target (available for Buttons and Checkboxes).

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::checkbox()
    ->when(fn($dish) => $dish->in_stock == false)
    ->hide(),
```

---

### hideToggleable()

Hides the [Toggleable Switch](/table-features/columns.html#toggleable) for the row. See also [showToggleable()](/table-features/conditional-rules.html#showtoggleable).

Note that this feature will only hide the Toggleable, not disable it.

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($dish) => $dish->trashed() == true)
    ->hideToggleable(),
```

---

### redirect()

Sets Rule target's redirect URL (available for Buttons).

| Parameter          | Description      | Default |
|--------------------|------------------|---------|
| (Closure) $closure | Closure          | `null`  |
| (string) $target   | HTML href target | _blank  |

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_new == true)
    ->redirect(fn($dish) => 'https://www.google.com/search?q='.urlencode(e($dish->name)), '_blank'),
```

---

### loop()

Interacts with the [Row index](/table-component/component-columns.html#index).

The example below generates a zebra striped Table by applying a background on even rows.

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->loop(fn ($loop) => $loop->index % 2)
    ->setAttribute('class', '!bg-gunmetal-100'),
```

---

### slot()

Sets the Rule target slot content (available for Buttons).

| Parameter      |
|----------------|
| (string) $slot |

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->on_sale == true)
    ->slot('Order 💰 ON SALE 💰'),
```

---

### setAttribute()

Sets a value to the Rule target attribute.

| Parameter           | Description                               |
|---------------------|-------------------------------------------|
| (string) $attribute | HTML attribute (class,id, x-on:click ...) |
| (string) $value     | Attribute value                           |

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn($dish) => $dish->in_stock == false)
    ->setAttribute('class', '!bg-red-200'),
```

When using Buttons as targets, you may chain as many `setAttribute()` methods as need.

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->in_stock == false)
    ->setAttribute('class', '!bg-red-200')
    ->setAttribute('wire:click', ['action' => [
        'params' => 1,
        'dishId' => 'id',
    ]]),

```

---

### showToggleable()

Shows the [Toggleable Switch](/table-features/columns.html#toggleable) for the row. See also [hideToggleable()](/table-features/conditional-rules.html#hidetoggleable).

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::rows()
    ->when(fn ($dish) => $dish->trashed() == false)
    ->showToggleable(),
```

---

### bladeComponent()

Changes the Blade Component in the Rule target.

| Parameter           | Default                     |
|---------------------|-----------------------------|
| (string) $component | View component path (blade) |
| (array) $params     | Blade parameters            |

Example:

```php
use PowerComponents\LivewirePowerGrid\Facades\Rule;

Rule::button('order-dish')
    ->when(fn($dish) => $dish->in_stock == false)
    ->bladeComponent('another-custom-button', ['dishId' => 'id']),
```
