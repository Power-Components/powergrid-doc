# Configure

[[toc]]

## 1. Import JS and CSS

Install AlpineJS.
```bash
npm install alpinejs
```

`resources/js/app.js`

```javascript{5,6}
import './../../vendor/power-components/livewire-powergrid/dist/powergrid'
import './../../vendor/power-components/livewire-powergrid/dist/powergrid.css'
```

## 2. Choose your Theme

PowerGrid supports Tailwind and Bootstrap 5 as Themes. Tailwind is selected by default.

Your Theme can be set at `config/livewire-powergrid.php`.

To change to Bootstrap 5, modify your `theme` option as follows:

::: tip
💡 Read more how to customize your [Theme](../table/custom-theme).
::: 
--- 

## 3. Bootstrap 5 settings
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

## 4. Tailwind settings

#### 4.1 Dark Mode

To enable Dark Mode, configure the `DarkMode` class in `tailwind.config.js` file as follows:

```javascript{2}
module.exports = {
    darkMode: 'class',
}
```

#### 4.2 JIT Production

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

#### 4.3 Presets

PowerGrid uses the **slate** color by default, you might want to change that, just insert the PowerGrid preset in the `tailwind.config.js` file

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

::: tip
💡 Read more about [Tailwind Presets](https://tailwindcss.com/docs/presets).
:::

#### 4.4 Tailwind Forms

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

![Output](/_media/notify_update.png)

To enable this feature, follow the next steps:

**7.1. Require composer as a developer dependency, running:**

 ```bash
 composer require composer/composer --dev
 ```

**7.2. Change 'check_version' to `true` in `config/livewire-powergrid.php`.**

```php{6}
/*
|--------------------------------------------------------------------------
| New Release Notification
|--------------------------------------------------------------------------
*/
'check_version' => true
```

