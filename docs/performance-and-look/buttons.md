---
title: Buttons
description: Add intuitive action buttons to your rows. Easily link to edit pages, open modals, set custom icons, or hide actions based on user permissions.
---

# Buttons

`PowerComponents\LivewirePowerGrid\Button` configures row actions (`actions()`) and header actions (`header()`). For placement, see [Row Buttons](/table-structure/row-buttons.html) and [Bulk Actions](/table-structure/bulk-actions.html).

[[toc]]

## Button Methods

Methods below are native on `Button` or registered as macros. Chain them. Params are `array` values — there is no automatic substitution of `'id'` for the row primary key; pass `$row->id` (or another field) yourself.

### add()

Creates a button. `$action` is the internal name (used by `actionRules()`).

| Parameter        | Description            |
| ---------------- | ---------------------- |
| (string) $action | Internal name. Default `''`. |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Button;

Button::add('edit-product'),
```

### make()

Creates a button and sets the slot in one call.

| Parameter        | Description     |
| ---------------- | --------------- |
| (string) $action | Internal name   |
| (?string) $slot  | Button content  |

```php [app/Livewire/ProductTable.php]
Button::make('edit-product', 'Edit'),
```

### slot()

Sets the button content (HTML string).

| Parameter      | Description |
| -------------- | ----------- |
| (?string) $slot | HTML string |

```php [app/Livewire/ProductTable.php]
Button::add('edit-product')
    ->slot('&#9889; Edit'),
```

### icon()

Renders a Blade component as the icon. `$icon` must resolve as a Blade component — typically an [anonymous component](https://laravel.com/docs/blade#anonymous-components). If it does not resolve, no icon is rendered.

With `resources/views/components/icons/trash.blade.php`, pass `icons.trash`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Button;

Button::add('delete-product')
    ->icon('icons.trash')
    ->class('bg-red-500 text-white'),
```

::: tip
Packaged icons use the package namespace, e.g. `->icon('livewire-powergrid::icons.trash')`.
:::

Pass HTML attributes for the icon as the second argument:

```php [app/Livewire/ProductTable.php]
Button::add('delete-product')
    ->icon('icons.trash', ['id' => 'my-custom-icon-id', 'class' => 'w-5 text-red-600'])
    ->class('bg-red-500 text-white'),
```

| Parameter               | Description                                       |
| ----------------------- | ------------------------------------------------- |
| (string) $icon          | Blade component name to render as the icon        |
| (array) $iconAttributes | HTML attributes forwarded to the icon component   |

### view()

Render a Blade view instead of the default `<button>` / `<a>` markup. The view receives `action` (the `Button` instance) and `row`.

| Parameter     | Description   |
| ------------- | ------------- |
| (string) $view | View name     |

```php [app/Livewire/ProductTable.php]
Button::add('custom')
    ->view('components.product-action'),
```

### class()

Sets the `class` HTML attribute.

| Parameter         | Description |
| ----------------- | ----------- |
| (string) $classes | CSS class   |

```php [app/Livewire/ProductTable.php]
Button::add('create-product')
    ->slot('Create a product')
    ->class('bg-indigo-500 text-white'),
```

### attributes()

Merges HTML attributes onto the element. Existing keys on the button win over new ones.

```php [app/Livewire/ProductTable.php]
Button::add('create-product')
    ->slot('Create a product')
    ->attributes([
        'id' => 'my-custom-id',
        'class' => 'another-class',
    ]),
```

```html
<button id="my-custom-id" class="another-class">Create a product</button>
```

### id()

Sets the `id` HTML attribute. The value is used as given; it is not suffixed with the row primary key.

| Parameter       | Description        |
| --------------- | ------------------ |
| (?string) $id   | HTML id. Default `null`. |

```php [app/Livewire/ProductTable.php]
Button::add('view')
    ->slot('View')
    ->id('view-product'),
```

### tag()

Sets the HTML tag. Default `button`. `route()` and `link()` set this to `a`.

| Parameter      | Description                          |
| -------------- | ------------------------------------ |
| (?string) $tag | Tag name. `null` keeps the current.  |

```php [app/Livewire/ProductTable.php]
Button::add('download-recipe')
    ->slot('Download Recipe')
    ->tag('a')
    ->attributes([
        'href' => url('/destination-to-file.pdf'),
    ]),
```

### tooltip()

Sets the `title` attribute.

| Parameter       | Description |
| --------------- | ----------- |
| (string) $value | Tooltip     |

```php [app/Livewire/ProductTable.php]
Button::add('edit-product')
    ->slot('Edit')
    ->route('product.edit', ['product' => $row->id])
    ->tooltip('Edit Record'),
```

### order()

Display order among **header** buttons. Lower values render first. `null` (default) keeps declaration order. Row actions ignore this.

| Parameter    | Description        |
| ------------ | ------------------ |
| (int) $order | Sort key           |

```php [app/Livewire/ProductTable.php]
Button::add('bulk-delete')
    ->slot('Delete selected')
    ->order(10),
```

### can()

Whether the button is rendered. A `Closure` receives the current `$row`.

| Parameter              | Description                                      |
| ---------------------- | ------------------------------------------------ |
| (bool, Closure) $can   | `false` hides the button. Default `true`.        |

```php [app/Livewire/ProductTable.php]
Button::add('edit-product')
    ->slot('Edit')
    ->route('product.edit', ['product' => $row->id])
    ->can(auth()->check()),

Button::add('delete-product')
    ->slot('Delete')
    ->can(fn ($row) => $row->is_deletable),
```

### disable()

Adds `disabled="disabled"` when `$disable` is `true`.

| Parameter       | Description     |
| --------------- | --------------- |
| (bool) $disable | Default `true`. |

```php [app/Livewire/ProductTable.php]
Button::add('edit-product')
    ->slot('Edit')
    ->disable($row->locked),
```

### dispatch()

Dispatches a Livewire event (`wire:click="$dispatch(...)"`).

| Parameter        | Description   |
| ---------------- | ------------- |
| (string) $event  | Event name    |
| (array) $params  | Event payload |

```php [app/Livewire/ProductTable.php]
Button::add('edit-product')
    ->slot('Edit')
    ->class('bg-indigo-500 text-white')
    ->dispatch('postAdded', ['key' => $row->id]),
```

```html
<button wire:click="$dispatch('postAdded', { key: 1 })">
```

::: tip
[Livewire events](https://livewire.laravel.com/docs/events#dispatching-events)
:::

### dispatchTo()

Dispatches to another component (`$dispatchTo`).

| Parameter          | Description    |
| ------------------ | -------------- |
| (string) $to       | Component name |
| (string) $event    | Event name     |
| (array) $params    | Event payload  |

```php [app/Livewire/ProductTable.php]
Button::add('view')
    ->slot('View')
    ->class('bg-indigo-500 text-white')
    ->dispatchTo('admin-component', 'postAdded', ['key' => $row->id]),
```

```html
<button wire:click="$dispatchTo('admin-component', 'postAdded', { key: 1 })">
```

### dispatchSelf()

Dispatches to this component only (`$dispatchSelf`).

| Parameter       | Description   |
| --------------- | ------------- |
| (string) $event | Event name    |
| (array) $params | Event payload |

```php [app/Livewire/ProductTable.php]
Button::add('refresh')
    ->slot('Refresh')
    ->dispatchSelf('refreshData', ['force' => true]),
```

### call()

Calls a method on this table (`$call`).

| Parameter        | Description    |
| ---------------- | -------------- |
| (string) $method | Method name    |
| (array) $params  | Method payload |

```php [app/Livewire/ProductTable.php]
Button::add('delete-product')
    ->slot('Delete')
    ->call('deleteItem', ['id' => $row->id]),
```

```html
<button wire:click="$call('deleteItem', { id: 1 })">
```

### parent()

Calls a method on the parent Livewire component (`$parent`).

| Parameter        | Description    |
| ---------------- | -------------- |
| (string) $method | Method name    |
| (array) $params  | Method payload |

```php [app/Livewire/ProductTable.php]
Button::add('notify')
    ->slot('Notify')
    ->parent('notifyParent', ['id' => $row->id]),
```

The rendered button emits `wire:click="$parent.notifyParent({id: 1})"`.

### openModal()

Dispatches `openModal` with `component` and `arguments`. Pairs with [wire-elements/modal](https://github.com/wire-elements/modal), or any listener you register for `openModal`.

| Parameter           | Description              |
| ------------------- | ------------------------ |
| (string) $component | Component to open        |
| (array) $params     | Component arguments      |

```php [app/Livewire/ProductTable.php]
Button::add('view')
    ->slot('View')
    ->class('bg-indigo-500 text-white')
    ->openModal('view-product', ['product' => $row->id]),
```

### route()

Renders an `<a>` whose `href` is a named Laravel route.

| Parameter        | Description                      |
| ---------------- | -------------------------------- |
| (string) $route  | Route name                       |
| (array) $params  | Route parameters                 |
| (string) $target | `href` target. Default `_self`.  |

```php [app/Livewire/ProductTable.php]
Button::add('view')
    ->slot('View')
    ->class('bg-indigo-500 text-white')
    ->route('product.edit', ['product' => $row->id], '_blank'),
```

### link()

Renders an `<a>` with a raw URL (no named route).

| Parameter        | Description                     |
| ---------------- | ------------------------------- |
| (string) $href   | URL                             |
| (string) $target | `href` target. Default `_self`. |

```php [app/Livewire/ProductTable.php]
Button::add('docs')
    ->slot('Docs')
    ->link('https://example.com/docs', '_blank'),
```

### toggleDetail()

Toggles the [Detail Row](/table-structure/detail-row.html) for the given row id (`wire:click="toggleDetail('…')"`).

| Parameter              | Description |
| ---------------------- | ----------- |
| (int, string) $rowId   | Row id      |

```php [app/Livewire/ProductTable.php]
Button::add('toggle-detail')
    ->slot('Toggle Detail')
    ->toggleDetail($row->id),
```

### confirm()

Adds `wire:confirm` before the click action. Omit `$message` to use the translated default (`livewire-powergrid::datatable.buttons_macros.confirm.message`).

| Parameter         | Description |
| ----------------- | ----------- |
| (?string) $message | Message    |

```php [app/Livewire/ProductTable.php]
Button::add('edit')
    ->confirm('Are you sure you want to edit?'),
```

```html
<button wire:confirm="Are you sure you want to edit?">
```

::: tip
[Livewire Confirm](https://livewire.laravel.com/docs/wire-confirm)
:::

### confirmPrompt()

Adds `wire:confirm.prompt`. The user must type `$confirmValue`. Omit `$message` to use the translated default.

| Parameter              | Description         |
| ---------------------- | ------------------- |
| (?string) $message     | Message             |
| (string) $confirmValue | Required input. Default `Confirm`. |

```php [app/Livewire/ProductTable.php]
Button::add('edit')
    ->confirmPrompt('Are you sure you want to edit?', 'EDIT'),
```

```html
<button wire:confirm.prompt="Are you sure you want to edit? | EDIT">
```

## Conditional Formatting

See [Conditional Rules](/table-structure/conditional-rules.html).

## Extending the Button Class

`Button` is `Macroable`. `attributes` stores HTML attributes you can set from a custom method.

```php [app/Providers/AppServiceProvider.php]
use PowerComponents\LivewirePowerGrid\Button;

Button::macro('navigate', function () {
    $this->attributes([
        'wire:navigate' => true,
    ]);

    return $this;
});
```

```php [app/Livewire/ProductTable.php]
Button::add('new-modal')
    ->slot('New window')
    ->class('bg-gray-300')
    ->navigate(),
```
