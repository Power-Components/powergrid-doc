# Component Configuration

This section covers configurations specific to your PowerGrid Table Component.

Here you will find:

[[toc]]

## Table Name

When creating a new component, PowerGrid sets its Table name as "`default`".

At times, it may be necessary to assign a unique name to your Table. This is frequently the case when using with features such as Events, Filters, and Data Edition.

To assign a name to your Table, you must declare the property `$tableName` in your PowerGrid Table Component. You are free to enter any name. Feel free to enter any name of your choice. Using CamelCase is recommended for naming, and you must avoid spaces or special characters in the name.



Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public string $tableName = 'DishTable';// [!code ++]
}
````

## No Records Message

Sometimes, you may want to customize the generic "No Records Found" message.

This can be useful when you have more than one Table Component per page, and to provide a more personalized user experience.

To change the message, override the method `noDataLabel()` in your Component. The method can return a string or a [View](https://laravel.com/docs/views), replacing the default message.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\View\View; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function noDataLabel(): string|View // [!code ++:5]
    { 
        //return 'We could not find any dish matching your search.';
        return view('dishes.no-data');
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example of customizing <a target="_blank" href="https://demo.livewire-powergrid.com/examples/no-results-found">No Records Found</a>.</p>

</div>

## Defer Loading

Occasionally, your PowerGrid Component might take a while to load when you are working with large datasets. In this case, you might want to show a "Loading" message to improve user experience.

To enable this feature, you must declare the property `$deferLoading` as `true` in your PowerGrid Table Component. This feature uses `wire:init` behind the scenes.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public bool $deferLoading = true;// [!code ++]
}
```

If you want to customize this message, you can show a Blade Component instead of the default message. To do so, you must declare  the property `$loadingComponent` containing a View path.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public bool $deferLoading = true;// [!code ++:3]
    
    public string $loadingComponent = 'components.my-custom-loading';
}
```

In addition, it might be useful for you to disable the [Loading Icon](/table-features/header-and-footer.html#loading-icon)  when using with Defer Loading.

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example of a <a target="_blank" href="https://demo.livewire-powergrid.com/examples/defer-loading">Defer Loading</a> Table.</p>

</div>

## Actions Method

The `actions()` method enables row actions in your Component Table.

To use this method, you must have an [Action Column](/table-features/columns.html#action-column) in your Table.

Inside the `actions()` method, you have access to the `$row` (`Model`|`array`) variable.

This variable contains the rendered row's data, and it can be useful to pass data to [Row Buttons](/table-features/rows.html#buttons), for example.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function actions($row): array// [!code ++:6]
    {
        return [
            //...
        ];
    }
}
```

## Auto-Refresh

Auto-Refresh reloads your Table at regular intervals, ensuring that you always have the most up-to-date information. This may be useful when working with live data with multiple collaborators.

To implement this feature,  first set a unique [Table Name](/table-component/component-configuration.html#table-name) for your Component.

Next, proceed by creating a fresh Livewire component. Let's call it `TableRefresher` in this example.

Now, incorporate a new public method called `refreshTable()` within this component. In this method, you will dispatch the [event](/table-component/component-configuration.html#events) `eventRefresh`, suffixed with the recently configured Table name. For example, `pg:eventRefresh-DishTable`.

Finally, in the Livewire Component Blade View, you must add your [PowerGrid Table](/get-started/rendering-a-powergrid-table.html) tag inside a div that utilizes Livewire's [Wire-Poll](https://livewire.laravel.com/docs/wire-poll) technique. This technique allows for seamless updates without refreshing the page.

You can now display the Table Refresher component in your app view.

The example below will refresh the Table every 30 seconds, and it demonstrates the PowerGrid Component, the Livewire Component, and its Blade View:

::: code-group

```php [PowerGrid Component]
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public string $tableName = 'DishTable'; // [!code ++]
}
```

```php [TableRefresher Component]
// app/Livewire/TableRefresher.php

namespace App\Livewire;

use Livewire\Component;

class TableRefresher extends Component
{
    public function refreshTable()// [!code ++:4]
    {
        $this->dispatch('pg:eventRefresh-DishTable');
    }

    public function render()
    {
        return view('livewire.table-refresher');
    }
}
```

```php [TableRefresher View]
// resources/views/livewire/table-refresher.blade.php

<div wire:poll.30s="refreshTable">
    <livewire:dish-table />
</div>
```

```php [App View]
// resources/views/my-app.blade.php

<livewire:table-refresher />
```

:::

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using  <a target="_blank" href="https://demo.livewire-powergrid.com/examples/auto-refresh">Auto Refresh</a> on a Table.</p>

</div>

## Responsive Table

To improve usability in large Tables, you may use the Responsive Table feature.

Responsive Table is currently limited to the Tailwind theme and is not compatible with the [Detail Row](/table-component/component-configuration.html#detail-row) or [Inline Filters](/table-features/filters.html) features.

To enable this feature, add a call to the `PowerComponents\LivewirePowergrid\Responsive` class in your Component's `setUp()` method.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Responsive;// [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Responsive::make(),// [!code ++]
        ];
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example of a PowerGrid <a target="_blank" href="https://demo.livewire-powergrid.com/examples/responsive">Responsive Table</a>.</p>

</div>

### Fixed Columns

You may also set fixate some columns so they will not be hidden using the `fixedColumns` method.

Columns `id` and `actions` (`Responsive::ACTIONS_COLUMN_NAME`) are fixed by default.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::responsive()// [!code ++:2]
                ->fixedColumns('id', 'name', Responsive::ACTIONS_COLUMN_NAME),
        ];
    }
}
```

### Customize CSS

You may also customize the style using these specific CSS classes:

```css
.responsive-row-expand-container {}

.responsive-row-expand-item-container {}

.responsive-row-expand-item-name {}

.responsive-row-expand-item-value {}
```

## Detail Row

The Detail Row feature adds the possibility to expand and collapse each row by clicking on a button.

Expanded rows are very useful to display extra information and improve user interaction with rows, adding image, buttons, and links.

### Usage

To enable this feature, add a call to the `PowerComponents\LivewirePowergrid\Detail` class in your Component's `setUp()` method.

You must then chain the `view()` method passing a [View](https://laravel.com/docs/views) to be rendered on each line.

This View has access to your Component's rows in `$row` variable. You can also access the Component's properties and share additional data with the `params()` method. The additional data is available in the `$options` variable.

Next, you must chain the `showCollapseIcon()` method to enable the expand/collapse button. You may pass a custom icon path in the `$viewIcon` parameter.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
           PowerGrid::detail()// [!code ++:4]
                ->view('components.detail')
                ->showCollapseIcon()
                ->params(['name' => 'Luan', 'custom_data' => 'foobar']),
        ];
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using  <a target="_blank" href="https://demo.livewire-powergrid.com/examples/detail">Detail Row</a> on a Table.</p>

</div>

### Collapse Others

By default, PowerGrid will keep the open state of other details when you toggle a row using `toggleDetail`. To close the last opened row, chain the `collapseOthers()` method:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
           PowerGrid::detail()// [!code ++:5]
                ->view('components.detail')
                ->params(['name' => 'Luan', 'custom_parameter' => 'foobar'])
                ->showCollapseIcon()
                ->collapseOthers(),
        ];
    }
}
```

You can toggle the detail via the `toggleDetail` method in [Button::toggleDetail()](/table-features/button-class.html#toggledetail) or simply by calling the method `$this->toggleDetail(string $id)` passing the ID as a parameter.

## Lazy Loading

Lazy loading is a technique used to optimize content loading, especially in situations where a large amount of data needs to be displayed on a page.

The goal is to initially load only essential data and fetch additional content as needed, typically triggered by user actions such as scrolling. This approach helps improve performance and reduces the initial load sent to the server.

To enable this feature, add a call to the `PowerComponents\LivewirePowergrid\Lazy` class in your Component's `setUp()` method.

Then chain a `rowsPerChildren()` method to set the initial number of items to load in the parameter `$qty`.

In the next example, only 25 lines will be loaded initially. Additional items will be loaded automatically as the user scrolls.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::lazy()// [!code ++:2]
                ->rowsPerChildren(25),
        ];
    }
}
```

::: info 📝 NOTE
This feature does not support including other Livewire components (e.g. Actions)
:::

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example of a <a target="_blank" href="https://demo.livewire-powergrid.com/examples/lazy-load">Lazy Loading</a> Table.</p>

</div>

### Load Content

To specify the event or action that triggers the additional content chain a method `dispatchAfterToggleDetail()` to your `Lazy` class.

When calling `toggleDetail` on the child component, `toggleDetailFromChild` will be sent to the parent containing two parameters: `id` and `state`.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]
use Livewire\Attributes\On;// [!code ++]

class DishTable extends PowerGridComponent
{
        public function setUp(): array
    {
        return [
            PowerGrid::lazy()// [!code ++:3]
                ->rowsPerChildren(25)
                ->dispatchAfterToggleDetail('toggleDetailFromChild'),
        ];
    }

    #[On('toggleDetailFromChild')]// [!code ++:6]
    public function toggleDetailFromChild(string $id, string $state): void
    {
        // $id: $row->id
        // $state: 'false' or 'true'
    }
}
```

## Persist

The persist feature saves the state of `columns`, `sorting`, and `filters` so they can be reused in the future when the Table is loaded again.

To enable this feature, you must add a call to the method `persists()` in your Component's `setup()` method.

Then, you must specify which items you want to persist in the parameter `$tableItems`. To make the state identifiable, pass a unique value to the `$prefix` parameter. This might be useful if you need to save the state for each user in your app.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->persist(// [!code ++:4]
                tableItems: ['columns', 'filters', 'sort'], 
                prefix: auth()->id
        );
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example of a <a target="_blank" href="https://demo.livewire-powergrid.com/examples/persist">Persist</a> Table.</p>

</div>

The state data can be stored  in either cookies or session, depending on the [Persist Drive](/get-started/powergrid-configuration.html#persist-driver) configuration. However, you may customize the Persistent Drive settings for each component using Laravel's [`config()`](https://laravel.com/docs/helpers#method-config) helper within the Component's `boot()` method.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function boot(): void// [!code ++:4]
    {
        config(['livewire-powergrid.persist_driver' => 'session']);
    }
}
```

## Cache

Large queries or several Table joins might impact your Component's performance. In these situations, it might be useful to cache your Table's data.

This section will cover how to use Laravel's [Cache](https://laravel.com/docs/cache) feature in your PowerGrid Component.

### Cache Usage

To use Cache, call the `LivewirePowerGrid\Cache` class in your Component's `setup()` method and proceed to configure it chaining the [Cache Methods](/table-component/component-configuration.html#cache-methods).

By default, PowerGrid will create a Tag for each Table with the format: `powergrid-{modelName}-{tableName}`.

The next example demonstrates how to use Cache in your Component, prefixing the default PowerGrid key with the user ID.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class DishTable extends PowerGridComponent
{
    public function setUp(): array
    {        
        return [
           PowerGrid::cache() // [!code ++:3]
              ->ttl(60) // [!code ++:3]
              ->prefix(auth()->id . '_'),  //result: 1_powergrid-dish-DishTable
        ]
    }
}
```

You may also use your own custom tag, as demonstrated below.

```php
use PowerComponents\LivewirePowerGrid\Cache;

public function setUp(): array
{        
    return [
        PowerGrid::cache()// [!code ++:3]
           ->ttl(60) // [!code ++:3]
           ->customTag('my-custom-tag'),
    ]
}
```

### Clearing cache

It is strongly advised to clean the cache every time the [Eloquent Model](https://laravel.com/docs/eloquent) is changed. This prevents serving stale content.

You can read about [removing cache items](https://laravel.com/docs/10.x/cache#removing-tagged-cache-items) in Laravel's documentation.

The example below shows how to configure your Model as advised. Note that you must use the same `tag` as you set in your Component.

```php
//app/Models/Dish.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Dish extends Model
{
    protected static function booted(): void// [!code ++:12]
    {
        static::created(fn (Dish $dish) => self::clearCache());
        static::updated(fn (Dish $dish) => self::clearCache());
        static::deleted(fn (Dish $dish) => self::clearCache());
    }

    private static function clearCache(): void
    {
        //Clear the PowerGrid cache tag
        Cache::tags([auth()->id .'-powergrid-dish-DishTable'])->flush();
    }
}
```

### Cache Methods

Here you can find all the methods available in the `LivewirePowerGrid\Cache` class.

| Method                   | Description                                               |
|--------------------------|-----------------------------------------------------------|
| `ttl()`  (required)      | Maximum time in seconds for which the data can be cached. |
| `customTag()` (optional) | Allows you to set a custom cache tag.                     |
| `prefix()` (optional)    | Sets a prefix for the cache tag.                          |
| `disabled()`(optional)   | Disables cache.                                           |

## Events

### Predefined Events

By default, PowerGrid's Event Listener is listening to the following events.

You must configure the [Table Name property](/table-component/component-configuration.html#table-name) when working with more than one component to ensure your events are identifiable.

```php
    protected function getListeners()
    {
        return [
            'pg:datePicker-'   .  $this->tableName  => 'datePickerChanged',
            'pg:editable-'     .  $this->tableName  => 'inputTextChanged',
            'pg:toggleable-'   .  $this->tableName  => 'inputTextChanged',
            'pg:multiSelect-'  .  $this->tableName  => 'multiSelectChanged',
            'pg:toggleColumn-' .  $this->tableName  => 'toggleColumn',
            'pg:eventRefresh-' .  $this->tableName  => '$refresh',
        ];
    }
```


### Custom events

If you need to add a custom event to your PowerGrid Table, just override the method `getListeners()`, merging your custom events with PowerGrid's [Predefined Events](/table-component/component-configuration.html#predefined-events).

```php
    protected function getListeners(): array
    {
        return [
            'edit-dish'        => 'editDish',
            'delete-dish'      => 'deleteDish',
            'clicked-on-dish'  => 'clickedOnDish',
            ...parent::getListeners()
        ];
    }
```
