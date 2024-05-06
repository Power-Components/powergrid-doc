# Rendering a PowerGrid Table

This section covers how to render your PowerGrid Component in a Blade View.

Here you will find:

[[toc]]

## Blade View

### HTML Tag

To display your PowerGrid Table, you can use the `<livewire>` tag as demonstrated below.

Following our example of `DishTable` (`app/Livewire/DishTable.php`), we will use:

```php
// resources/views/my-view.blade.php

<livewire:dish-table /> // [!code ++]
```

### Blade Directive

Alternatively, you can use the Livewire Blade directive.

```php
// resources/views/my-view.blade.php

@livewire('dish-table') // [!code ++]
```

### Component in sub-folder

If your PowerGrid Table lives in a sub-folder, just indicate its path using dot notation.

The next example uses the class `app/Livewire/Tables/DishTable.php` as reference:

```php
// resources/views/my-view.blade.php

<livewire:tables.dish-table /> // [!code ++]
```

## Component Attributes

### Passing Attributes

You can pass data to your PowerGrid Table using the `<livewire>` tag and HTML attributes.

In the next example, we are passing the `tableName` attribute to avoid conflict between two PowerGrid Components.

```php
// resources/views/my-view.blade.php

<livewire:dish-table tableName="table1" /> // [!code ++:3]

<livewire:dish-table tableName="table2" />
```

### Passing Custom Attributes

To pass a custom attribute, you must declare it as a `public` property in your PowerGrid Table Component.

```php
// app/Livewire/DishTable.php

class DishTable extends PowerGridComponent
{
    //Custom attribute currency
    public string $currency; // [!code ++]
}
```

Then, you can just include it in your HTML tag, as demonstrated below.

```php
// resources/views/my-view.blade.php

<livewire:dish-table> // [!code --]
<livewire:dish-table currency="USD"/> // [!code ++]
```
