# Row Action Buttons

Row Action buttons can be configured inside `actions()` method, for each row or `header()` method.

## Usage

To add a button, include a new `Button::add(string $action)` in the `actions()` or `header()` method.

Next, place your `Button::add(string $action)` code inside the method's `return []` statement.

Then, configure this Button by chaining [Button methods](#button-methods) to it.

Example:

```php
//..
public function header(): array
{
    return [
        Button::add('new-modal')
            ->caption('New window')
            ->class('bg-gray-300')
            ->openModal('new', []),
            
        //...
    ];
}
```

The example above generates a gray button. When clicked, this button opens a new modal window.

## Button Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Button` class.

### add(string $action)

Creates a new button.

Example:

`Button::add('create-dish')`

---

### caption(string $caption)

Sets the button label.

Example:

`->caption('Create a dish')`

---

### class(string $class_attr)

Sets the button CSS class attribute.

Example:

`->class('bg-indigo-500 text-white')`

---

### emit(string $event, array $params)

Emit works with event listeners.

Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.

The code below:

```php
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->emit('postAdded', ['key' => 'id']),
```

is equivalent to:

```html
<button wire:click="$emit('postAdded', ['key' => 1])">
```

---

### emitTo(string $to, string $event, array $params)

Emit works with event listeners.

Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.

The code below:

```php
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->emitTo('admin-component','postAdded', ['key' => 'id']),
```

is equivalent to:

```html
<button wire:click="$emitTo('admin-component', 'postAdded', ['key' => 1])">
```

---

### dispatch(string $to, string $event, array $params)

Dispatch browser events.

Read more about [Events](https://laravel-livewire.com/docs/2.x/events#browser) in the Livewire documentation.

The code below:

```php
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->dispatch('eventName', ['key' => 'id']),
```

is equivalent to:

```html
<button x-on:click="$dispatch('eventName', ['key' => 1])">
```

---

### openModal(string $component, array $params)

Opens a modal window.

You must install [Wire Elements Modal](https://github.com/wire-elements/modal) to use this functionality. More information is also available at its documentation.

Parameters:

- `$component`: You must pass the `View` of Livewire Modal component.
- `$params`: This is the component parameter.

Example:

`->openModal('view-dish', ['dish' => 'id'])`

---

### method(string $method)

Sets the action's HTTP method.

Valid methods: `get`/`post`/`put`/`delete`

Example:

`->method('delete')`

---

### route(string $route, array $params)

Sets the action's route.

Example:

`->route('dish.edit', ['dish' => 'id'])`

---

### target(string $target)

Sets the target for the specified route.

By default: `_blank`.

Example:

`->target('_self')`

---

### can(bool $can)

Sets Action's permission.

If `$can` is `false`, the button will not be rendered.

Example:

```php
$canClickButton = true; //User has permission to edit

Button::add('edit-dish')
    ->caption('Edit')
    ->route('dish.edit', ['dish' => 'id'])
    ->can($canClickButton),
```

---

### tooltip(string $tooltip)

Sets the button tooltip (title attribute).

Example:

```php
Button::add('edit-dish')
    ->caption('Edit')
    ->route('dish.edit', ['dish' => 'id'])
    ->tooltip('Edit Record'),
```

---

### toggleDetail()

Toggle the [detailRow](table/detail-row)

Example:

```php
Button::add('toggle-detail')
    ->caption('Toggle Detail')
    ->toggleDetail(),
```

### bladeComponent(string $component, array $params)

Allows you to add a custom component overriding all default behavior

Example:

```php
Button::add('my-custom-button')
    ->bladeComponent('my-custom-button', ['dishId' => 'id']),
```

`view/components/my-custom-button.blade.php`

```html
<button type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    My Custom Button #{{ $dishId }}
</button>
```

`Output`

```html
<button type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    My Custom Button #1
</button>
```

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/bulk-actions">Bulk Actions →</a></span>
</footer>
