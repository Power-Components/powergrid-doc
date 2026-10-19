---
title: Table Reference Name
description: Define a unique reference name to identify your table instance.
---

# Table Reference Name

`$tableName` identifies a table instance. Events, persist keys, cache tags, and several plugins include it in their names.

[[toc]]

## Required unique name

`public string $tableName` starts empty. `mount()` throws `TableNameCannotCalledDefault` when it is blank or the string `default`.

`php artisan powergrid:create` sets `$tableName` for you. If you write the class by hand, set it yourself. Use a unique value per table. CamelCase without spaces or special characters is a good convention.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public string $tableName = 'productTable'; // [!code ++]
}
```
