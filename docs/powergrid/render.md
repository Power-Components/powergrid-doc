---
title: Render PowerGrid Tables
description: Include a PowerGrid table with a Livewire tag, @livewire, a route, or multiple tables on one page.
---

# Render PowerGrid Tables

[[toc]]

PowerGrid tables are Livewire components. Render them in a Blade view or from a route.

## Blade View

### HTML Tag

For `app/Livewire/ProductTable.php`:

```php [resources/views/my-view.blade.php]
<livewire:product-table />
```

### Blade Directive

```php [resources/views/my-view.blade.php]
@livewire('product-table')
```

### Component in sub-folder

For `app/Livewire/Tables/ProductTable.php`:

```php [resources/views/my-view.blade.php]
<livewire:tables.product-table />
```

## Routes File

```php [routes/web.php]
Route::get('/product', ProductTable::class)->name('product-table');
```

## Multiple Tables per page

Give each table a unique `$tableName`. See [Table Reference Name](/performance-and-look/table-reference-name.html).

If pagination is on, set a distinct `?page=` name per table. See [URL Page Parameter](/table-structure/pagination.html#url-page-parameter).

```php [resources/views/my-view.blade.php]
<livewire:product-table />

<livewire:user-table />
```

## Component Attributes

### Passing Attributes

`tableName` is a public property on the component:

```php [resources/views/my-view.blade.php]
<livewire:product-table tableName="ProductTable" />

<livewire:user-table tableName="UserTable" />
```

`$tableName` cannot be empty or `default`.

### Passing Custom Attributes

Declare a matching `public` property on the table:

```php [app/Livewire/ProductTable.php]
class ProductTable extends PowerGridComponent
{
    public string $currency;
}
```

```php [resources/views/my-view.blade.php]
<livewire:product-table currency="USD" />
```

## Defer Loading

See [Defer Loading](/performance-and-look/defer-loading.html).
