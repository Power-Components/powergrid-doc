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

<img class="result-image" alt="disable" src="../_media/examples/action_rules/example.png" width="600"/>

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

- [Disable](table/action-rules?id=disable)
- [Hide](table/action-rules?id=hide)
- [Caption](table/action-rules?id=captionstring-caption)
- [Emit](table/action-rules?id=emitstring-event-array-params-)
- [EmitTo](table/action-rules?id=emittostring-to-string-event-array-params-) 
- [setAttribute](table/action-rules?id=setattributestring-attribute-null-string-value-null)
- [Redirect](table/action-rules?id=redirectclosure-closure-string-target-_blank)

### disable()

Disables the target (available for Buttons and Checkboxes).

Example:

```php
// Disable order button for dishes out out-of-stock
Rule::button('order-dish')
    ->when(fn($dish) => (bool) $dish->in_stock == false)
    ->disable(),
```

---

### hide()

Hides the target (available for Buttons and Checkboxes).

Example:

```php
// Hide checkbox for dishes out of stock
Rule::checkbox()
    ->when(fn($dish) => $dish->in_stock == false)
    ->hide(),
```

---

### caption(string $caption)

Sets the target caption value (available for Buttons).

Example:

```php
// Changes the caption for dishes on sale
Rule::button('order-dish')
    ->when(fn($dish) => $dish->on_sale == true)
    ->caption('Order 💰 ON SALE 💰'),
```

---

### emit(string $event = '', array $params = [])

Sets the event emitted by the target (available for Buttons).

Example:

```php
// Emits an alert for spice dishes
Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->emit('showSpiceAlert', ['id' => 'id']),
```

---

### emitTo(string $to = '', string $event = '', array $params = [])

Sets an event and a target to which the event will be emitted to (available for Buttons).

Example:

```php
// Emits the event showSpiceAlert to a third part alert-component on click

Rule::button('order-dish')
    ->when(fn($dish) => $dish->is_spicy == true)
    ->emitTo('alert-component', 'showSpiceAlert', ['id' => 'id']),
```

Read more in [Livewire](https://laravel-livewire.com/docs/2.x/events#scope-by-name) documentation.

---

### setAttribute(string $attribute = null, string $value = null)

Sets the target's specified attribute to the given value.

Example:

```php
//Change row background to red when dish is out of stock
Rule::rows()
    ->when(fn($dish) => $dish->in_stock == false)
    ->setAttribute('class', 'bg-red-200'),
```

---

### redirect(Closure $closure, string $target = '_blank')

Sets target's redirect URL (available for Buttons).

Example:

```php
// Redirects to Google search for exotic dishes
Rule::button('read-more')
    ->when(fn($dish) => $dish->is_exotic == true)
    ->redirect(fn($dish) => 'https://www.google.com/search?q='.$dish->name, '_blank'),
```

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/update-data">Next →</a></span>
</footer>
