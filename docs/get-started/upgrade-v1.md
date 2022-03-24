## Upgrade From V1

PowerGrid is now on version 2.x.

This page will give you important information to upgrade from v1.x.

### Configuration

1. Alpine v2 is no longer supported. Please use Alpine JS v3.
2. The configuration keys `js_framework_cdn` and `js_framework` in `config/livewire-powergrid.php` are now combined and renamed to `alpinejs_cdn`.

The code below:

```php
     <!-- 🚫 Before -->
     
    'js_framework' => 'alpinejs',
    //'js_framework' => null, // If you already have Alpine included in your project

    /*
    |--------------------------------------------------------------------------
    | Frameworks CDN
    |--------------------------------------------------------------------------
    |
    | Define here the CDN source for imported JS Framework
    |
    */

    'js_framework_cdn' => [
        'alpinejs' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
        //'alpinejs' => 'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js' //Alpine 2.8
    ],
```

Changed to:

```php
    <!-- ✅ After -->

    /*
    |--------------------------------------------------------------------------
    | AlpineJS CDN
    |--------------------------------------------------------------------------
    |
    | Define here the CDN source for imported AlpineJS
    |
    */

    'alpinejs_cdn' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js', // null - If you already have Alpine included in your project

```

Alpine scripts are loaded by default with the `@powerGridScripts` blade directive.

However, if you prefer to import them manually in your `app.js` file, follow these steps:

Step 1: In `config/livewire-powergrid.config` set the configuration key `alpinejs_cdn` to `null` (no quotes).

```php
    'alpinejs_cdn' => null,
```

Step 2: Add the following code to `resources/js/app.js` :

```javascript
import Alpine from 'alpinejs'

window.Alpine = Alpine

import './../../vendor/power-components/livewire-powergrid/dist/powergrid'

Alpine.start()
```

Read more about Alpine JS [configuration](get-started/configure?id=_2-alpine-js).

#### Event Listeners

The code below:

```php
    <!-- 🚫 Before -->

    protected function getListeners()
    {
        $this->listeners[] = 'editDish';
        $this->listeners[] = 'deleteDish';
        return $this->listeners;
    }
```

Changed to:

```php
    <!-- ✅ After -->

    protected function getListeners(): array
    {
        return array_merge(
            parent::getListeners(), 
            [
                'edit-dish'   => 'editDish',
                'delete-dish' => 'deleteDish'
            ]);
    }
```

Read more about [Event Listeners](table/component-settings?id=event-listeners).

> **❗ Important:**  Republish views if you have previously published
```bash
php artisan vendor:publish --tag=livewire-powergrid-views && php artisan view:clear
```



<hr />
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/get-started/demo?id=demo">Next →</a></span>
</footer>
