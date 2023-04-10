# Features Setup

The `setup()` method controls the general resources present in your Table by separate action type within the table (Header, Footer, Exportable, ...)

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

Example of usage:

```php{7}
//..
use PowerComponents\LivewirePowerGrid\Header;
use PowerComponents\LivewirePowerGrid\Footer;

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->showToggleColumns()
             ->showSearchInput(),

         Footer::make()
             ->showPerPage()
             ->showRecordCount(),
     ];
}
```

You can chain the methods to configure the following features:

### showCheckBox

Enables and displays checkboxes on each table row.

If your database table has a custom id column, you must pass the column name in the `$attribute` argument.

Example:

```php{3}
public function setUp(): array
{
    $this->showCheckBox();
    //$this->showCheckBox('my_custom_table_id);

}
```

Result:
![Output](/_media/examples/features/showCheckBox.png)

---
# Header

Here are some actions for the table header defined inside `setup`:

* showSearchInput
* showToggleColumns 
* includeViewOnTop
* includeViewOnBottom

## Header

### showSearchInput

Enables the search functionality and show the search input field at the page top.

```php{8-9}
use PowerComponents\LivewirePowerGrid\Header 

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->showSearchInput(),

         // ...
     ];
}
```

Result:
![Output](/_media/examples/features/showSearchInput.png)

---

### showToggleColumns

Displays the button to hide/show (toggle) columns.

> Works fine without inline filters
Example:

```php{8-9}
use PowerComponents\LivewirePowerGrid\Header 

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->showToggleColumns(),

         // ...
     ];
}
```

Result:

![Output](/_media/examples/features/showToggleColumns.png)

---

### includeViewOnTop

Sometimes we need to reuse the current scope of the table using @include instead of using events.

```php{8-9}
use PowerComponents\LivewirePowerGrid\Header 

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->includeViewOnTop('components.datatable.header-top'),

         // ...
     ];
}
```

> Inside the view you can use the component's variables

`view/components/datatable/header-top.blade.php`
```html 
<div>
    Table: {{ $tableName}}
</div>
```

Result:

![Output](/_media/examples/features/header-includeViewOnTop.png)

---

### includeViewOnBottom

Sometimes we need to reuse the current scope of the table using @include instead of using events.

```php{8-9}
use PowerComponents\LivewirePowerGrid\Header 

public function setUp(): array
{
    $this->showCheckBox();

     return [
         Header::make()
             ->includeViewOnBottom('components.datatable.header-bottom'),

         // ...
     ];
}
```

> Inside the view you can use the component's variables

`view/components/datatable/header-bottom.blade.php`
```html 
<div>
    Table: {{ $tableName}}
</div>
```

Result:

![Output](/_media/examples/features/header-includeViewOnBottom.png)

### withoutLoading

If you don't want to display PowerGrid's default **loading** icon when some request is made to the server, just
call `withoutLoading()` on Header Facade. 

This is useful when you already have a layout to show the progress of internal calls, for example [Defer Loading](../table/component-settings.html#defer-loading).

```php{7}
use PowerComponents\LivewirePowerGrid\Header 

public function setUp(): array
{
     return [
         Header::make()
             ->withoutLoading(),

         // ...
     ];
}
```

Result:

![Output](/_media/examples/without-loading.png)


---

## Footer

Here are some actions for the table footer defined inside `setup`:
* > showPerPage, showRecordCount, pagination,  includeViewOnTop and includeViewOnBottom 


### showPerPage

Shows a dropdown menu for selecting the number of rows displayed per page (default: 10).

By default, `$perPage` accepts the values: `10`, `25`, `50`, `100` and `0` (zero represents "show all").

If you need a different set of values, you may override the `$perPageValues` array. See the following example:

```php{6,9,14-15}
use PowerComponents\LivewirePowerGrid\Footer 

class DishesTable extends PowerGridComponent
{
    //Custom per page
    public int $perPage = 5;
    
    //Custom per page values
    public array $perPageValues = [0, 5, 10, 20, 50];

    public function setUp(): array
    {
        return [
            Footer::make()
                ->showPerPage($this->perPage, $this->perPageValues)
            //....    
        ]   
    }
}
```

Result:

![Output](/_media/examples/features/showPerPage.png)

---

### showRecordCount

Shows the record count at the page bottom.

Available modes:

- **full** (default): Full sentence. E.g., `Showing 1 to 10 of 100 Results`.
- **short**: Only numbers including total. E.g, `1 - 10 | 100`.
- **min**: Only numbers, without total. E.g., `1 - 10`

Example:

```php{8-9}
use PowerComponents\LivewirePowerGrid\Footer 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()
                ->showRecordCount(mode: 'full')
            //....    
        ]   
    }
}
```

Result:

![Output](/_media/examples/features/showRecordCount.png)

---

### Pagination

Sometimes we need to customize the pagination of the table, for that do:

```php{8-11}
use PowerComponents\LivewirePowerGrid\Footer 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()
                ->showPerPage(25)
                ->showRecordCount()
                ->pagination('components.pagination'),
            //....    
        ]   
    }
}
```

::: tip
Inside the view you can use the paginator `variables, perPage and perPageValues` to build the footer

**NOTE:** need use methods `->showPerPage(25)->showRecordCount()` 
::: 

`views/components/pagination.blade.php`

```html 
<div class="w-full">
    @if ($paginator->hasPages())
    // ..
    
    @endif
</div>
```

Result:

![Output](/_media/examples/features/pagination.png)

---

### includeViewOnTop

Sometimes we need to reuse the current scope of the table using @include instead of using events.

```php{8-9}
use PowerComponents\LivewirePowerGrid\Footer 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()
                ->includeViewOnTop('components.datatable.footer-top')
            //....    
        ]   
    }
}
```

::: tip
> Inside the view you can use the component's variables
:::

`views/components/datatable/footer-top.blade.php`
```html 
<div>
    Table: {{ $tableName}}
</div>
```

Result:

![Output](/_media/examples/features/footer-includeViewOnTop.png)

---

### includeViewOnBottom

Sometimes we need to reuse the current scope of the table using @include instead of using events.

```php{8-9}
use PowerComponents\LivewirePowerGrid\Footer 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            Footer::make()
                ->includeViewOnBottom('components.datatable.footer-bottom')
            //....    
        ]   
    }
}
```

::: tip
Inside the view you can use the component's variables
::: 

`views/components/datatable/footer-bottom.blade.php`

```html 
<div>
    Table: {{ $tableName}}
</div>
```

Result:

![Output](/_media/examples/features/footer-includeViewOnBottom.png)

---
## Exportable

Enable the `export to file` functionality and shows export button at the page top.

Set the filename inside the `make('')` method and proceed configuring your exporting settings:

```php{7-9}
use PowerComponents\LivewirePowerGrid\Exportable 

class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        Exportable::make('my-export-file')
            ->striped('#A6ACCD')
            ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
    }
}
```

---

### File Types

Available file types:

- *excel - Exportable::TYPE_XLS* 
- *csv - Exportable::TYPE_CSV*

Example:

```php
->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

---

### CSV Separator and Delimiter

When exporting to CSV, you may configure the `field separator` and `field delimiter`:


```php
    Exportable::make('my-export-file')
        ->csvSeparator('|')
        ->csvDelimiter("'")
        ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

Resulting in :

```plain
ID|Dish
1|'Pastel de Nata'
2|'Peixada da chef Nábia'
3|'Carne Louca'
```

---

### Striped 

You can also pass the `striped` parameter with the name of the color to be generated with striped lines.

Example:

```php
->stripe('A6ACCD'),
```

Result:

![Output](/_media/examples/features/showExportOption.png)

--- 

### Column width

Specify column and size if you need to increase [column width](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#column-widths) on export.

> XLSX only

Example:

```php
->columnWidth([
    2 => 30,
    4 => 20,
]),
```

> 💡 If you are working with lots of data, we recommend to use [Queue Export](queue-export).

---

## Persist

If you need the state of columns and filters to be saved in cookies, you can use the persist method.

Example:

```php{5}
class DishesTable extends PowerGridComponent
{
    public function setUp(): array
    {
        $this->persist(['columns', 'filters']);
        
        return [
            // ..
        ];   
    }
}
```

Result:

![Output](/_media/persist.gif)

---

## Multi Sorting

PowerGrid v4 allows you to choose multiple columns to sort by.

To enable multi sorting, you must set the property `$multiSort` to `true` in your PowerGrid table class.

Additionally, even if disabled, multi sorting can be achieved by holding shift and clicking on different columns.

```php
use PowerComponents\LivewirePowerGrid\Traits\WithExport;

final class YourPowerGridTable extends PowerGridComponent
{
     public bool $multiSort = true;
}
```

Multi-sorting behaves like chaining several `->orderBy(...)->orderBy(...)` [Laravel Eloquent](https://laravel.com/docs/9.x/eloquent) methods.

---

## Cache

Sometimes we want to retrieve the same data that was recently displayed in a previous query and we don't want this to consume a new query request in the database because sometimes this can be time consuming, for example when we have a large query or using joins of several tables.

For this, we can use the [Cache](https://laravel.com/docs/10.x/cache) technology already built into Laravel and implemented in Powergrid.

This allows recording the same data when filtering, searching for something in the global search, changing pages or even ordering the table without having to query the database again for the same information.

### Cache Usage

```php{8-10}
use PowerComponents\LivewirePowerGrid\Cache;

public function setUp(): array
{
   $companyId = user()->company_id; // 233  
   
   return [
       Cache::make()
          ->forever(),
          ->prefix($companyId. '_') // tag generate: 233_powergrid-users-validationTable
         //->customTag('my-custom-tag')
   ];
}
```
### Methods

| Method        |                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `forever()`   | Create a cache using the [rememberForever](https://laravel.com/docs/10.x/cache#retrieve-store) method                                           |
| `ttl()`       | Time in seconds that the cache will be available                                                                                                |
| `customTag()` | By default, PowerGrid will create a Tag for each table like this example: `powergrid-users-validationTable` : powergrid-{modelName}-{tableName} |
| `prefix()`    | Prefix of the 'Key' that will be used in the Cache.                                                                                             |
| `disabled()`  | disable the cache                                                                                                                               |

### Clear cache

it is recommended to always [clear the cache](https://laravel.com/docs/10.x/cache#removing-tagged-cache-items) whenever the model is updated.

Ex:

```php{14}
namespace App\Models;

class User 
{
	protected static function booted(): void
    {
        static::created(fn (User $user) => self::clearCache());
        static::updated(fn (User $user) => self::clearCache());
        static::deleted(fn (User $user) => self::clearCache());
    }

    private static function clearCache(): void
    {
        Cache::tags([user()->company_id.'-powergrid-users-validationTable'])->flush();
    }
}
```
