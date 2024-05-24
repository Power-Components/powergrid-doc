# Publish Views

This section covers publishing PowerGrid views.

Here you will find:

[[toc]]

## Introduction

Just like in any Laravel package, PowerGrid views are publishable and may be customized to fit your needs.

PowerGrid Blade Views are more complex than standard HTML-CSS template files. These files contain application code and logic that is regularly updated to introduce new features and address bugs.

In short, publishing views means that PowerGrid original Blade views will be copied from PowerGrid's `vendor` directory into the directory `resources/views/vendor/livewire-powergrid`.

As a consequence, from this point on, your application will load the copied version, which remains **unchanged/outdated**, instead of the latest version from PowerGrid.

## Publishing Views

::: danger ❗ WARNING

Be aware that publishing Blade views may result in **BREAKING CHANGES** to your application.

**DO NOT proceed** if you don't have a clear understanding of the potential risks involved.
:::

To publish views, run the command:

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```
