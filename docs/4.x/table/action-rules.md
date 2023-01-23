# Action Rules

Sometimes you need to control the behavior of rows, checkboxes, or buttons based on record value, user permission or the combination of multiple conditions.

A common example is to list out-of-stock products with a red background and without the "Order" button.

PowerGrid offers a set of `Action Rules` which can be combined to control style, content, and behavior of `Action Buttons`, `Action Checkboxes` and table rows.

## Usage

`Action Rules` must be declared inside the array returned by the `actionRules()` method.

Each `Rule` is enforced on a specific `Target` (e.g: Button 'foo').

The `Rule` must contain one `when()` condition method and one or more `modifier` methods.

The modifiers will take effect when the condition is satisfied.

The following code represents the "out-of-stock" use case described in this page introduction:

```php{5,8,17,19}
// Create an Action Button for ordering a dish.
public function actions(): array
{
    return [
        Button::add('order-dish')
            ->caption('Order')
            ->class('bg-blue-500 cursor-pointer text-white px-3 py-2 m-1 rounded text-sm')
            ->emit('order-dish', ['dishId' => 'id'])
    ];
}

// Rules
public function actionRules(): array
{
    return [
        // Hide order button when dish is out-of-stock
        Rule::button('order-dish')
            ->when(fn($dish) => $dish->in_stock == false)
            ->hide(),
        // Set red background on rows for dishes which are not free and are out-of-stock 
        Rule::rows()
            ->when(function ($dish) { 
                return $dish->price > 0 && $dish->in_stock == false;
            })
            ->setAttribute('class', 'bg-red-200'),
    ];
}
```

Result:

![Output](/_media/examples/action_rules/example.png)

### Combining modifiers

Modifiers can be combined under the same rule. For example:

```php
// Sets the button class to spicy and caption with emoji
Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->caption('Order 🔥 🔥 🔥')
    ->setAttribute('class', 'bg-orange-400'),
```

### Multiple Rules for the same Target

A `Rule` must have only one `when()` condition.

You must create a new `Rule` to match a different condition on the `Target`. For example:

```php
//Captions per country on 'Order button'
Rule::button('order-dish')
    ->when(fn($dish) => $dish->country === 'Brazil')
    ->caption('Order 🇧🇷')
Rule::button('order-dish')
    ->when(fn($dish) => $dish->country === 'Portugal')
    ->caption('Order 🇵🇹')
//Disable order for dishes without country
Rule::button('order-dish')
    ->when(fn($dish) => $dish->country === '')
    ->disable()
```

## Rule targets

Rules can be applied to 3 different targets:

- `Rule::button`: Rules for a specific action button when the condition is satisfied.
- `Rule::rows`: Rules to be applied to rows matching the condition.
- `Rule::checkbox`: Rules to be applied to each checkbox on all table rows matching the condition.

## Modifiers

The `Modifiers` will take effect when the Rule condition is satisfied. You can use more than one `Modifier` under the same rule.

Available methods:

- [Disable](#disable)
- [Hide](#hide)
- [Caption](#caption)
- [Emit](#emit)
- [EmitTo](#emitto) 
- [setAttribute](#setattribute)
- [hideToggleable](#hidetoggleable)
- [showtoggleable](#showtoggleable)
- [Redirect](#redirect)

### disable

* Disables the target (available for Buttons and Checkboxes).

Example:

```php
// Disable order button for dishes out out-of-stock
Rule::button('order-dish')
    ->when(fn($dish) => (bool) $dish->in_stock == false)
    ->disable(),
```

---

### hide

* Hides the target (available for Buttons and Checkboxes).

Example:

```php
// Hide checkbox for dishes out of stock
Rule::checkbox()
    ->when(fn($dish) => $dish->in_stock == false)
    ->hide(),
```

---

### caption

* Sets the target caption value (available for Buttons).

| Parameter         | 
|-------------------|
| (string) $caption |

Example:

```php{4}
// Changes the caption for dishes on sale
Rule::button('order-dish')
    ->when(fn($dish) => $dish->on_sale == true)
    ->caption('Order 💰 ON SALE 💰'),
```

---

### emit

* Sets the event emitted by the target (available for Buttons).

| Parameter       | Description   | 
|-----------------|---------------|
| (string) $event | Name of event |
| (array) $params | Parameters    |

::: tip
Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.
:::

Example:

```php{4}
// Emits an alert for spice dishes
Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->emit('showSpiceAlert', ['id' => 'id']),
```

---

### emitTo

* Sets an event and a target to which the event will be emitted to (available for Buttons).

| Parameter       | Description    | 
|-----------------|----------------|
| (string) $to    | Component name |
| (string) $event | Name of event  |
| (array) $params | Parameters     |

::: tip
Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.
:::

Example:

```php{5}
// Emits the event showSpiceAlert to a third part alert-component on click

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->emitTo('alert-component', 'showSpiceAlert', ['id' => 'id']),
```

Read more in [Livewire](https://laravel-livewire.com/docs/2.x/events#scope-by-name) documentation.

---

### setAttribute

* Sets the specified target attribute to the given value.

| Parameter           | Description                               | 
|---------------------|-------------------------------------------|
| (string) $attribute | HTML attribute (class,id, x-on:click ...) |
| (string) $value     | Attribute value                           |

::: tip
Multiples are issued for the target **button** only
::: 

Example:

Change row background to red when dish is out of stock

```php
Rule::rows()
    ->when(fn($dish) => $dish->in_stock == false)
    ->setAttribute('class', '!bg-red-200'),
```

`Output:`

```html
<button class="bg-indigo-500 cursor-pointer text-white px-3 py-2 m-1 rounded text-sm !bg-red-200">
        Edit
</button>
```

Add wire:click attribute when dish is out of stock

```php

Rule::button('edit')
    ->when(fn($dish) => $dish->in_stock == false)
    ->setAttribute('class', '!bg-red-200')
    ->setAttribute('wire:click', ['action' => [
        'params' => 1,
        'dishId' => 'id',
    ]]),

```

`Output:`

```html
<button class="bg-indigo-500 cursor-pointer text-white px-3 py-2 m-1 rounded text-sm !bg-red-200" 
        wire:click="action({"params":1,"dishId":2})">
        Edit
</button>
```

---

### hideToggleable

* Hides the [Toggleable](cell-actions-buttons.html#toggleable) switch for the row.

Toggleable must be configured in the column. This feature will only hide the Toggleable, not disable it.

Example:

```php{4}
// Hide Toggleable for Soft deleted dishes
Rule::button('read-more')
    ->when(fn ($dish) => $dish->trashed() == true)
    ->hideToggleable(),
```

---

### showToggleable

* Shows the [Toggleable](cell-actions-buttons.html#toggleable) switch for the row.

Toggleable must be configured in the column. This feature will only show the Toggleable, not disable it.

Example:

```php
// Hide Toggleable for Soft deleted dishes
Rule::button('read-more')
    ->when(fn ($dish) => $dish->trashed() == false)
    ->showToggleable(),
```

---

### redirect

* Sets target's redirect URL (available for Buttons).

| Parameter          | Description      | Default |
|--------------------|------------------|---------|
| (Closure) $closure | Closure          | _blank  |
| (string) $target   | HTML href target |

Example:

```php{4}
// Redirects to Google search for exotic dishes
Rule::button('read-more')
    ->when(fn($dish) => $dish->is_exotic == true)
    ->redirect(fn($dish) => 'https://www.google.com/search?q='.$dish->name, '_blank'),
```

---

### bladeComponent

* Change blade component when dish is out of stock

| Parameter           | Default                     | 
|---------------------|-----------------------------|
| (string) $component | View component path (blade) |
| (array) $params     | Blade parameters            |

Example:

```php{3}
Rule::button('read-more')
    ->when(fn($dish) => $dish->in_stock == false)
    ->bladeComponent('another-custom-button', ['dishId' => 'id']),
```

