# Button Class

This section covers the PowerGrid Buttons Class.

Here you will find:

[[toc]]

## Introduction

PowerGrid offers a convenient way to display buttons in your [Table Rows](/table-features/rows.html#buttons) and a Header button for [Bulk Actions](/table-features/bulk-actions.html).

Please, refer to the sections linked above to see how to use buttons in each case. Below, we will explore the configuration methods for the `Button::class`.

## Usage

See [Table Rows](/table-features/rows.html#buttons) and  [Bulk Actions](/table-features/bulk-actions.html).

## Button Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Button` class.

### add()

Creates a new button.

| Parameter        | Description                  |
|------------------|------------------------------|
| (string) $action | internal name of this button |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('create-dish'),
```

---

### slot()

Render the given HTML.

| Parameter         | Description |
|-------------------|-------------|
| (string) $slot    | HTML string |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('create-dish')  
        ->slot("&#9889; Edit"),
```

---

### icon()

For the icons to be rendered, you need to define in which location (path) PowerGrid should look for them.
Define in `paths` between key and value, where the key should be used in the Button class, followed by the name of the blade file:

`config/livewire-powergrid.php`
```php{3,4}
    'icon_resources' => [
        'paths' => [
            'default' => 'resources/views/components/icons',
          //'solid'   => 'vendor/wireui/heroicons/src/views/components/solid',
```

```php{4}
use PowerComponents\LivewirePowerGrid\Button;

Button::add('delete-dish')  
    ->icon('default-trash') // 'default' => 'resources/views/components/icons/trash.blade.php',
  //->icon('solid-trash') // 'solid' => 'resources/views/components/icons/solid/trash.blade.php',
    ->class('bg-red-500 text-white'),
```

#### Custom attributes

* You can also set attributes for that icon. By default, `w-5 text-red-600` will be added to all icons.

`config/livewire-powergrid.php`
```php{3}
    'icon_resources' => [
        // ...
        'attributes' => ['class' => 'w-5 text-red-600'],
```

* To add other attributes to the icons, you should do this:

```php{4}
use PowerComponents\LivewirePowerGrid\Button;

Button::add('delete-dish')  
    ->icon('default-trash', ['id' => 'my-custom-icon-id', 'class' => 'font-bold'])
    ->class('bg-red-500 text-white'),
```

#### allowed icons

* You may want to define some icons that will be allowed (this may help to consume less memory)

`config/livewire-powergrid.php`
```php
    'icon_resources' => [
        // ...
        'allowed' => ['pencil', 'eye'],
```


| Parameter               | Description                                      |
|-------------------------|--------------------------------------------------|
| (string) $icon          | Name of the icon that will be loaded from memory |
| (array) $iconAttributes | Icon HTML attributes                             |

---

### class()

Sets the button's CSS class attribute.

| Parameter           | Description      |
|---------------------|------------------|
| (string) $classAttr | CSS class        |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('create-dish')  
    ->slot('Create a dish')
    ->class('bg-indigo-500 text-white'),
```

---

### attributes()

* Define the HTML attributes that should be loaded in the action

::: info
💡Under the hood, PowerGrid renders using Javascript instead of PHP
:::

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('create-dish')  
    ->slot('Create a dish')
    ->attributes([
        'id' => 'my-custom-id',
        'class' => 'another-class'
    ]),
```

The code above is equivalent to:

```html{2}
<div>
    <button id="my-custom-id" class="another-class">Create a dish</button>
</div>
```
---

### dispatch()

Dispatch events.

| Parameter                | Description   |
|--------------------------|---------------|
| (string) $event          | Name of event |
| (array, Closure) $params | Parameters    |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('create-dish')  
    ->slot('Create a dish')
    ->class('bg-indigo-500 text-white')
    ->dispatch('postAdded', ['key' => $row->id]),
```

The code above is equivalent to:

```html{2}
<div>
    <button wire:click="$dispatch('postAdded', { key: 1})">
</div>
```

::: tip 💡 TIP
Read more about [Events](https://livewire.laravel.com/docs/events###dispatching-events) in the Livewire documentation.
:::

---

### dispatchTo()

Dispatch Events to a target.

| Parameter                | Description    |
|--------------------------|----------------|
| (string) $to             | Component name |
| (string) $event          | Name of event  |
| (array, Closure) $params | Parameters     |

The code below:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->dispatchTo('admin-component', 'postAdded', ['key' => $row->id]),
```

is equivalent to:

```html{2}
<div>
    <button wire:click="$dispatchTo('admin-component', 'postAdded', { key: 1})">
</div>
```

::: tip 💡 TIP
Read more about [Events](https://livewire.laravel.com/docs/events###dispatching-events) in the Livewire documentation.
:::

---

### openModal()

Opens a modal window using [wire-elements/modal](https://github.com/wire-elements/modal) package. You must install Wire Elements to use this functionality.

| Parameter                | Description                                           |
|--------------------------|-------------------------------------------------------|
| (string) $component      | You must pass the `View` of Livewire Modal component. |
| (array, Closure) $params | This is the component parameter.                      |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->openModal('view-dish', ['dish' => 'id']),
```

---

### route()

Sets the Action route.

| Parameter        | Description         |
|------------------|---------------------|
| (string) $route  | Valid Laravel route |
| (array) $params  | Route parameters    |
| (string) $target | HTML href target    |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->route('dish.edit', ['dish' => $row->id], '_blank'),
```

---


### can()

Checks if the button has permission to be rendered.

| Parameter     | Default                                         | Default |
|---------------|-------------------------------------------------|---------|
| (string) $allowed | If `false`, the button will not be rendered. | true    |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('edit-dish')
    ->slot('Edit')
    ->route('dish.edit', ['dish' => $row->id])
    ->can(allowed: auth()->check()),
```

---

### tooltip()

Sets the button's tooltip (title attribute).

| Parameter         |
|-------------------|
| (string) $tooltip |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('edit-dish')
    ->slot('Edit')
    ->route('dish.edit', ['dish' => $row->id])
    ->tooltip('Edit Record'),
```

---

### toggleDetail()

Toggle (expand/collapse) the [Detail Row](/table-component/component-configuration.html#detail-row).

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('toggle-detail')
    ->slot('Toggle Detail')
    ->toggleDetail($row->id),
```

---

### id()

 Add custom html id attribute.

| Parameter       |
|-----------------|
| (string) $value |

The code below:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('view')
    ->slot('View')
    ->class('btn btn-primary')
    ->id('view'), 
```

is equivalent to:

```html
<button id="view-1"> // 1 - is the value set in the current row using primaryKey = id.
```

---

### confirm()

Displays a confirmation dialog before executing the event.

| Parameter                | Description   |
|--------------------------|---------------|
| (string) $message        | message       |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('edit')  
    ->confirm('Are you sure you want to edit?'),
```
is equivalent to:

```html
<div>
    <button wire:confirm="Are you sure you want to edit?">
</div>
```

::: tip 💡 TIP
Read more about [Livewire Confirm](https://livewire.laravel.com/docs/wire-confirm) in the Livewire documentation.
:::


---

### confirmPrompt()

Displays a confirmation prompt before executing the event, allowing the user to enter an additional confirmation value.

| Parameter                | Description   |
|--------------------------|---------------|
| (string) $message        | message       |
| (string) $confirmValue   | confirmation value |

Example:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('edit')
    ->confirmPrompt('Are you sure you want to edit?', 'EDIT'),

```
is equivalent to:

```html
<div>
    <button wire:confirm.prompt="Are you sure you want to edit? |EDIT">
</div>
```

---
::: warning ⚠️ WARNING

**It does not work alone.**

Livewire makes this easy to do by adding wire:confirm in addition to any action (wire:click, wire:submit, etc.).
Read more about [Livewire Confirm](https://livewire.laravel.com/docs/wire-confirm) in the Livewire documentation.
:::

## Conditional Formatting

See [Conditional Rules](/table-features/conditional-rules.html).

## Extending the Button::class

You can extend the `Button::class` via Laravel's [Macroable](https://laravel.com/api/11.x/Illuminate/Support/Traits/Macroable.html) feature.

The class a has built-in `attributes` variable which can be used to store custom method parameters.

The following code adds a custom `navigate()` method to the `Button` class.

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::macro('navigate', function () {
    $this->attributes([
        'wire:navigate' => true
    ]);

    return $this;
});
```

As a result, the method can now be chained to the class as demonstrated below:

```php
use PowerComponents\LivewirePowerGrid\Button;

Button::add('new-modal')
    ->slot('New window')
    ->class('bg-gray-300')
    ->navigate(),
```
