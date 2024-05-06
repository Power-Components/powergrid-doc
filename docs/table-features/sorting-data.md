# Sorting Data

This section covers how to configure Data Sorting in your Table Component.

Here you will find:

[[toc]]

## Sort by Field and Direction

To configure your Table sort field and direction, you must declare the properties `$sortField` and `$sortDirection` (`asc`/`desc`) in your Components class.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
      public string $sortField = 'name'; // [!code ++:3]

      public string $sortDirection = 'desc';
}
```

## Natural Sorting (String as Number)

Occasionally, you may need to sort alphanumeric strings in natural order, just like PHP's when using [natsort()](https://www.php.net/manual/en/function.natsort.php) function.

```plain
Standard sorting: img1.png, img10.png, img12.png, img2.png

Natural sorting:  img1.png, img2.png, img10.png, img2.png
```

To enable this feature, you must declare the property `$withSortStringNumber` as `true` in your Components class.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
      public bool $withSortStringNumber = true; // [!code ++]
}
```

## Multi Column Sorting

Sometimes, you may need to sort your Table by the combination of two or more columns.

To enable multi sorting, you must set the property `$multiSort` to `true` in your PowerGrid Table class.

Even if this feature is disabled, users can still select multiple columns by holding `shift` and clicking on different column headers.

```php
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class YourPowerGridTable extends PowerGridComponent
{
     public bool $multiSort = true;// [!code ++]
}
```
