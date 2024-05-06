# Pagination

This section covers Pagination

Here you will find:

[[toc]]

## Introduction

Pagination is a useful technique for dividing large datasets into smaller, more manageable chunks known as pages.

PowerGrid Components come with built-in pagination functionality. All you need to do is configure the number of [Records Per Page](/table-features/pagination.html#records-per-page), and pagination will be readily available.

On this page, you can find information on customizing pagination settings. You may also visit the [Personalizing the Footer](/table-features/header-and-footer.html#personalizing-header-footer) page to further customize your PowerGrid Table.

## Pagination (Records Per Page)

PowerGrid includes an easy-to-configure built-in Pagination system.

To enable pagination, you must add a call to the `Footer::make()` class in your Component's `setUp()` method. Then, proceed to chain the `showPerPage()` method to the `Footer` class.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++]
                 ->showPerPage(perPage: 10, perPageValues: [0, 50, 100, 500]), // [!code ++]
        ];
    }
}
```

Additionally, you may also configure the default items per page by passing the parameter `$perPage`.

To configure the dropdown menu options, pass an array with values as the `$perPageValues` parameter. The value `0` represents the "show all" option.

## Disable Pagination

To disable pagination, you can simply remove the method `showPerPage()` from the `Footer::class`.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer;   

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++]
                 ->showPerPage() // [!code --]
                 ->showRecordCount(mode: 'full'), // [!code ++]
        ];
    }
}
```

## Record Count

Displays the record count in the Table Footer.

To enable this feature, you must add a call to the `Footer::make()` class in your Component's `setUp()` method. Then, proceed to chain the `showRecordCount()` method to the `Footer` class.

You may change the record count style passing the `$mode` parameter. See the mode list below:

| Mode  | Description                                                |
|-------|------------------------------------------------------------|
| full  | Full sentence: *Showing 1 to 10 of 100 Results*            |
| short | Short:   *1 - 10 │ 100*                                    |
| min   | Minimal: *1 - 10*                                          |

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++]
                 ->showRecordCount(mode: 'full'), // [!code ++]
        ];
    }
}
```

## URL Page Parameter

Sometimes, you may need to change the default URL page parameter (`?page=`). This is useful, for example, when you are working with two PowerGrid Components on the same page and must avoid collisions between the two paginators.

The example below shows how to use a different pageName for each component.

The component "Customer Page", configured to use ?customerPage=:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++:2]
                ->pageName('dishPage'),
        ];
    }
}
```

```php
// app/Livewire/UserTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer; // [!code ++]

class UserTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++:2]
                ->pageName('usersPage'),
        ];
    }
}
```

The blade view will look similar to this:

```php
// resources/views/my-view.blade.php

<div>
    <livewire:customers-table />
    <livewire:users-table />
</div>
```

Consequently, the page url will have both page names:  `http://myapp.test/?dishPage=2&usersPage=5`

## Custom Pagination Component

To use a custom component for pagination, proceed to chain the methods `showPerPage()`, `showRecordCount()`, and the `pagination()` to the `Footer::make()` class call.

You must pass a view to the parameter `$viewPath` to the `pagination()` method.

Your custom component will have access to the `$perPage` and `$perPageValues` properties.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Footer; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()// [!code ++]
                ->showPerPage(25)// [!code ++]
                ->showRecordCount()// [!code ++]
                ->pagination(viewPath: 'components.pagination'),// [!code ++]
        ];
    }
}
```

:::info 🌎 Online Demo
See an interactive example of [Custom Pagination Component](https://demo.livewire-powergrid.com/examples/custom-theme).
:::
