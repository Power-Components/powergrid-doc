# Release Notes

[[toc]]

### Deprecations

The following items have been deprecated in this release:

* Using `dynamicProperties` in Button macros.
* Remove support for `openspout/openspout` v3.
* Remove `Cache::make()->forever()` method.
* Cache `rememberForever` via config `cache_data` key.
* Remove `Button::make()->method()` method.
* Remove `Button::make()->target()` method (now in route method).
* Remove `Button::make()->bladeComponent()` available only for `actionRules()`.
* remove `Button::make()->render` You can work around this by using `bladeComponent` in `actionRules()` method.

---

### New Properties

* `$supportModel` (default: true) to control model support. By default, forceFill on the model loads all model attributes.
* `$withoutResourcesActions`: Disable process of icons in javascript memory

### Config Keys

**Added**:

- `cache_ttl`: (default: ) Value in seconds to keep some PowerGrid actions in the cache, such as actions and rules.
- `icon_resources`: Specifies resources settings for load SVG icons in the Javascript window.

**Removed**

* `cache_data`

---

### Changes

Button::route
Button macros
Button::toggleDetail() button needs row id

### Improves & Features

**Refactored Actions Rendering**

::: info
* Action rendering has been refactored for better performance and flexibility. 
* Support for browser-based rendering has also been added to avoid re-rendering. 
* The cache is cleared on page refresh.
:::

**💡How it works**:

PowerGrid will load SVG icons (using Blade) at the beginning of the request and store them in JavaScript memory (window). This is configured via the config file (`icon_resources`). JavaScript-based action processing

Actions will be processed using JavaScript instead of PHP, reducing PHP memory usage and minimizing Livewire's payload. Reduced PHP memory usage

By processing actions with JavaScript, unnecessary PHP memory usage is eliminated, resulting in more efficient performance.

---

**Example**:

When adding the icon paths, PowerGrid will keep them saved in javascript to be used in the actions.
Suppose we are using icons provided by [wireui](https://wireui.dev/), and we want to use our actions, like this:

```php [MyTable.php]
Button::make('edit')
    ->icon('solid-pencil', [
       'x-tooltip' => __('Edit'),
    ])
    ->class('btn-icon-secondary')
    ->dispatch('save', [
         'payload' => ['key' => $row->id],
    ]),
```

So, our setup will look like this:

`config/livewire-powergrid.php`
```php
    'icon_resources' => [
        'paths' => [
            'outline' => 'vendor/wireui/wireui/resources/views/components/icons/outline',
            'solid'   => 'vendor/wireui/wireui/resources/views/components/icons/solid',
        ],

        'allowed' => [
            'cog',
            'pencil',
            'arrow-right',
        ],

        'attributes' => ['class' => 'size-5'],
    ],
```

| icon_resources | list of icons (SVG) that will be loaded into javascript memory              |
|----------------|-----------------------------------------------------------------------------|
| paths          | path containing the icons                                                   |
| allowed        | Only the icons defined here will be processed. If empty, all will be loaded |
| attributes     | attributes that will be added by default to the SVG                         |

