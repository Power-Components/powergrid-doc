# Action Rules

Sometimes you need to control the style of a row, column or the buttons available based on the record value, user access level. A common example is when a product is out of stock, the button "Order" must be hidden the row must have a red background.

PowerGrid offers a set of Action Rules which can be used in combination to control the content and behavior of Action Buttons.

## Usage

Rules must be declared inside the `actionRules()` method. There are 2 types of Rules available:

- `Rules::for`: Rules for a specific action button.
- `Rules::rows`: Rules to be applied on rows matching the condition.

Following the use case in the introduction, we will have:

```php
//..

// Create a button for ordering a dish.

public function actions(): array
{
    return [
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

## Rules

Available rules:

- [Disable](table/row-actions-buttons?id=disable)
- [Hide](table/row-actions-buttons?id=hide)
- [Caption](table/row-actions-buttons?id=caption)
- [Emit](table/row-actions-buttons?id=emit)
- [setAttribute](table/row-actions-buttons?id=setAttribute)
- [Redirect](table/row-actions-buttons?id=redirect)
- [Rows](table/row-actions-buttons?id=rows)

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

Sets a redirect to URL on click.

Example:

```php
// Redirects to "out of stock" page URL.

Rule::for('order-dish')
    ->when(fn($dish) => $dish->in_stock === false)
    ->redirect('https://www.dish.test/sorry-out-of-stock', '_blank'),
```

### rows()

Apply rules to a row.

Example:

```php
        // Set a row red background for out of stock rows

Rule::rows()
    ->when(fn($dish) => $dish->in_stock === false)
    ->setAttribute('class', 'bg-red-200'),
```
