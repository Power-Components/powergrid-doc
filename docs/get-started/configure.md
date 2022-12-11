# Configure

[[toc]]

## 1. Include Scripts and Styles

Include the following Scripts and Stylesheets in your page:

Styles must be included before the `</head>` tag.

```html{3}
    <!-- Styles -->
    @livewireStyles
    @powerGridStyles

   </head>
```

Scripts must be included before the `</body>` tag.

```html{3}
    <!-- Scripts -->
    @livewireScripts
    @powerGridScripts

</body>
```

::: tip
💡 Read more about this requirement at the official [Livewire documentation](https://laravel-livewire.com/docs/2.x/quickstart)
::: 

## 2. Alpine JS

Powergrid requires alpinejs version [^3.0](https://alpinejs.dev/)

#### 2.1 As a config
```php
    /*
    |--------------------------------------------------------------------------
    | JS Framework
    |--------------------------------------------------------------------------
    */
    'alpinejs_cdn' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
```

#### 2.2 As a module
You can also use it along with your app.js file and import it.

Run the following command to install it.

Please change `'alpinejs_cdn'` to null (no quotes).

```bash
npm install alpinejs
```
```javascript
import Alpine from 'alpinejs'

window.Alpine = Alpine

import './../../vendor/power-components/livewire-powergrid/dist/powergrid'

Alpine.start()
```

## 3. Choose your Theme

PowerGrid supports Tailwind and Bootstrap 5 as Themes. Tailwind is selected by default.

Your Theme can be set at `config/livewire-powergrid.php`.

To change to Bootstrap 5, modify your `theme` option as follows:

::: tip
💡 Read more how to customize your [Theme](../table/custom-theme).
::: 
--- 

## 4. Bootstrap 5 settings
```php{6}
    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    */
    'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class,
    
```

Some features are not available in the Bootstrap version:
* [Filters outside](configure?id=_7-filters)
* [Detail Row](../table/detail-row)

Next, include jQuery and Bootstrap scripts in your page.

```html
<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" 
        crossorigin="anonymous"></script>
        
<!-- after -->
@powerGridScripts
```

## 5. Tailwind settings

#### 5.1 Dark Mode

To enable Dark Mode, configure the `DarkMode` class in `tailwind.config.js` file as follows:

```javascript{2}
module.exports = {
    darkMode: 'class',
}
```

#### 5.2 JIT Production

If you use Tailwind JIT you must add PowerGrid files in `purge` inside the `tailwind.config.js` file:

```javascript{4-6}
module.exports = {
  content: [
      // ....
      './app/Http/Livewire/**/*Table.php',
      './vendor/power-components/livewire-powergrid/resources/views/**/*.php',
      './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'
  ]
  // ....
}
```

::: tip
💡 Read more about [Tailwind just-in-time](https://tailwindcss.com/docs/just-in-time-mode).
:::

#### 5.3 Tailwind Forms

If you use Tailwind forms, please consider modifying your `tailwind.config.js` to use the strategy `class` as follows:

```javascript
module.exports = {
   //...
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ]
}
```

This approach will avoid layout conflicts such as:

![Output](/_media/conflict_tailwindforms.png)

> 💡 Read more about [Using classes instead of element selectors](https://github.com/tailwindlabs/tailwindcss-forms#using-classes-instead-of-element-selectors).

## 6. Cache

Cache is enabled by default. When using collections, it improves search performance.

When enabled, data is reloaded whenever the page is refreshed or a field is updated.

To disable cache, change `cached_data` to `false` in `config/livewire-powergrid.php`.

Example:

```php
/*
|--------------------------------------------------------------------------
| Cache
|--------------------------------------------------------------------------
*/
'cached_data' => false,
```

## 7. Filters

PowerGrid offers inline and outside filters.

**inline**: Filters data inside the table (default).

**outside**: Filters data outside the table.

Inline is configured by default. To modify, change `filter` setting in `config/livewire-powergrid.php`.

Example:

```php
/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/
'filter' => 'outside',
```

## 8. New Release Notification

PowerGrid can verify if a new release is available when you create a new PowerGrid Table.

![Output](/_media/notify_update.png)

To enable this feature, follow the next steps:

**8.1. Require composer as a developer dependency, running:**

 ```bash
 composer require composer/composer --dev
 ```

**8.2. Change 'check_version' to `true` in `config/livewire-powergrid.php`.**

```php{6}
/*
|--------------------------------------------------------------------------
| New Release Notification
|--------------------------------------------------------------------------
*/
'check_version' => true
```

