# Upgrade Guide

## Upgrade From V3

PowerGrid is now on version 4.x.

This page will provide you with important information to upgrade from v3.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.1+
* [Laravel Framework](https://laravel.com/) 9.0+
* [Laravel Livewire](https://laravel-livewire.com/docs/2.x/quickstart) 2.10+
* [Tailwind](https://tailwindcss.com/) v3+

---

### Deprecations

The following items have been deprecated in this release:

* PHP 8.0
* Laravel 8
* [Scripts and Styles vie Blade directive](https://v3.livewire-powergrid.com/get-started/configure.html#_1-include-scripts-and-styles)
* [AlpineJS in config](https://livewire-powergrid.com/get-started/configure.html#_2-alpine-js)
* [Column Filters](https://v3.livewire-powergrid.com/table/column-filters.html#column-filters) replace with [Filters Facade](https://github.com/Power-Components/livewire-powergrid/pull/785)
* [bootstrap-select (Bootstrap 5)](https://github.com/Power-Components/livewire-powergrid/pull/775)
* [required openspout/openspout](https://livewire-powergrid.com/get-started/release-notes.html#export-using-openspout-openspout)

---

### PowerGrid Directives

You must remove the PowerGrid directive `@powerGridStyles` and `@powerGridScripts` from your views. These directives are deprecated.

### Published Views

You must republish views if you have previously published them.

To republish the view, first run the command below.

```bash
php artisan vendor:publish --tag=livewire-powergrid-views --force && php artisan view:clear
```

Secondly, run the following command.

```bash
npm run dev
```

---

### Include powergrid.css via module

Now, you must import `powergrid.css` in your `app.js`

```js{2}
import "./../../vendor/power-components/livewire-powergrid/dist/powergrid";
import "./../../vendor/power-components/livewire-powergrid/dist/powergrid.css";
```

### Include PowerGrid Presets in your tailwind.config.js

Reference: [Tailwind Doc](https://tailwindcss.com/docs/presets)

PowerGrid uses the **slate** color by default.

If you would like to change that, just insert the PowerGrid preset in the `tailwind.config.js` file as demonstrated below.

```js{7,13}
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
                "pg-primary": colors.gray,
            },
        },
    },
}
```

### Update Config

Some references in settings have been changed in this release.

You must adjust your `config/livewire-powergrid.php` file according to the on the diff comparison demonstrated in the links below.

Remove these lines:

* [alpine_cdn](https://github.com/Power-Components/livewire-powergrid/blob/3.x/resources/config/livewire-powergrid.php#L86)
* [plugins.bootstrap-select](https://github.com/Power-Components/livewire-powergrid/blob/3.x/resources/config/livewire-powergrid.phpL27#L33)

Add these lines:

* [plugins.multiselect](https://github.com/Power-Components/livewire-powergrid/blob/4.x/resources/config/livewire-powergrid.php#L41#L54)
* [exportable](https://github.com/Power-Components/livewire-powergrid/blob/4.x/resources/config/livewire-powergrid.php#L116#L126)

### Independent export engine

Before proceeding with the Openspout installation, you must configure which Openspout version PowerGrid will use for exporting files.

PowerGrid supports Openspout version [3](https://github.com/openspout/openspout/tree/3.x) and version [4](https://github.com/openspout/openspout/tree/4.x).

```php
//File config/livewire-powergrid.php

'exportable'    => [
    'default'      => 'openspout_v4', // or openspout_v3
```

Now, proceed with the installation.

#### 1 - Install Openspout

If you have chosen **openspout_v3**, run:

```bash
composer require openspout/openspout ^3
```

If you have chosen **openspout_v4**, run:

```bash
composer require openspout/openspout ^4
```

#### 2 - Add WithExport Traits

Now, you must  import the export trait into your tables:

```php{1,5}
use PowerComponents\LivewirePowerGrid\Traits\WithExport;

final class YourPowerGridTable extends PowerGridComponent
{
    use WithExport; // <====== Add this!
}
```

You can find more information on the [setUp](../table/features-setup?id=features-setup) page.

---

### Deprecated Queue Properties

* Queue properties are depcrecated in this release and you must migrate your queue configuration to the `Exportable` Facade.

Deprecated configuration:

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

If you have a custom Theme, you must add the following CSS configuration to your custom theme search box configurations.

Tailwind Custom Theme:

```php
public function searchBox(): SearchBox
{
   return Theme::searchBox()
      ->input('placeholder-pg-primary-400 pl-[36px] block w-full float-right bg-white text-pg-primary-700 border border-pg-primary-300 rounded-full py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-pg-primary-500 pl-10 dark:bg-pg-primary-600 dark:text-pg-primary-200 dark:placeholder-pg-primary-200 dark:border-pg-primary-500')
      ->iconClose('text-pg-primary-300 dark:text-pg-primary-200')
      ->iconSearch('text-pg-primary-300 mr-2 w-5 h-5 dark:text-pg-primary-200');
}
```

Bootstrap Custom Theme:

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

### Custom Theme - Table::tdBodyEmpty

You must chain the following method to your custom themes.

Tailwind Custom Theme:

```php{8}
public function table(): Table
{
    return Theme::table(...)
        // ...
        ->tdBodyEmpty('px-3 py-2 whitespace-nowrap dark:text-pg-primary-200');
}
```

Bootstrap Custom Theme:

```php{8}
public function table(): Table
{
    return Theme::table(...)
        // ...
        ->tdBodyEmpty('', 'vertical-align: middle; line-height: normal;');
}
```

### Filters

The filter methods in columns are deprecated in this release.

All filters must be migrated to the `filters(s)` function. The new filter API allows the addition of other filters and reduces the complexity inside `addColumns()` method.

Additionally, two new filters are available in this release, Read more [Column Filters](../table/column-filters.html) page.

Deprecated filter API:

```php
<!-- 🚫 Before -->
public function columns(): array
{
   return [
       Column::make('Price', 'price_in_brl')
          ->makeInputRange('price', '.', ','),
   ];
}

Must be changed to:

<!-- ✅ After -->
public function columns(): array
{
   return [
       Column::make('Price', 'price', 'price_in_brl'),
   ];
}

public function filters(): array
{
   return [
       Filter::number('price', 'price_in_brl')
           ->thousands('.')
           ->decimal(','),
   ];
} 
```

The example above creates a filter of type number for column "price" in the field "price_in_brl".

Here is an example using [makeInputRange](https://v4.livewire-powergrid.com/table/column-filters.html#makeinputrange-string-datafield-string-thousands-string-decimal).

---
