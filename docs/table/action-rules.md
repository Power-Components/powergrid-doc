# Action Rules

Sometimes you need to control the style of a row, column or the buttons available based on the record value, user access level or the combination of both.

A common example is when a product is out of stock, the button "Order" must be hidden the row must have a red background clearly indicating to the user this product is not available.

PowerGrid offers a set of `Action Rules` which can be combined together to control content and behavior of `Action Buttons` and table rows.

## Usage

`Action Rules` must be declared inside the array in the `actionRules()` method. There are 2 types of Rules available:

- `Rules::for`: Rules for a specific action button.
- `Rules::rows`: Rules to be applied on rows matching the condition.

Following the "Out of stock" use case in the introduction, we will have the folowing code:

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
- [Redirect](table/action-rules?id=redirectstring-route-string-target-_blank)
- [Rows](table/action-rules?id=rows)

### disable()

Disables the button.

Example:

```php
// Disable order for out of stock

Rule::for('order-dish')
    ->when(fn($dish) => $dish->in_stock === false)
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
// Changes the caption for dishes in promotion

Rule::for('order-dish')
    ->when(fn($dish) => $dish->in_promotion === true)
    ->caption('Order Now *PROMOTION*'),
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

### redirect(string $route, string $target = '_blank')

Sets button's redirect URL.

Example:

```php
// Redirects to "out of stock" page URL.

Rule::for('order-dish')
    ->when(fn($dish) => $dish->in_stock === false)
    ->redirect('https://www.dish.test/sorry-out-of-stock', '_blank'),
```

### rows()

Modify the row matching the rule. This is normally used with [setAttribute](table/action-rules?id=setattributestring-attribute-null-string-value-null) Modifier.

Example:

```php
// Set a row red background for out of stock rows

Rule::rows()
    ->when(fn($dish) => $dish->in_stock === false)
    ->setAttribute('class', 'bg-red-200'),
```
