# Upgrade Guide

## Upgrade From V4

PowerGrid is now on version 5.x.

This page will provide you with important information to upgrade from v4.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.1+
* [Laravel Framework](https://laravel.com/) 10.0+
* [Laravel Livewire](https://livewire.laravel.com/) 3.0+
* [Tailwind](https://tailwindcss.com/) v3+

---

## Solve the necessary imports

#### Rename Filter class

```php{4}
// Change:
use PowerComponents\LivewirePowerGrid\Filters\Filter;
// To:
use PowerComponents\LivewirePowerGrid\Facades\Filter;
```

---

#### Rename Filter class

```php{4}
// Change:
use PowerComponents\LivewirePowerGrid\Rules\Rule;
// To:
use PowerComponents\LivewirePowerGrid\Facades\Rule;
```

#### Change `PowerGrid::eloquent` to `PowerGrid::columns`

```php{10,14}
// Change:
use PowerComponents\LivewirePowerGrid\PowerGridEloquent;

public function addColumns(): PowerGridEloquent
{
    return PowerGrid::eloquent()
    // 
}
// To:
use PowerComponents\LivewirePowerGrid\PowerGridColumns;

public function addColumns(): PowerGridColumns
{
    return PowerGrid::columns()
    // 
}
```

#### Remove ActionButton Trait

```php
use PowerComponents\LivewirePowerGrid\Traits\ActionButton;

final class PowerGridTable extends PowerGridComponent
{
   use ActionButton;
   // ---
}
```

---

#### Change Button caption to Button slot

```php{8}
// PowerGrid 4
   Button::add('bulk-demo')
       ->caption('Bulk Action')
       ->class('...')
       
// PowerGrid 5
    Button::add('bulk-demo')
       ->slot('Bulk Action')
       ->class('...')
```

---

#### Change Button emit, emitTo, emitSelf

* Button::emit
```php{8}
// PowerGrid 4 - Livewire v2
   Button::add('bulk-demo')
       ->emit('event', [], false) // string $event, array|\Closure $params, bool $singleParam = false)
       ->class('...')
       
// PowerGrid 5 - Livewire v3 sintax
    Button::add('bulk-demo')
       ->dispatch('event', ['dishId' = 1]) // string $event, array $params)
       ->class('...')
```

* Button::emitTo
```php{8}
// PowerGrid 4 - Livewire v2
   Button::add('bulk-demo')
       ->emitTo('to', [], false) // string $to, string $event, array|\Closure $params, bool $singleParam = false)
       ->class('...')
       
// PowerGrid 5 - Livewire v3 sintax
    Button::add('bulk-demo')
       ->dispatchTo('event', ['dishId' = 1]) // string $to, string $event, array $params)
       ->class('...')
```
