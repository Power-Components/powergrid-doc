# Action Rules

Sometimes you need to control the behavior of rows, checkboxes or buttons based on record value, user access level or the combination of different conditions.

A common example is when a product is out of stock, the button "Order" must be hidden the row must have a red background clearly indicating to the user this product is not available.

PowerGrid offers a set of `Action Rules` which can be combined to control style, content and behavior of `Action Buttons` and table rows.

## Usage

`Action Rules` must be declared inside the array in the `actionRules()` method. There are 2 types of Rules available:

- `Rule::for`: Rules for a specific action button.
- `Rule::rows`: Rules to be applied on rows matching the condition.
- `Rule::checkbox`: Rules to be applied on the checkbox available on each row.

Following the "Out of stock" use case in the introduction, we will have the following code:

```php
//..

public function actions(): array
{
    return [

        // Button for ordering a dish.
        Button::add('order-dish')
            ->caption('Order')
            ->class('bg-blue-500 cursor-pointer text-white px-3 py-2 m-1 rounded text-sm')
            ->emit('order-dish', ['dishId' => 'id'])

    ];
}

// Rules for order button

public function actionRules(): array
{
    return [
        // Hide order button when dish is out of stock
        Rule::for('order-dish')
            ->when(fn($dish) => $dish->in_stock === false)
            ->hide(),

        // Set a row red background for when dish is out of stock
        Rule::rows()
            ->when(fn($dish) => $dish->in_stock === false)
            ->setAttribute('class', 'bg-red-200'),
    ];
}
```

Result:

<img class="result-image" alt="disable" src="../_media/examples/action_rules/example.png" width="600"/>


Modifiers can be combined under the same rule. For example:

```php
// Sets the button class to spicy and caption with emoji

Rule::for('order-dish')
    ->when(fn($dish) => $dish->is_spicy === true)
    ->caption('Order 🔥 🔥 🔥')
    ->setAttribute('class', 'bg-spicy'),
```

## Modifiers

Available modifiers:

- [Disable](table/action-rules?id=disable)
- [Hide](table/action-rules?id=hide)
- [Caption](table/action-rules?id=captionstring-caption)
- [Emit](table/action-rules?id=emitstring-event-array-params-)
- [setAttribute](table/action-rules?id=setattributestring-attribute-null-string-value-null)
- [Redirect](table/action-rules?id=redirectclosure-closure-string-target-_blank)
- [Rows](table/action-rules?id=rows)
- [Checkbox](table/action-rules?id=checkbox)

### disable()

Disables the button.

Example:

```php
// Disable order for out of stock

Rule::for('order-dish')
    ->when(fn($dish) => (bool) $dish->in_stock === false)
    ->disable(),
```

---

### hide()

Hides the button.

Example:

```php
// Hide order for out of stock

Rule::for('order-dish')
    ->when(fn($dish) => $dish->in_stock === false)
    ->hide(),
```

---

### caption(string $caption)

Sets the button caption value.

Example:

```php
// Changes the caption for dishes on sale

Rule::for('order-dish')
    ->when(fn($dish) => $dish->on_sale === true)
    ->caption('Order 💰 ON SALE 💰'),
```

---

### emit(string $event = '', array $params = [])

Sets the button's event to be emitted.

Example:

```php
// Emits an alert for spice dishes

Rule::for('order-dish')
    ->when(fn($dish) => $dish->is_spicy === true)
    ->emit('showSpiceAlert', ['id' => 'id']),
```

---

### setAttribute(string $attribute = null, string $value = null)

Sets the button's given attribute to the given value.

Example:

```php
// Sets the button class to spicy 🔥

Rule::for('order-dish')
    ->when(fn($dish) => $dish->is_spicy === true)
    ->setAttribute('class', 'bg-spicy'),
```

---

### redirect(Closure $closure, string $target = '_blank')

Sets button's redirect URL.

Example:

```php

// Redirects to Google search for exotic dishes

Rule::for('read-more')
    ->when(fn($dish) => $dish->is_exotic === true)
    ->redirect(fn($dish) => 'https://www.google.com/search?q='.$dish->name, '_blank'),
```

### rows()

Modify the row matching the rule condition.

This modifier is normally used with [setAttribute](table/action-rules?id=setattributestring-attribute-null-string-value-null) Modifier.

Example:

```php
// Set a row red background for out of stock rows

Rule::rows()
    ->when(fn($dish) => $dish->in_stock === false)
    ->setAttribute('class', 'bg-red-200'),
```

### checkbox()

Modify the behavior of the checkbox available on each row.

Checkboxes can be disabled or hidden using the `disable()` and `hide()` Modifiers.

Example:

```php
// Hide the checkbox when the dish is out of stock
Rule::checkbox()
    ->when(fn($dish) => $dish->in_stock === false)
    ->hide(),

// Disable the checkbox when the dish is read only

Rule::checkbox()
    ->when(fn($dish) => $dish->read_only === true)
    ->disable(),
```
