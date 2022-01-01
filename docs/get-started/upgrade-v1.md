## Upgrade From V1

> In this version, AlpineJs ^3 is a requirement

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
    
    'alpinejs_cdn' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js', null, // If you already have Alpine included in your project

```

Powergrid alpine scripts are loaded by default inside **@powerScripts**, but if you want to import them along with your **app.js** file, do so:

1. In `config/livewire-powergrid.config` set null
2. in `resources/js/app.js` :

```javascript
import Alpine from 'alpinejs'

window.Alpine = Alpine

import './../../vendor/power-components/livewire-powergrid/dist/powergrid'

Alpine.start()
```

<hr />
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/get-started/demo?id=demo">Next →</a></span>
</footer>

