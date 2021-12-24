# Configure

## 1. Include Scripts and Styles

Include the following Scripts and Stylesheets in your page:

Styles must be included before the `</head>` tag.

```html
    <!-- Styles -->
    @livewireStyles
    @powerGridStyles

   </head>
```

Scripts must be included before the `</body>` tag.

```html
    <!-- Scripts -->
    @livewireScripts
    @powerGridScripts

</body>
```

> 💡 Read more about this requirement at the official [Livewire documentation](https://laravel-livewire.com/docs/2.x/quickstart)

## 2. Alpine JS

Powergrid requires alpinejs version [^3.0](https://alpinejs.dev/)

### 2.1 As a config
```php
    /*
    |--------------------------------------------------------------------------
    | JS Framework
    |--------------------------------------------------------------------------
    */
    'alpinejs_cdn' => 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
```

### 2.2 As a module
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

```php
    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    */

    'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class,
```

Next, include jQuery and Bootstrap scripts in your page.

```html
<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        
<!-- after -->
@powerGridScripts
```

## 4. Tailwind settings

### 4.1 Dark Mode

To enable Dark Mode, configure the `DarkMode` class in `tailwind.config.js` file as follows:

```javascript
module.exports = {
    darkMode: 'class',
}
```

### 4.2 JIT

If you use Tailwind JIT you must add PowerGrid files in `purge` inside the `tailwind.config.js` file:

For Tailwind 2.x
```javascript
module.exports = {
  mode: 'jit',
  purge: [
      // ....
      './app/Http/Livewire/**/*Table.php',
      './vendor/power-components/livewire-powergrid/resources/views/**/*.php',
      './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'
  ]
  // ....
}
```

For Tailwind 3.x - [read](https://tailwindcss.com/docs/upgrade-guide#migrating-to-the-jit-engine)
```javascript
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

> 💡 Read more about [Tailwind just-in-time](https://tailwindcss.com/docs/just-in-time-mode).

### 4.3 Tailwind Forms

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

<img class="result-image" alt="Tailwind-Forms-Conflict" src="../img/conflict_tailwindforms.png" width="500"/>

> 💡 Read more about [Using classes instead of element selectors](https://github.com/tailwindlabs/tailwindcss-forms#using-classes-instead-of-element-selectors).

## 5. Cache

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

## 6. Filters

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

## 7. New Release Notification

PowerGrid can verify if a new release is available when you create a new PowerGrid Table.

![Output](../img/notify-update.png)

To enable this feature, follow the next steps:

**7.1. Require composer as a developer dependency, running:**

 ```bash
 composer require composer/composer --dev
 ```

**7.2. Change 'check_version' to `true` in `config/livewire-powergrid.php`.**

```php
    /*
    |--------------------------------------------------------------------------
    | New Release Notification
    |--------------------------------------------------------------------------
    */
    
    'check_version' => true
```
