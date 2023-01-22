# Upgrade Guide

### Upgrade From V3

PowerGrid is now on version 4.x.

This page will give you important information to upgrade from v3.x.

::: warning
Republish views if you have previously published
:::

--- 

```bash
php artisan vendor:publish --tag=livewire-powergrid-views --force && php artisan view:clear
```

After making all the changes, be sure to run the command
```bash
npm run dev
```

### Dependency Upgrades

* PHP 8.1+
* [Laravel Framework](https://laravel.com/) 9.0+
* [Laravel Livewire](https://laravel-livewire.com/docs/2.x/quickstart) 2.10+
* [Tailwind](https://tailwindcss.com/) v3+

---

### Deprecations

* PHP 8.0
* Laravel 8
* [Include Scripts and Styles vie Blade directive](https://v3.livewire-powergrid.com/get-started/configure.html#_1-include-scripts-and-styles)
* [Import AlpineJS in config](https://livewire-powergrid.com/get-started/configure.html#_2-alpine-js)
* [Column Filters](https://v3.livewire-powergrid.com/table/column-filters.html#column-filters) replace with [Filters Facade](https://github.com/Power-Components/livewire-powergrid/pull/785)
* [bootstrap-select (Bootstrap 5)](https://github.com/Power-Components/livewire-powergrid/pull/775)
* [required openspout/openspout](https://livewire-powergrid.com/get-started/release-notes.html#export-using-openspout-openspout)
---

### Include powergrid.css via module

Now, you must import `powergrid.css` in your `app.js`

```js{2}
import "./../../vendor/power-components/livewire-powergrid/dist/powergrid";
import "./../../vendor/power-components/livewire-powergrid/dist/powergrid.css";
```

### Include PowerGrid Presets in your tailwind.config.js

Reference: [Tailwind Doc](https://tailwindcss.com/docs/presets)

PowerGrid uses the **slate** color by default, you might want to change that, just insert the powergrid preset in the `tailwind.config.js` file

```js{7,14}
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require("./vendor/wireui/wireui/tailwind.config.js"),
        require("./vendor/power-components/livewire-powergrid/tailwind.config.js"),
    ],
    // optional
    theme: {
        extend: {
            colors: {
                ...colors,
                "pg-primary": colors.gray,
            },
        },
    },
}
```

### Update Config

Some references in settings have been removed and added. Please adjust this before continuing.

Removed:

* [alpine_cdn](https://github.com/Power-Components/livewire-powergrid/blob/3.x/resources/config/livewire-powergrid.php#L86)
* [plugins.bootstrap-select](https://github.com/Power-Components/livewire-powergrid/blob/3.x/resources/config/livewire-powergrid.php#L30)

Added:

* [plugins.multiselect](https://github.com/Power-Components/livewire-powergrid/blob/4.x/resources/config/livewire-powergrid.php#L41)
* [exportable](https://github.com/Power-Components/livewire-powergrid/blob/4.x/resources/config/livewire-powergrid.php#L116)

### Independent export engine

Make sure you choose which version you will use for export in settings.

```php
'exportable'    => [
    'default'      => 'openspout_v4', // or openspout_v3
```

#### 1 - Install openspout in the chosen version:

::: warning
Supported versions: [3](https://github.com/openspout/openspout/tree/3.x) and [4](https://github.com/openspout/openspout/tree/4.x)
::: 

If you chose **openspout_v4**, run:
```bash
composer require openspout/openspout ^4
```

If you chose **openspout_v3**, run:

```bash
composer require openspout/openspout ^3
```

#### 2 - Add WithExport Traits

You should also import the export trait into your tables:

```php{1,5}
use PowerComponents\LivewirePowerGrid\Traits\WithExport;

final class YourPowerGridTable extends PowerGridComponent
{
    use WithExport;
}
```

Read more about [setUp](../table/features-setup?id=features-setup).

---

### Deprecated Queue Properties

* As configurações de Queues para exportação deverá ser chamada usando a Facade Exportable 

```php
    <!-- 🚫 Before -->
    public int $queues = 6; // Use two queues
    
    public string $onQueue = 'my-dishes'; //queue name
    
    public string $onConnection = 'redis'; // default sync
```

Change To:

```php{8-10}
    <!-- ✅ After -->
    public function setUp()
    {
        return [
            Exportable::make('export')
               ->striped()
               ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV)
               ->queues(6)
               ->onQueue('my-dishes')
               ->onConnection('redis'),
        ];
    
    }
```

---

### Custom SearchBox Theme 

Add this to your custom themes:

Tailwind:
```php
public function searchBox(): SearchBox
{
   return Theme::searchBox()
      ->input('placeholder-pg-primary-400 pl-[36px] block w-full float-right bg-white text-pg-primary-700 border border-pg-primary-300 rounded-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-pg-primary-500 pl-10 dark:bg-pg-primary-600 dark:text-pg-primary-200 dark:placeholder-pg-primary-200 dark:border-pg-primary-500')
      ->iconClose('text-pg-primary-300 dark:text-pg-primary-200')
      ->iconSearch('text-pg-primary-300 mr-2 w-5 h-5 dark:text-pg-primary-200');
}
```

Bootstrap:
```php
 public function searchBox(): SearchBox
 {
    return Theme::searchBox()
       ->input('col-12 col-sm-8 form-control')
       ->iconSearch('bi bi-search')
       ->iconClose('');
 }
```

---

### Table::tdBodyEmpty

Add this to your custom themes:

Tailwind:
```php{8}
public function table(): Table
{
    return Theme::table(...)
        // ...
        ->tdBodyEmpty('px-3 py-2 whitespace-nowrap dark:text-pg-primary-200');
}
```

Bootstrap:
```php{8}
public function table(): Table
{
    return Theme::table(...)
        // ...
        ->tdBodyEmpty('', 'vertical-align: middle; line-height: normal;');
}
```


---
