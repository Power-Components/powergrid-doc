# Configure

## Import JS and CSS

`resources/js/app.js`

```javascript
import './../../vendor/power-components/livewire-powergrid/dist/powergrid'
 
// If you use Tailwind 
import './../../vendor/power-components/livewire-powergrid/dist/tailwind.css'

// If you use Bootstrap 5 
import './../../vendor/power-components/livewire-powergrid/dist/bootstrap5.css'
```

## Choose your Theme

PowerGrid supports Tailwind and Bootstrap 5 as Themes. Tailwind is selected by default.

Your Theme can be set at `config/livewire-powergrid.php`.

To change to Bootstrap 5, modify your `theme` option as follows:

::: tip
💡 Read more how to customize your [Theme](../table/custom-theme).
::: 
--- 

## Bootstrap 5 settings
```php{6}
    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    */
    'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class, // [!code focus:1]
    
```

Some features are not available in the Bootstrap version:
* [Filters outside](configure?id=_7-filters)

## Tailwind settings

#### Dark Mode

To enable Dark Mode, configure the `DarkMode` class in `tailwind.config.js` file as follows:

```javascript{2}
module.exports = {
    darkMode: 'class',
}
```

#### JIT Production

If you use Tailwind JIT you must add PowerGrid files in `purge` inside the `tailwind.config.js` file:

```javascript{4-6}
module.exports = {
  content: [
      // ....
      './app/Http/Livewire/**/*Table.php', // [!code focus:3]
      './vendor/power-components/livewire-powergrid/resources/views/**/*.php',
      './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'
  ]
  // ....
}
```

::: tip
💡 Read more about [Tailwind just-in-time](https://tailwindcss.com/docs/just-in-time-mode).
:::

#### Presets

PowerGrid uses the **slate** color by default, you might want to change that, just insert the PowerGrid preset in the `tailwind.config.js` file

```js{7,13}
const colors = require('tailwindcss/colors') // [!code focus:1]

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require("./vendor/wireui/wireui/tailwind.config.js"),
        require("./vendor/power-components/livewire-powergrid/tailwind.config.js"), // [!code focus:1]
    ],
    // optional
    theme: {
        extend: {
            colors: {
                "pg-primary": colors.gray, // [!code focus:1]
            },
        },
    },
}
```

::: tip
💡 Read more about [Tailwind Presets](https://tailwindcss.com/docs/presets).
:::

## Filters

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

## New Release Notification

PowerGrid can verify if a new release is available when you create a new PowerGrid Table.

![Output](/_media/notify_update.png)

To enable this feature, follow the next steps:

* Require composer as a developer dependency, running:

 ```bash
 composer require composer/composer --dev
 ```

* Change `check_version` to `true` in `config/livewire-powergrid.php`.**

```php{6}
/*
|--------------------------------------------------------------------------
| New Release Notification
|--------------------------------------------------------------------------
*/
'check_version' => true
```

