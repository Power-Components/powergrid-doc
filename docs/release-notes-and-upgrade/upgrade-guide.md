# Upgrade Guide

## Upgrade From V4

This page will provide you with important information to upgrade from version 4.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.1+
* [Laravel Framework](https://laravel.com/) 10.0+
* [Laravel Livewire](https://livewire.laravel.com/) 3.0+
* [Tailwind](https://tailwindcss.com/) v3+

## Solve the necessary imports

#### Rename Filter class

```php{4}
use PowerComponents\LivewirePowerGrid\Filters\Filter; // [!code --]
use PowerComponents\LivewirePowerGrid\Facades\Filter; // [!code ++]
```

---

#### Rename Rule class

```php{4}
use PowerComponents\LivewirePowerGrid\Rules\Rule; // [!code --]
use PowerComponents\LivewirePowerGrid\Facades\Rule; // [!code ++]
```

#### Change `PowerGrid::eloquent` to `PowerGrid::columns`

```php{10,14}
use PowerComponents\LivewirePowerGrid\PowerGridEloquent; // [!code --]

public function addColumns(): PowerGridEloquent // [!code --]
{
    return PowerGrid::eloquent() // [!code --]
    // 
}
// To:
use PowerComponents\LivewirePowerGrid\PowerGridColumns; // [!code ++]

public function addColumns(): PowerGridColumns // [!code ++]
{
    return PowerGrid::columns() // [!code ++]
    // 
}
```

#### Remove ActionButton Trait

```php{1,5}
use PowerComponents\LivewirePowerGrid\Traits\ActionButton; // [!code --]

class PowerGridTable extends PowerGridComponent 
{
   use ActionButton; // [!code --]
   // ...
}
```

#### If you previously use row action button add Column::action()

```php{5}
public function columns(): array
{
    return [
        // ...
        Column::action('Action'), // [!code ++]
    ];
}
```

---

#### Change Button caption to Button slot

```php{8}
// PowerGrid 4
   Button::add('bulk-demo')
       ->caption('Bulk Action') // 🚫 Before 
       ->class('...')
       
// PowerGrid 5
    Button::add('bulk-demo')
       ->slot('Bulk Action') // ✅ After 
       ->class('...')
```

---

#### Change Button emit, emitTo, emitSelf

* Button::emit
```php{8}
// PowerGrid 4 - Livewire v2
   Button::add('bulk-demo') 
       ->emit('event', [], false) // 🚫 Before - string $event, array|\Closure $params, bool $singleParam = false)
       ->class('...')
       
// PowerGrid 5 - Livewire v3 sintax
    Button::add('bulk-demo')
       ->dispatch('event', ['dishId' = 1]) // ✅ After - string $event, array $params)
       ->class('...')
```

* Button::emitTo
```php{8}
// PowerGrid 4 - Livewire v2
   Button::add('bulk-demo')
       ->emitTo('to', [], false) // 🚫 Before - string $to, string $event, array|\Closure $params, bool $singleParam = false)
       ->class('...')
       
// PowerGrid 5 - Livewire v3 sintax
    Button::add('bulk-demo') 
       ->dispatchTo('event', ['dishId' = 1]) // ✅ After - string $to, string $event, array $params)
       ->class('...')
```

### Change exportable keys on config

`config/livewire-powergrid.php`

```php{8-9,16-17}
'exportable' => [
     'default'      => 'openspout_v4',
     'openspout_v4' => [
         'xlsx' => \PowerComponents\LivewirePowerGrid\Services\OpenSpout\v4\ExportToXLS::class, // [!code --]
         'csv'  => \PowerComponents\LivewirePowerGrid\Services\OpenSpout\v4\ExportToCsv::class,  // [!code --]
         'xlsx' => \PowerComponents\LivewirePowerGrid\Components\Exports\OpenSpout\v4\ExportToXLS::class,  // [!code ++]
         'csv'  => \PowerComponents\LivewirePowerGrid\Components\Exports\OpenSpout\v4\ExportToCsv::class,  // [!code ++]
     ],
     'openspout_v3' => [
         'xlsx' => \PowerComponents\LivewirePowerGrid\Services\OpenSpout\v3\ExportToXLS::class, // [!code --]
         'csv'  => \PowerComponents\LivewirePowerGrid\Services\OpenSpout\v3\ExportToCsv::class, // [!code --]
         'xlsx' => \PowerComponents\LivewirePowerGrid\Components\Exports\OpenSpout\v3\ExportToXLS::class, // [!code ++]
         'csv'  => \PowerComponents\LivewirePowerGrid\Components\Exports\OpenSpout\v3\ExportToCsv::class, // [!code ++]
     ],
],
```
