## Upgrade from V1

Now in **version 2** some structural things have changed from the minimal version of [Alpinejs](https://alpinejs.dev/). This means that the backend of your tables will not be affected!.

  - Alpine v2 is no longer supported - uses v3
  - `livewire-powergrid.config `- js_framework now is `alpinejs_cnd`

`config/livewire-powergrid.config`

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


<!-- ✅ After -->
    'alpinejs_cdn' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',

```

Powergrid alpine scripts are loaded by default inside **@powerScripts**, but if you want to import them along with your **app.js** file, do so:

_resources/js/app.js_
```javascript
import Alpine from 'alpinejs'

window.Alpine = Alpine

import './../../vendor/power-components/livewire-powergrid/dist/powergrid'

Alpine.start()
```