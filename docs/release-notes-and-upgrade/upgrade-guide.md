# Upgrade Guide

## Upgrade From V5

This page will provide you with important information to upgrade from version 5.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.2+

## PowerGrid Facade namespace

```php
use PowerComponents\LivewirePowerGrid\PowerGrid;// [!code --]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;// [!code ++]
```

## JS Imports

```js
import './../../vendor/power-components/livewire-powergrid/dist/powergrid.css' // [!code --]

import './../../vendor/power-components/livewire-powergrid/dist/tailwind.css' // [!code ++] // bootstrap5.css

```

## setUp method

```php{4}
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

Header::make(); // [!code --]
PowerGrid::header(); // [!code ++]

Footer::make(); // [!code --]
PowerGrid::footer(); // [!code ++]

Responsive::make(); // [!code --]
PowerGrid::responsive(); // [!code ++]

Exportable::make(); // [!code --]
PowerGrid::exportable(); // [!code ++]

Lazy::make(); // [!code --]
PowerGrid::lazy(); // [!code ++]

Cache::make(); // [!code --]
PowerGrid::cache(); // [!code ++]

Detail::make(); // [!code --]
PowerGrid::detail(); // [!code ++]
```

---

## Custom Theme

* Rename `template` to `customTemplateClass` method

```php
public function template(); // [!code --]
public function customTemplateClass(); // [!code ++]

```

## Change your theme class, and follow new template style

::: info
This change simplifies how PowerGrid handles theme changes dynamically and removes many classes and unnecessary things to reduce processing in PHP.
:::

::: warning
⚠️ Follow the example available in `vendor/.../src/Themes/Tailwind.php` or `vendor/.../src/Themes/Bootstrap5.php` as all methods follow this new standard.
:::

**5.x**

```php
public function table(): array
{
    return Theme::table('min-w-full dark:!bg-primary-800')
        ->container('-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8')
        ->base('p-3 align-middle inline-block min-w-full w-full sm:px-6 lg:px-8')
        ->div('rounded-t-lg relative border-x border-t border-pg-primary-200 dark:bg-pg-primary-700 dark:border-pg-primary-600')
        ->thead('shadow-sm rounded-t-lg bg-pg-primary-100 dark:bg-pg-primary-900')
        ->thAction('!font-bold')
        ->tdAction('')
        ->tr('')
        ->trFilters('bg-white shadow-sm dark:bg-pg-primary-800')
        ->th('font-extrabold px-2 pr-4 py-3 text-left text-xs text-pg-primary-700 tracking-wider whitespace-nowrap dark:text-pg-primary-300')
        ->tbody('text-pg-primary-800')
        ->trBody('border-b border-pg-primary-100 dark:border-pg-primary-600 hover:bg-pg-primary-50 dark:bg-pg-primary-800 dark:hover:bg-pg-primary-700')
        ->tdBody('p-2 whitespace-nowrap dark:text-pg-primary-200')
        ->tdBodyEmpty('p-2  whitespace-nowrap dark:text-pg-primary-200')
        ->trBodyClassTotalColumns('')
        ->tdBodyTotalColumns('p-2 whitespace-nowrap dark:text-pg-primary-200 text-sm text-pg-primary-600 text-right space-y-2')
}
```

**6.x**

```php
public function table(): array
{
    return [
        'layout' => [
            'base'      => 'p-3 align-middle inline-block min-w-full w-full sm:px-6 lg:px-8',
            'div'       => 'rounded-t-lg relative border-x border-t border-pg-primary-200 dark:bg-pg-primary-700 dark:border-pg-primary-600',
            'table'     => 'min-w-full dark:!bg-primary-800',
            'container' => '-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8',
            'actions'   => 'flex gap-2',
        ],

        'header' => [
            'thead'    => 'shadow-sm rounded-t-lg bg-pg-primary-100 dark:bg-pg-primary-900',
            'tr'       => '',
            'th'       => 'font-extrabold px-3 py-3 text-left text-xs text-pg-primary-700 tracking-wider whitespace-nowrap dark:text-pg-primary-300',
            'thAction' => '!font-bold',
        ],

        'body' => [
            'tbody'              => 'text-pg-primary-800',
            'tbodyEmpty'         => '',
            'tr'                 => 'border-b border-pg-primary-100 dark:border-pg-primary-600 hover:bg-pg-primary-50 dark:bg-pg-primary-800 dark:hover:bg-pg-primary-700',
            'td'                 => 'px-3 py-2 whitespace-nowrap dark:text-pg-primary-200',
            'tdEmpty'            => 'p-2 whitespace-nowrap dark:text-pg-primary-200',
            'tdSummarize'        => 'p-2 whitespace-nowrap dark:text-pg-primary-200 text-sm text-pg-primary-600 text-right space-y-2',
            'trSummarize'        => '',
            'tdFilters'          => '',
            'trFilters'          => '',
            'tdActionsContainer' => 'flex gap-2',
        ],
    ];
}
```
