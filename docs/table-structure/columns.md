---
title: Table Columns
description: Make your columns beautiful and useful. Control alignment, wrap text, truncate long descriptions, and toggle visibility to give users a clean interface.
---

# Table Columns

[[toc]]

## Defining Columns

After defining your [DataSource Fields](/table-structure/datasource.html#defining-datasource-fields), return an array of `Column` definitions from `columns()`. Use `Column::add()` (chain `title()` and `field()`) or `Column::make($title, $field, $dataField = '')`. Then chain the [configuration methods](#configuring-columns) you need.

### Add Column

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function columns(): array// [!code ++:16]
    {
        return [
            Column::add()
                ->title('ID')
                ->field('id'),

            Column::add()
                ->title('Product name')
                ->field('name'),

            Column::add()
                ->title('Price')
                ->field('price'),
        ];
    }
}
```

### Make Column

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function columns(): array// [!code ++:16]
    {
        return [
            Column::make(title: 'ID', field: 'id'),

            Column::make(title: 'Product name', field: 'name'),

            Column::make(title: 'Price', field: 'price'),
        ];
    }
}
```

## Defining Relationship-Based Columns

When using [Database Relationships](/table-structure/datasource.html#loading-relationships), pass `$dataField` so search, filters, and sorting hit the original database column. Available on both `Column::add()->field()` and `Column::make()`.

This example creates a [custom field](/data-management/formatting-data.html#transforming-data) `kitchen_name` from the `kitchen` relation, and sets `dataField` to `kitchens.name`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('kitchen_name', fn (Product $product) => e($product->kitchen->name));
    }

    public function columns(): array// [!code ++:8]
    {
        return [
            Column::add()
                ->title('Kitchen Name')
                ->field(field: 'kitchen_name', dataField: 'kitchens.name'),
        ];
    }
}
```

## Working With Custom Fields

[Custom Fields](/data-management/formatting-data.html#transforming-data) transform values (formatting, calculations, combining columns). Pass `$dataField` so search, filters, and sorting use the mapped database column.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\Column;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('name_uppercase', fn ($product) => strtoupper(e($product->name)));
    }

    public function columns(): array // [!code ++:10]
    {
        return [
            Column::make(
                    title: 'Product Uppercase',
                    field: 'name_uppercase',
                    dataField: 'products.name'
                ),
        ];
    }
}
```

## Formatting Data in Columns

See [Formatting Data](/data-management/formatting-data.html).

## Configuring Columns

[[sub-toc]]

### Column Title

`title()` sets the header label. HTML is allowed (for example a font icon).

| Parameters      |
| --------------- |
| (string) $title |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->title('Product Price'),
```

```php [app/Livewire/ProductTable.php]
 Column::add()
    ->title('<i class="fas fa-low-vision" title="Visibility"></i>')
```

### Column Field

`field()` links the column to a [DataSource](/table-structure/datasource.html) field.

| Parameter           | Description                                              |
| ------------------- | -------------------------------------------------------- |
| (string) $field     | [DataSource](/table-structure/datasource.html) field     |
| (string) $dataField | Database table and field in dot notation (optional)      |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->field('name'),
```

`$dataField` is required for [joins](/table-structure/datasource.html#loading-relationships) and custom fields:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->field('name', 'products.name'),

Column::add()
    ->field('category_name', 'categories.name'),
```

### Column Placeholder

`placeholder()` sets the placeholder for the [Filter](/table-structure/filters.html) input.

| Parameter             |
| --------------------- |
| (string) $placeholder |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->placeholder('Enter the name'),
```

### Searchable Column

`searchable()` includes the column in the [Search Input](/table-structure/header-and-footer.html#search-input). See [Searching Data](/data-management/searching-data.html).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->searchable(),

Column::make('Kitchen', 'kitchen_name', 'kitchens.name')
    ->searchable(),
```

::: info
Pass `$dataField` for custom fields and joined relationships.
:::

### Raw Searchable Column

`searchableRaw()` searches with a RAW SQL `LIKE` expression. The `?` binding is the table search term wrapped in `%`.

```php [app/Livewire/ProductTable.php]
Column::make('Production date', 'produced_at_formatted', 'produced_at')
    ->searchableRaw('DATE_FORMAT(products.produced_at, "%d/%m/%Y") like ?'),
```

### JSON Searchable Column

`searchableJson($tableName)` runs a case-insensitive `LIKE` on the column (useful for JSON text). Pass the table name, or `''` to omit it.

```php [app/Livewire/ProductTable.php]
Column::make('Additional', 'additional')
    ->searchableJson('products'),
```

### Sortable Column

`sortable()` adds the sort control to the column header. See [Sorting Data](/data-management/sorting-data.html).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->sortable(),

Column::make('Kitchen', 'kitchen_name', 'kitchens.name')
    ->sortable(),
```

::: info
Pass `$dataField` for custom fields and joined relationships.
:::

### Custom Sort

`sortUsing()` sets a sort callback and enables sorting. For Eloquent/Query Builder the callback receives the query and direction; for a Collection it receives the collection and direction, and must return the sorted collection.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Price', 'price')
    ->sortUsing(function ($query, string $direction) {
        $query->orderByRaw("price IS NULL, price {$direction}");
    }),
```

### Natural Sort

`naturalSort(true)` sorts alphanumeric strings in natural order (`img2` before `img10`). See [Natural Sorting](/data-management/sorting-data.html#natural-sorting-string-as-number).

```php [app/Livewire/ProductTable.php]
Column::make('Image', 'image')
    ->naturalSort(true),
```

### Column Align

`align()` sets header and cell alignment. Accepted values: `start`, `left`, `center`, `right`, `end`. Default is `left`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Price', 'price')
    ->align('end'),
```

### Fixed On Responsive Mode

`fixedOnResponsive()` keeps the column visible in a [Responsive Table](/performance-and-look/responsive-layout.html).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->fixedOnResponsive(),
```

### Display Row Index

`index()` renders the row's 1-based position on the current page instead of the field value. Use a dedicated column:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::add()
    ->index(),

Column::make('#', 'id')
    ->index(),
```

### Hide Column

`hidden()` hides the column in the table view.

| Parameter             | Description                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| (bool) $isHidden      | When `true`, hides the column from view but not from the Hide/Show toggle button    |
| (bool) $isForceHidden | When `true`, removes the column from the Hide/Show toggle button                    |

Both default to `true`. `->hidden()` with no arguments hides the column and removes it from the toggle.

This example hides "Product Name" from the view, but the user can still show it from the toggle:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->hidden(isHidden: true, isForceHidden: false),
```

This example also removes it from the toggle:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->hidden(isHidden: true, isForceHidden: true),
```

### Truncate and Tooltip

`limit()` truncates the displayed value, and `tooltip()` shows the full value on hover. Both come from the built-in `TruncatePlugin`.

| Method      | Parameters                                             | Description                      |
| ----------- | ------------------------------------------------------ | -------------------------------- |
| `limit()`   | `(int) $characters`, `(string) $end = '...'`           | Truncate the displayed value     |
| `tooltip()` | `(bool) $enabled = true`, `(string) $position = 'top'` | Show the full value in a tooltip |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Description', 'description')
    ->limit(24)
    ->tooltip(),
```

Flux uses `<flux:tooltip>`. Other themes use a shared Alpine tooltip with a native `title` fallback. See [Plugins](/extending/plugin-system.html#truncateplugin).

### Export Data Visibility

`visibleInExport()` controls whether the column is included when [Exporting Data](/data-management/exporting-data.html).

| Parameter       | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| (bool) $visible | `true` includes the column, `false` excludes it.                |

Hidden columns and [Action Columns](#action-column) are excluded by default.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product price', 'price')
    ->hidden()
    ->visibleInExport(true), // hidden in the grid, included in the file
```

### Header Attribute Classes

`headerAttribute()` adds a class or style to the column header.

| Parameter           | Description |
| ------------------- | ----------- |
| (string) $classAttr | HTML class  |
| (string) $styleAttr | HTML style  |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->headerAttribute('text-center', 'color:red')
```

### Body Attribute Classes

`bodyAttribute()` adds a class or style to every cell in this column.

| Parameter           | Description |
| ------------------- | ----------- |
| (string) $classAttr | HTML class  |
| (string) $styleAttr | HTML style  |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->bodyAttribute('text-center', 'color:red')
```

### Content Class Field

`contentClassField()` uses the given [DataSource](/table-structure/datasource.html) field as the cell `<span>` class.

| Parameter           | Description                                          |
| ------------------- | ---------------------------------------------------- |
| (string) $dataField | [DataSource](/table-structure/datasource.html) field |

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

Column::make('Product name', 'name')
    ->contentClassField('status_class')
```

### Content Classes

`contentClasses()` wraps the cell content in a `<span>` with the given CSS class.

When passing an `array`, PowerGrid matches the `key` against the column content and applies the corresponding class.

| Parameter                      | Description                             |
| ------------------------------ | --------------------------------------- |
| (array,string) $contentClasses | Column content => CSS class assignments |

```php [app/Livewire/ProductTable.php]
Column::make('Product name', 'name')
    ->contentClasses('text-blue-600');

Column::make('Product Availability', 'availability')
    ->contentClasses([
          'available'    => 'text-green-600',
          'out-of-stock' => 'text-red-600'
     ]);
```

### Row Template

`template()` plus `rowTemplates()` interpolates a named HTML snippet on the server. Values are escaped; markup in the template is kept. This avoids rendering a Blade view per cell.

Return an array from the field closure: the key is the template name, the value is the placeholder map.

```php [app/Livewire/ProductTable.php]
public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('id')
        ->add('name', function ($row) {
            return [
                'template-name' => [ // [!code ++]
                    'id'   => $row->id, // [!code ++]
                    'name' => $row->name, // [!code ++]
                ], // [!code ++]
            ];
        });
}

public function columns(): array
{
    return [
        Column::make('ID', 'id')
            ->searchable()
            ->sortable(),

        Column::make('Name', 'name')
            ->template() // [!code ++]
            ->searchable()
            ->sortable(),
    ];
}

public function rowTemplates(): array // [!code ++]
{ // [!code ++]
    return [ // [!code ++]
        'template-name' => '<div id="custom-{{ id }}" class="bg-red-100 py-1 rounded px-3">{{ name }}</div>', // [!code ++]
    ]; // [!code ++]
} // [!code ++]
```

Placeholders use `{{ key }}`. Missing template names render nothing.

### Edit On Click and Toggleable

`editOnClick()` and `toggleable()` are plugin macros. See [Editing Data](/data-management/editing-data.html).

## Show/Hide Columns

See [Toggle Column Visibility](/table-structure/header-and-footer.html#toggle-column-visibility) for the header button. Use [`hidden()`](#hide-column) to hide a column in code, and [Exclude Columns From Exporting](/data-management/exporting-data.html#excluding-columns-from-export) to omit columns from export files.

## Responsive Fixed Columns

With [Responsive Layout](/performance-and-look/responsive-layout.html), `PowerGrid::responsive()->fixedColumns()` replaces the default fixed list (`id`, `checkbox`, and `actions`). Pass every field you want to keep visible.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::responsive()// [!code ++:2]
                ->fixedColumns('id', 'name', 'actions'),
        ];
    }
}
```

You can also mark a column with [`fixedOnResponsive()`](#fixed-on-responsive-mode).

## Action Column

`Column::action()` is a dedicated column for [Row Buttons](/table-structure/row-buttons.html). You can add it more than once and at any position. Action columns are omitted from exports unless you call [`visibleInExport(true)`](#export-data-visibility).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
   public function columns(): array
    {
        return [
            Column::make('ID', 'id'),
            Column::make('Name', 'name'),
            Column::action('Action'), // [!code ++]
        ];
    }
}
```

## Aggregating Data

Chain `summarize('sum'|'count'|'avg'|'min'|'max', $label, header:, footer:)` for built-in aggregates, or `withSummary()` for a custom closure. See [Summarizing Data](/data-management/summarizing-data.html).

```php [app/Livewire/ProductTable.php]
Column::make('Price', 'price')
    ->summarize('sum', 'Sum Price', header: true, footer: false),
```

## Custom Macros

Register a Column macro in `AppServiceProvider::boot()` when you need extra query logic.

```php [app/Providers/AppServiceProvider.php]
use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

public function boot(): void
{
    Column::macro('searchableDateFormat', function () {
        $this->rawQueries[] = [
            'method'   => 'orWhereRaw',
            'sql'      => 'DATE_FORMAT('.$this->dataField.', "%d/%m/%Y") like ?',
            'bindings' => ['%{search}%'],
            'enabled'  => function (PowerGridComponent $component) {
                return filled($component->search);
            },
        ];

        return $this;
    });
}
```

```php [app/Livewire/ProductTable.php]
 Column::make('Created At', 'created_at')
     ->searchableDateFormat(),
```

| Key        | Description                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `method`   | Query builder method, for example `orWhereRaw`.                                                      |
| `sql`      | SQL passed to that method. `{sortDirection}` is replaced; other `{placeholders}` are left in SQL.    |
| `bindings` | Bound values. Closures receive the component. Strings may use `{search}` and other component properties. |
| `enabled`  | `true` or a closure. The query runs only when this is true.                                          |
