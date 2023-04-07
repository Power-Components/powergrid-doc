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

### add

Creates a new button.

| Parameter        | Description                  | 
|------------------|------------------------------|
| (string) $action | internal name of this button |


Example:

```php{2}
//..
Button::add('create-dish')  
```

---

### caption

Sets the button label.

| Parameter         | Description    | 
|-------------------|----------------|
| (string) $caption | button caption |

Example:

```php{3}
//..
Button::add('create-dish')  
    ->caption('Create a dish')
```

---

### class

* Sets the button CSS class attribute.

| Parameter           | Description      | 
|---------------------|------------------|
| (string) $classAttr | HTML class value |

Example:

```php{4}
//..
Button::add('create-dish')  
    ->caption('Create a dish')
    ->class('bg-indigo-500 text-white')
```

---

### emit

* Emit works with event listeners.

| Parameter                | Description   | 
|--------------------------|---------------|
| (string) $event          | Name of event |
| (array, Closure) $params | Parameters    |

::: tip
Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.
::: 

The code below:

```php{5,12-14}
//...
Button::add('create-dish')  
    ->caption('Create a dish')
    ->class('bg-indigo-500 text-white')
    ->emit('postAdded', ['key' => 'id']),
    
// or using Closure    

Button::add('create-dish')  
    ->caption('Create a dish')
    ->class('bg-indigo-500 text-white')
    ->emit('postAdded', function(Dish $dish) {
        return ['key' => $dish->id];
    }),
```

is equivalent to:

```html{2}
<div>
    <button wire:click="$emit('postAdded', {'key': 1})">
</div>
```

---

### emitTo

* Emit works with event listeners.

| Parameter                | Description    | 
|--------------------------|----------------|
| (string) $to             | Component name |
| (string) $event          | Name of event  |
| (array, Closure) $params | Parameters     |

::: tip
Read more about [Events](https://laravel-livewire.com/docs/2.x/events) in the Livewire documentation.
::: 

The code below:

```php{5,12-14}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->emitTo('admin-component','postAdded', ['key' => 1]),
    
// or using Closure

Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->emitTo('admin-component','postAdded', function(Dish $dish) {
        return ['key' => $dish->id];
    }),    
```

is equivalent to:

```html{2}
<div>
    <button wire:click="$emitTo('admin-component', 'postAdded', {'key': 1})">
</div>
```

---

### dispatch

* Dispatch browser events.

| Parameter                | Description   | 
|--------------------------|---------------|
| (string) $event          | Name of event |
| (array, Closure) $params | Parameters    |

::: tip
Read more about [Events](https://laravel-livewire.com/docs/2.x/events#browser) in the Livewire documentation.
:::

The code below:

```php{5,12-14}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->dispatch('eventName', ['key' => 'id']),
    
// or using Closure

Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->dispatch('eventName', function(Dish $dish) {
        return ['key' => $dish->id];
    }),    
```

is equivalent to:

```html
<div>
    <button x-on:click="$dispatch('eventName', {'key': 1})">
</div>
```

---

### openModal

* Opens a modal window with wire-elements/modal packages

| Parameter                | Description                                           | 
|--------------------------|-------------------------------------------------------|
| (string) $component      | You must pass the `View` of Livewire Modal component. |
| (array, Closure) $params | This is the component parameter.                      |

::: warning
You must install [Wire Elements Modal](https://github.com/wire-elements/modal) to use this functionality. More information is also available at its documentation.
::: 

Example:

```php{5,12-14}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->openModal('view-dish', ['dish' => 'id']),
   
// or using Closure

Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->openModal('view-dish', function(Dish $dish) {
        return ['key' => $dish->id];
    }),
```

---

### method

* Sets the action's HTTP method.

| Parameter        | Description                                | 
|------------------|--------------------------------------------|
| (string) $method | Valid methods: `get`/`post`/`put`/`delete` |

Example:

```php{5}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->method('delete'),
```

---

### route

* Sets the action's route.

| Parameter                 | Description         | 
|---------------------------|---------------------|
| (string) $route           | Valid Laravel route |
| (string, Closure) $params | Route parameters    |

Example:

```php{5}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->route('dish.edit', ['dish' => 'id']),
    
// or using Closure

Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->route('dish.edit', function(Dish $dish) {
        return ['dish' => $dish->id];
    }),    
```

---

### target

* Sets the target for the specified route.

| Parameter        | Default          | Default |
|------------------|------------------|---------|
| (string) $target | HTML href target | _blank  |

Example:


```php{5}
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->target('_self'),
```

---

### can

* Sets Action's permission.

| Parameter     | Default                                         | Default |
|---------------|-------------------------------------------------|---------|
| (string) $can | If is `false`, the button will not be rendered. | true    |

Example:

```php{1,6}
$canClickButton = true; //User has permission to edit

Button::add('edit-dish')
    ->caption('Edit')
    ->route('dish.edit', ['dish' => 'id'])
    ->can($canClickButton),
```

---

### tooltip

* Sets the button tooltip (title attribute).

| Parameter         | 
|-------------------|
| (string) $tooltip | 

Example:

```php{4}
Button::add('edit-dish')
    ->caption('Edit')
    ->route('dish.edit', ['dish' => 'id'])
    ->tooltip('Edit Record'),
```

---

### toggleDetail

* Toggle the [detailRow](detail-row)

Example:

```php{3}
Button::add('toggle-detail')
    ->caption('Toggle Detail')
    ->toggleDetail(),
```

### bladeComponent

* Allows you to add a custom component overriding all default behavior

| Parameter                | Default                     | 
|--------------------------|-----------------------------|
| (string) $component      | View component path (blade) |
| (array, Closure) $params | Blade parameters            |

Example:

```php{2}
Button::add('my-custom-button')
    ->bladeComponent('my-custom-button', ['dishId' => 'id']),
    
// or using Closure

Button::add('my-custom-button')
    ->bladeComponent('my-custom-button', function(Dish $dish) {
        return ['dish' => $dish->id];
    }),       
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

---

### render

* Allows you to render HTML

| Parameter          | Default         | 
|--------------------|-----------------|
| (Closure) $closure | Closure (Model) |

Example:

```php{2-5}
Button::add('custom')
     ->render(function (Dish $dish) {
        return Blade::render(<<<HTML
<x-button.circle primary icon="pencil" wire:click="editStock('$dish->id')" />
HTML);
}),     
```

---

### id

* Add custom html id attribute.

| Parameter       |
|-----------------|
| (string) $value | 

The code below:

```php
//...
Button::add('view')
    ->caption('View')
    ->class('btn btn-primary')
    ->id('view'), 
```

is equivalent to:

```html
<button id="view-1"> // 1 - is the value set in the current row using primaryKey = id.
```

## Advanced usage

While the standard [button methods](#button-methods) can handle most tasks, there may be times when you need to customize the `Button` class to add extra functionality. Below are some examples of how to do so without interiefing with package internals.

### Extending Button class

While `Button` class cannot be extended directly, it is possible to add methods using [macros](https://laravel.com/api/9.x/Illuminate/Support/Traits/Macroable.html). Also, this class has built-in `dynamicProperties` variable which can be used to store custom method parameters.

The following code shows how a custom `icon` method can be added to `Button` class.

```php
Button::macro('icon', function (string $name) {
    $this->dynamicProperties['icon'] = $name;

    return $this;
});
```

::: warning
Macros **should only be placed** in service providers.
::: 

With mentioned additions `icon` can be accessed as regular method.

```php
Button::add('new-modal')
    ->caption('New window')
    ->class('bg-gray-300')
    ->icon('fa-window')
    ->openModal('new', []),
```

### Accessing dynamic properties

In the previous [section](#extending-button-class), we showed how to extend the `Button` class and store dynamic properties. Now, the remaining task is to utilize these dynamic properties by implementing them inside custom template.

The following example shows modified code snippet from [actions.blade.php](https://github.com/Power-Components/livewire-powergrid/blob/main/resources/views/components/actions.blade.php), which allows to display custom icons inside row button:

```php
@if($actionClass->isButton)
    <button {{ $actionClass->getAttributes() }}>
        <i class="{{ $actionClass->getDynamicProperty('icon') }}"></i>
        {!! $actionClass->caption() !!}
    </button>
@endif
```
