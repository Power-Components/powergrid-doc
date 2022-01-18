# Action Rules

Sometimes you need to control the behavior of rows, checkboxes, or buttons based on record value, user permission or the combination of multiple conditions.

A common example is to list products of stock with a red background and without the "Order" button.

PowerGrid offers a set of `Action Rules` which can be combined to control style, content, and behavior of `Action Buttons`, `Action Checkboxes` and table rows.

## Usage

`Action Rules` must be declared inside the array returned by the `actionRules()` method.

Each rule must have a call to the `when()` method with a condition, followed by one or more `modifier` methods. The modifiers will take effect when the condition is satisfied.

The following code represents the "Out of stock" use case described in this page introduction:

```php
//..

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
        // Hide order button when dish is out of stock
        Rule::button('order-dish')
            ->when(fn($dish) => $dish->in_stock === false)
            ->hide(),

        // Set red background on rows for dishes which are not free and are out of stock 
        Rule::rows()
            ->when(function ($dish) { 
                return $dish->price > 0 && $dish->in_stock === false;
            })
            ->setAttribute('class', 'bg-red-200'),
    ];
}
```

Result:

<img class="result-image" alt="disable" src="../_media/examples/action_rules/example.png" width="600"/>

Modifiers can be combined under the same rule. For example:

```php
// Sets the button class to spicy and caption with emoji

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy === true)
    ->caption('Order 🔥 🔥 🔥')
    ->setAttribute('class', 'bg-spicy'),
```

A `Rule` must have only one `when()` condition.

If you need more conditions on a specific `Target`, just create a new `Rule` for it. For example:

```php
//Sets the caption according to dish country

Rule::button('order-dish')
    ->when(fn($dish) => $dish->country === 'Brazil')
    ->caption('Order 🇧🇷')

Rule::button('order-dish')
    ->when(fn($dish) => $dish->country === 'Portugal')
    ->caption('Order 🇵🇹')
```

## Rule targets

Rules can be applied to 3 different targets:

- `Rule::button`: Rules for a specific action button when the condition is satisfied.
- `Rule::rows`: Rules to be applied to rows matching the condition.
- `Rule::checkbox`: Rules to be applied to each checkbox on all table rows matching the condition.

## Modifiers

The `Modifiers` will take effect when the Rule condition is satisfied. You can use more than one `Modifier` under the same rule.

Available methods:

- [Disable](table/action-rules?id=disable)
- [Hide](table/action-rules?id=hide)
- [Caption](table/action-rules?id=captionstring-caption)
- [Emit](table/action-rules?id=emitstring-event-array-params-)
- [setAttribute](table/action-rules?id=setattributestring-attribute-null-string-value-null)
- [Redirect](table/action-rules?id=redirectclosure-closure-string-target-_blank)

### disable()

Disables the target (available for Buttons and Checkboxes).

Example:

```php
// Disable order button for dishes out of stock

Rule::button('order-dish')
    ->when(fn($dish) => (bool) $dish->in_stock === false)
    ->disable(),
```

---

### hide()

Hides the target (available for Buttons and Checkboxes).

Example:

```php
// Hide checkbox for dishes out of stock

Rule::checkbox()
    ->when(fn($dish) => $dish->in_stock === false)
    ->hide(),
```

---

### caption(string $caption)

Sets the target caption value (available for Buttons).

Example:

```php
// Changes the caption for dishes on sale

Rule::button('order-dish')
    ->when(fn($dish) => $dish->on_sale === true)
    ->caption('Order 💰 ON SALE 💰'),
```

---

### emit(string $event = '', array $params = [])

Sets the event emitted by the target (available for Buttons).

Example:

```php
// Emits an alert for spice dishes

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy === true)
    ->emit('showSpiceAlert', ['id' => 'id']),
```

---

### setAttribute(string $attribute = null, string $value = null)

Sets the target's specified attribute to the given value.

Example:

```php
//Change row background to red when dish is out of stock

Rule::rows()
    ->when(fn($dish) => $dish->in_stock === false)
    ->setAttribute('class', 'bg-red-200'),
```

---

### redirect(Closure $closure, string $target = '_blank')

Sets target's redirect URL (available for Buttons).

Example:

```php

// Redirects to Google search for exotic dishes

Rule::button('read-more')
    ->when(fn($dish) => $dish->is_exotic === true)
    ->redirect(fn($dish) => 'https://www.google.com/search?q='.$dish->name, '_blank'),
```
