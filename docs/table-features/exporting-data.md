# Exporting Data

This section covers the PowerGrid Data Export functionality.

Here you will find:

[[toc]]

## Enable Data Export

To enable Data Exporting, follow the steps described below.

### 1. Add the WithExport Trait

First, add the `WithExport` Trait to your PowerGrid Component, as illustrated in the example below.

```php{4}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Traits\WithExport;  // [!code ++]

class DishTable extends PowerGridComponent
{
    use WithExport; // [!code ++]
}
```

### 2. Configure the Export Feature

Next, add a call to `Export::make()`  in your Component's `setUp()` method. You must provide the parameter `$fileName`, with the desired output file name.

To configure the feature, proceed to chain to `make()` as many [Data Export Configuration Methods](/table-features/exporting-data.html#data-export-configuration-methods) as you need.

```php{5,11,12,13,14,15}
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Traits\WithExport;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable; // [!code ++]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class DishTable extends PowerGridComponent
{
    use WithExport;

    public function setUp(): array
    {
        PowerGrid::exportable(fileName: 'my-export-file') // [!code ++]
            ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV), // [!code ++]
    }
}
```

The example above illustrates the Exportable featured enabled for Microsoft Excel and CSV files.

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using <a target="_blank" href="https://demo.livewire-powergrid.com/examples/export">Data Export</a>.</p>

</div>

## Exclude Columns From Exporting

Sometimes, it may be necessary to omit certain Columns when exporting data but still show them in the grid. This might be the case with images or HTML links.

To implement this scenario, you should use the method [`Column::visibleInExport()`](/table-component/component-columns.html#visibleinexport) to control whether the column will be included in the export file and the method [`Column::hidden()`](/table-component/component-columns.html#hidden) to hide the column in the grid.

Using these two methods, you can create a column with [formatted data](/table-component/data-source-fields.html#formatting-data-examples), displayed in the grid but hidden in export, and a column with raw data hidden in the grid but included in the exported file.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class DishTable extends PowerGridComponent
{
public function columns(): array
    {
        return [
            Column::make('ID', 'id')
                ->searchable()
                ->sortable(),
 
            //Displayed in the grid, but not in the exported file // [!code highlight:1]
            Column::make('Name', 'name_html_link', 'name')// [!code ++:3]
                ->visibleInExport(false)
                ->sortable(),
 
            //Hidden in the grid, but included in the exported file // [!code highlight:1] 
            Column::make('Name', 'name')// [!code ++:4]
                ->searchable()
                ->hidden()// [!code ++]
                ->visibleInExport(true),
        ];
    }
}
```


## File Appearance

### Column width

Specify column and size for [Openspout Column Width](https://github.com/openspout/openspout/blob/4.x/docs/documentation.md#column-widths).

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Traits\WithExport;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class DishTable extends PowerGridComponent
{
    use WithExport;

    public function setUp(): array
    {
        PowerGRid::exportable(fileName: 'my-export-file') // [!code ++:5]
            ->columnWidth([
                        2 => 30,
                        4 => 20,
            ]),
    }
}
```

::: info 📝 NOTE
This feature is only available for XLS files.
:::

### Striped Rows

You can add stripped row style to your outputted file style using the `striped()` and passing the `$color` with a color hex code.

If used without passing a color, `d0d3d8` is used by default.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Traits\WithExport;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class DishTable extends PowerGridComponent
{
    use WithExport;

    public function setUp(): array
    {
        PowerGrid::exportable(fileName: 'my-export-file') // [!code ++:2]
            ->striped('A6ACCD'),
    }
}
```

::: info 📝 NOTE
This feature is only available for XLS files.
:::

## Queue Export

If you are working with lots of data, it's recommended to enable Queue Export.

Queue export will divide your records into batches, increasing the export performance.

For instance, if you have 1 million records, you may set up 10 queues. Each batch will contain a total of 100,000 records.

::: info 📝 NOTE
Queues only take effect when exporting ALL records. If you have manually selected some records, they will be exported in a single batch.
:::

---

### Enable Queue Export

To enable the Queue Export feature, you must configure the methods by calling the Facade Exportable within the `setUp()` method.

#### Configuration Methods

`->queues()`: Number of queues to be used.

`->onQueue()`: Queue name. If blank, `default` will be used.

`->onConnection()`: Connection.

public property `$showExporting`: Show the export progress on the screen if `true` (default).

::: tip 💡 TIP
Read more about Batches in Laravel's  [Queue](https://laravel.com/docs/queues) documentation.
:::

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Traits\WithExport;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class DishTable extends PowerGridComponent
{
    public function setUp()
    {
        return [
            PowerGrid::exportable('export')// [!code ++:6]
               ->striped()
               ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV)
               ->queues(6)
               ->onQueue('my-dishes')
               ->onConnection('redis'),
        ];
    }
}
```

---

### Back-end

You can manipulate the state of processing in the back-end:

```php
public function onBatchThen(Batch $batch): void
{
    // All jobs completed successfully...
    // TODO notify user!
}

public function onBatchCatch(Batch $batch, Throwable $e): void
{
   // First batch job failure detected...
   // TODO add to failure log.
}

public function onBatchFinally(Batch $batch): void
{
   // The batch has finished executing...  
   // TODO add to success log.
}
```

---

### Front-end

You can manipulate the state of processing in the front end (Livewire):

```php
public function onBatchExecuting(Batch $batch): void
{
    // send alert

   if ($batch->finished()) {
       $this->dispatchBrowserEvent('batch-finished', $batch);
       
       return;
   } 
   
   $this->dispatchBrowserEvent('batch-executing', $batch);
}
```

::: tip 💡 TIP
Read more about Batches in Laravel's [Batch](https://laravel.com/docs/queues#inspecting-batches) documentation.
:::

### Passing Attributes

When performing a Batch Export, you might need to pass some attributes to the `datasource()` method.

PowerGrid automatically injects all `public attributes` of your Component inside the variable `$parameters` in the `dataset()` method, as demonstrated in the next example.

```php
// app/Livewire/DishTable.php

use App\Models\Dish;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder; // [!code ++]

class DishTable extends PowerGridComponent
{
    public $categoryId;// [!code ++:7]

    public function datasource(array $parameters): ?Builder
    {
        return Dish::with('category')
            ->where('category_id', $parameters['categoryId'] ?? $this->category->id);
    }
}
```

## Data Export Configuration Methods

### make()

Make new `\PowerComponents\LivewirePowerGrid\Facades\PowerGrid;` facade.

| Parameters            | Description                                       |
|-----------------------|---------------------------------------------------|
| (string) $fileName    | Name of the file that will contain exported data  |

```php
PowerGrid::exportable(fileName: 'my-export-file'),
```

---

### type()

Set the file types available for data exporting.

| Parameters            | Description                                                 |
|-----------------------|-------------------------------------------------------------|
| (string) $types       | File types (`Exportable::TYPE_XLS`, `Exportable::TYPE_CSV`) |

Example:

```php
PowerGrid::exportable('my-export-file')
    ->type(types: Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

---

### csvSeparator()

When exporting to CSV, you may configure the `field separator` and `field delimiter`:

| Parameters            | Description    |
|-----------------------|----------------|
| (string) $separator   | CSV Separator  |
| (string) $delimiter   | CSV Delimiter |

```php
PowerGrid::exportable('my-export-file')
    ->type(Exportable::TYPE_CSV)
    ->csvSeparator(separator: '|')
    ->csvDelimiter(delimiter: "'"),
```

The code above would result in something similar to the example below.

```plain
ID|Dish|Price
1|'Pizza'|10.00
2|'Bacon Cheeseburger'|4.99
3|'Caesar Salad'|7.50
```

---

### csvDelimiter()

See the [csvSeparator()](/table-features/exporting-data.html#csvseparator) example.

---

### striped()

See [Striped Rows](/table-features/exporting-data.html#striped-rows).

---

### columnWidth()

See [Column Width](/table-features/exporting-data.html#column-width).
