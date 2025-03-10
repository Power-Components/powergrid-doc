# PowerGrid Configuration

This section covers the PowerGrid config file, along with the configurations for assets and plugins.

Here you will find:

[[toc]]

## Introduction

Once the [installation](/get-started/install.html) is complete, you must perform these [Essential Configuration](/get-started/powergrid-configuration.html#essential-configuration) steps to start using PowerGrid in your Laravel application.

## Essential Configuration

### 1. Import Javascript Assets

First, import PowerGrid's JavaScript assets.

Add the following code to your project's `resources/js/app.js` file.

```javascript{3}
// resources/js/app.js

import './../../vendor/power-components/livewire-powergrid/dist/powergrid' // [!code ++]
```

### 2. Choose a CSS theme

PowerGrid provides Tailwind 3 and Bootstrap 5 themes. Tailwind is selected by default.

To use Bootstrap 5, simply change the `theme` key in the `config/livewire-powergrid.php` file. Here's an example:

```php{10}
// config/livewire-powergrid.php

/*
|--------------------------------------------------------------------------
| Theme
|--------------------------------------------------------------------------
*/

'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class, // [!code --]
'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class, // [!code ++]
```

::: info 📝 NOTE
Currently, the following features are exclusive to the Tailwind theme.

* [Responsive Table](/table-features/filters.html#filter-position)
* [Filters outside](/table-features/filters.html#filter-position)
:::

### 3. Theme

Next, you must import the theme assets in the file `resources/js/app.js`.

::: code-group


```css [Tailwind v4]
/*resources/css/app.css*/

@import "tailwindcss";
@import '../../vendor/power-components/livewire-powergrid/resources/css/tailwind4.css';

/** enable dark mode */
@custom-variant dark (&:where(.dark, .dark *));

@source '../../app/Livewire/*Table.php';
@source '../../app/Livewire/**/*Table.php';
@source '../../vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php';
@source '../../vendor/power-components/livewire-powergrid/resources/views/**/*.php';

/* Custom theme */
@theme {
 --color-pg-primary-50: oklch(0.985 0 0);
 --color-pg-primary-100: oklch(0.97 0 0);
 --color-pg-primary-200: oklch(0.922 0 0);
 --color-pg-primary-300: oklch(0.87 0 0);
 --color-pg-primary-400: oklch(0.708 0 0);
 --color-pg-primary-500: oklch(0.556 0 0);
 --color-pg-primary-600: oklch(0.439 0 0);
 --color-pg-primary-700: oklch(0.371 0 0);
 --color-pg-primary-800: oklch(0.269 0 0);
 --color-pg-primary-900: oklch(0.205 0 0);
 --color-pg-primary-950: oklch(0.145 0 0);
}
```

```css [Tailwind v3]
/*resources/css/app.css*/

@import './../../vendor/power-components/livewire-powergrid/dist/tailwind.css'
```

```css [Bootstrap 5+]
/*resources/css/app.css*/

@import './../../vendor/power-components/livewire-powergrid/dist/bootstrap5.css'
```

:::


#### 4. Tailwind v3 Configuration

::: tip
If you are using Tailwind v3, you may configure the options below. 
:::

#### Dark Mode

To enable Dark Mode, configure the `DarkMode` class in the file `tailwind.config.js` as follows.

```javascript{4}
// tailwind.config.js

module.exports = {
    darkMode: 'class',// [!code ++]
}
```

#### JIT Production

If you use Tailwind JIT you must add PowerGrid files in `purge` inside the file `tailwind.config.js`:

```javascript{6-8}
// tailwind.config.js

module.exports = {
  content: [
      // ....
      './app/Livewire/**/*Table.php',// [!code ++]
      './vendor/power-components/livewire-powergrid/resources/views/**/*.php',// [!code ++]
      './vendor/power-components/livewire-powergrid/src/Themes/Tailwind.php'// [!code ++]
  ]
  // ....
}
```

::: tip 💡 TIP
 Read more about [Tailwind just-in-time](https://tailwindcss.com/docs/just-in-time-mode).  
 If you are already using Tailwind version 3 or greater JIT is enabled by default. So you need to add these files to your `tailwind.config.js` because otherwise the styles won't apply correctly.
 [Read more here](https://tailwindcss.com/docs/upgrade-guide#migrating-to-the-jit-engine)
:::

#### Presets

PowerGrid uses the **slate** color by default.

To use a different color, insert the PowerGrid preset in the file `tailwind.config.js`.

```js{9,15}
// tailwind.config.js

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require("./vendor/wireui/wireui/tailwind.config.js"),
        require("./vendor/power-components/livewire-powergrid/tailwind.config.js"), // [!code ++]
    ],
    // optional
    theme: {
        extend: {
            colors: {
                "pg-primary": colors.gray, // [!code ++]
            },
        },
    },
}
```

::: tip 💡 TIP
 Read more about [Tailwind Presets](https://tailwindcss.com/docs/presets).
:::

### 5. Bootstrap Configuration

Currently, there are no specific Bootstrap theme configuration instructions.

### 6. Next step

<div class="success custom-block">
  <p class="custom-block-title">🎉 Everything ready!</p>
  <p>Now, we can go to the next step and <a href="/get-started/create-powergrid-table.html">create a PowerGrid Table</a>.</p>
</div>

## General Configuration

### Persist Driver

This section defines how [Persist](/table-component/component-configuration.html#persist) data is stored. By default, information is stored in `cookies`. You may change this configuration in the key `persist_driver` in `config/livewire-powergrid.php`.

Possible Persist Drivers:

| Driver          | Description                      |
|-----------------|----------------------------------|
| `cookies` | Store data in cookies.                 |
| `session` | Store data in the session.             |

Example:

```php
// config/livewire-powergrid.php
    /*
    |--------------------------------------------------------------------------
    | Persisting
    |--------------------------------------------------------------------------
    |
    */

    'persist_driver' => 'cookies',// [!code --]
    'persist_driver' => 'session',// [!code ++]
```

### Filter Position Configuration

To configure how filters are displayed, change the value in the key `filter` in `config/livewire-powergrid.php`.

| Filter          | Description                                          | Notes                             |
|-----------------|------------------------------------------------------|-----------------------------------|
| `inline` | Filters are displayed below the Table Header                |                 -                 |
| `outside`  | Filters are displayed outside the Table, above the Header | only available for Tailwind theme |

Example:

```php{10}
// config/livewire-powergrid.php

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/
    'filter' => 'inline',// [!code --]
    'filter' => 'outside',// [!code ++]
```

### New Release Notification

PowerGrid can let you know when a new release is available.

Require composer as a developer dependency, running:

 ```bash
 composer require composer/composer --dev
 ```

Run `powergrid:update`

 ```bash
 php artisan powergrid:update
 ```

## Advanced Configuration

### Custom Namespace

By default, PowerGrid will create components following the location specified under Livewire's Config Key `livewire.class_namespace`.

To adjust the configuration, run: `php artisan livewire:publish --config` to publish the file `config/livewire.php`.

The example below changes the namespace to "Domain".

```php
// config/livewire.php

/*
|---------------------------------------------------------------------------
| Class Namespace
|---------------------------------------------------------------------------
*/

'class_namespace' => 'App\\Livewire',// [!code --]
'class_namespace' => 'Domain', // [!code ++]
```

Now, your Components will be created inside the top `/Domain` directory.

The next example will create a component `ClientList` inside the path `/Domain/Client/Tables`

```shell
  > php artisan powergrid:create

 ┌ What is the name of your Table Component? ───────────────────┐
 │ Client\Tables\ClientList                                     │
 └──────────────────────────────────────────────────────────────┘

```

Resulting in:

```shell
 ⚡ ClientList was successfully created at [Domain/Client/Tables/ClientList.php].

 💡 include the ClientList component using the tag: <livewire:client.tables.client-list/>
```

### Auto-Discover Models

By default, PowerGrid auto discovers Models living in the directory `app/Models/`.

If your application is organized in a different architecture (E.g, Domain-Driven Design), you may add other directory paths inside the configuration key `livewire-powergrid.auto_discover_models_paths` in PowerGrid's [configuration file](/get-started/install.html#_2-publish-config-files).

The example below adds the main directory `/Domain` to be scanned for Eloquent Models.

```php
// config/livewire-powergrid.php

/*
|--------------------------------------------------------------------------
| Auto-Discover Models
|--------------------------------------------------------------------------
|
| PowerGrid will search for Models in the directories listed below.
| These Models be listed as options when you run the
| "artisan powergrid:create" command.
|
*/

'auto_discover_models_paths' => [
    app_path('Models'),// [!code --]
    base_path('Domain'),// [!code ++]
],
  ```

As a result, when creating a PowerGrid Component, all Models under `/Domain` will be available in the select list.

```shell
 ┌ Select a Model or enter its Fully qualified name. ───────────┐
 ├──────────────────────────────────────────────────────────────┤
 │› Domain\Dish\Models\Dish                                     │
 │  Domain\Invoice\Models\Invoice                               │
 │  Domain\User\Models\User                                     │
 └──────────────────────────────────────────────────────────────┘

```

## Plugins Configuration

### Flatpickr

PowerGrid relies on [Flatpickr](https://flatpickr.js.org/) to render the [Datetime Picker Filter](/table-features/filters.html#datetime-picker-filter) and the [Date Picker Filter](/table-features/filters.html#date-picker-filter).

To install Flatpickr in your project, run the following command:

```shell
npm i flatpickr --save
```

Then, you must configure your application to load Flatpickr's assets.

Add the following code to your project's `resources/js/app.js` file.

```javascript
// resources/js/app.js

import flatpickr from "flatpickr"; // [!code ++]
```

Next, we need to load Flatpickr CSS.

Add the following code to your project's `resources/css/app.css` file.

```css
/* resources/css/app.css */

@import "flatpickr/dist/flatpickr.min.css"; // [!code ++]
```

Alternatively, you may import the CSS from the `resources/js/app.js` file.

```javascript
// resources/js/app.js

import 'flatpickr/dist/flatpickr.min.css';// [!code ++]
```

Finally, adjust the language configuration to match your app's locale within the `config/livewire-powergrid.php` file, specifically in the `plugins` > `flatpickr` section.

Example:

```php
// config/livewire-powergrid.php

 'plugins' => [
        // ...
        'flatpickr' => [// [!code ++:17]
            // ..
            'locales'   => [
                'pt_BR' => [
                    'locale'     => 'pt',
                    'dateFormat' => 'd/m/Y H:i',
                    'enableTime' => true,
                    'time_24hr'  => true,
                ],
                'us' => [
                    'locale'     => 'us',
                    'dateFormat' => 'm/d/Y',
                    'enableTime' => true,
                    'time_24hr'  => false,
                ],
            ],
        ],
    ],
```

### TomSelect

PowerGrid can use [TomSelect](https://tom-select.js.org) to render a [Multi Select Filter](/table-features/filters.html#multi-select-filter).

To install TomSelect in your project, run the following command:

```shell
npm i tom-select
```

Then, you must configure your application to load TomSelect's assets.

Add the following code to your project's `resources/js/app.js` file.

```javascript
// resources/js/app.js

import TomSelect from "tom-select";// [!code ++:2]
window.TomSelect = TomSelect
```

Next, add the following code to your project's `resources/js/app.css` file.

```css
/* resources/js/app.css */

@import "~tom-select/dist/scss/tom-select.bootstrap5";// [!code ++]
```

Finally, configure PowerGrid to use TomSelect as default within the `config/livewire-powergrid.php` file, specifically in the `select` > `default` section. You may also configure Slim's settings inside the `select` > `tom` key.

Example:

```php
// config/livewire-powergrid.php

'select' => [
    'default' => 'tom', // [!code ++:10]

       'tom' => [
            'plugins' => [
                'clear_button' => [
                    'title' => 'Remove all selected options',
                ],
            ],
       ,
    ],
],
```

### SlimSelect

PowerGrid can use [SlimSelect](https://slimselectjs.com/) to render a [Multi Select Filter](/table-features/filters.html#multi-select-filter).

To install SlimSelect in your project, run the following command:

```shell
npm i slim-select
```

Then, you must configure your application to load SlimSelect's assets.

Add the following code to your project's `resources/js/app.js` file.

```javascript
// resources/js/app.js

import SlimSelect from 'slim-select'// [!code ++:2]
window.SlimSelect = SlimSelect
```

Next, add the following code to your project's `resources/js/app.css` file.

```css
/* resources/js/app.css */

@import "~slim-select/dist/slimselect.css";// [!code ++]
```

Finally, configure PowerGrid to use SlimSelect as default within the `config/livewire-powergrid.php` file, specifically in the `select` > `default` section. You may also configure Slim's settings inside the `select` > `slim` key.

Example:

```php
// config/livewire-powergrid.php

'select' => [
    'default' => 'slim', // [!code ++:7]

    'slim' => [ 
       'settings' => [
             'alwaysOpen' => false,
       ],
    ],
],
```
