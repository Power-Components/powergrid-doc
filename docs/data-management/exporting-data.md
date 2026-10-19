---
title: Exporting Data
description: Export table data to Excel or CSV, including queued background exports for large datasets.
---

# Exporting Data

[[toc]]

## Introduction

Export builds a spreadsheet from the current table data so users can download it. PowerGrid uses [OpenSpout](https://github.com/openspout/openspout) v5 to generate CSV and XLSX files.

`ExportPlugin` is always registered. It is enabled when `PowerGrid::exportable()` is present in `setUp()`.

The OpenSpout driver classes are:

- `PowerComponents\LivewirePowerGrid\Plugins\Export\OpenSpout\v5\ExportToCsv`
- `PowerComponents\LivewirePowerGrid\Plugins\Export\OpenSpout\v5\ExportToXLS`

## Install OpenSpout

```bash
composer require openspout/openspout:^5.0
```

The published config maps those classes under `livewire-powergrid.exportable.openspout_v5`. See [Configuration Options](/powergrid/configuration-options.html#openspout).

## Enabling data export

Call `PowerGrid::exportable()` in `setUp()` and pass the output file name. Chain the [configuration methods](#configuration-methods) you need.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable; // [!code ++]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::exportable(fileName: 'my-export-file') // [!code ++:3]
                ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
        ];
    }
}
```

`Exportable::TYPE_XLS` is `'xlsx'`. `Exportable::TYPE_CSV` is `'csv'`.

## Excluding columns from export

Use [`Column::visibleInExport()`](/table-structure/columns.html#export-data-visibility) to include or omit a column in the file, and [`Column::hidden()`](/table-structure/columns.html#hide-column) to hide it in the grid.

By default, [Action Columns](/table-structure/columns.html#action-column) are omitted. `visibleInExport(true)` includes them.

A common pattern is a formatted column in the grid and a raw column in the file:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
    public function columns(): array
    {
        return [
            Column::make('ID', 'id')
                ->searchable()
                ->sortable(),

            // Shown in the grid, omitted from the file // [!code highlight:1]
            Column::make('Name', 'name_html_link', 'name') // [!code ++:3]
                ->visibleInExport(false)
                ->sortable(),

            // Hidden in the grid, included in the file // [!code highlight:1]
            Column::make('Name', 'name') // [!code ++:4]
                ->searchable()
                ->hidden()
                ->visibleInExport(true),
        ];
    }
}
```

## File appearance (XLSX)

These options apply to the generated XLSX file, not the table UI.

### Column width

Pass column index => width for [OpenSpout column widths](https://github.com/openspout/openspout/blob/v5.4.0/docs/documentation.md#column-widths):

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::exportable(fileName: 'my-export-file') // [!code ++:6]
                ->columnWidth([
                    2 => 30,
                    4 => 20,
                ]),
        ];
    }
}
```

### Striped rows

Default stripe color is `#d0d3d8`. Pass a hex color (without `#`) to `striped()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::exportable(fileName: 'my-export-file') // [!code ++:2]
                ->striped('A6ACCD'),
        ];
    }
}
```

## Queue export

For large datasets, split the export across queue workers. Queues apply when exporting **all** records. Manually selected rows are exported in a single (non-queued) download.

`->queues(10)` dispatches ten batch jobs. See Laravel [Queues](https://laravel.com/docs/queues).

### Enabling queue export

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::exportable('export') // [!code ++:7]
                ->striped()
                ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV)
                ->queues(6)
                ->onQueue('my-products')
                ->onConnection('redis'),
        ];
    }
}
```

| Method              | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `queues()`          | Number of parallel jobs (`int` or numeric `string`). `0` disables queuing.  |
| `onQueue()`         | Queue name.                                                                 |
| `onConnection()`    | Queue connection.                                                           |
| `batchName()`       | Laravel batch name. Default: `PowerGrid batch export`.                      |
| `jobClass()`        | Job class. Default: `PowerComponents\LivewirePowerGrid\Plugins\Export\ExportJob`. |
| `progressView()`    | Blade view for on-screen progress. See [Export progress UI](#export-progress-ui). |
| `disk()`            | Storage disk for queued files. Default: `local`.                            |
| `directory()`       | Directory on that disk.                                                     |

### Batch callbacks

Queued export reports batch state through `onPluginUpdated()`. The plugin name is `export`.

| Event             | When                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `batchExecuting`  | Progress poll via `updateExportProgress()`. `$params['batch']` is the batch. |
| `batchThen`       | Every job completed.                                                 |
| `batchCatch`      | First job failed. `$params['exception']` is the `Throwable`.         |
| `batchFinally`    | Batch finished, with or without failures.                            |

```php [app/Livewire/ProductTable.php]
use Illuminate\Bus\Batch;

public function onPluginUpdated(string $plugin, string $event, array $params): void
{
    if ($plugin !== 'export') {
        return;
    }

    /** @var Batch $batch */
    $batch = $params['batch'];

    if ($event === 'batchThen') {
        // $batch finished and every job completed.
    }

    if ($event === 'batchCatch') {
        // $params['exception'] is the Throwable from the first failed job.
    }

    if ($event === 'batchFinally') {
        // $batch finished, with or without failures.
    }
}
```

Export does not dispatch a browser event.

::: tip
Read more about Laravel [batches](https://laravel.com/docs/queues#inspecting-batches).
:::

### Export progress UI

PowerGrid does not ship a built-in progress bar. Register your own Blade view with `->progressView()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Components\SetUp\Exportable;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::exportable('export')
                ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV)
                ->queues(6)
                ->progressView('components.powergrid.export-progress'), // [!code ++]
        ];
    }
}
```

The view is rendered **below the table header** and receives:

| Variable       | Type                  | Description                                                                                                                                                   |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$exportState` | `array<string,mixed>` | Live batch state. Keys: `exporting` (bool), `finished` (bool), `progress` (int %), `files` (array of generated file names), `errors` (bool), `id` (batch id). |
| `$tableName`   | `string`              | Current table name (useful for a unique `wire:key`).                                                                                                          |

Use `wire:poll="updateExportProgress"` to refresh batch state, and `wire:click="downloadExport('{{ $file }}')"` to download each generated file when the batch has finished.

```blade [resources/views/components/powergrid/export-progress.blade.php]
<div wire:key="export-progress-{{ $tableName }}">
    @if (data_get($exportState, 'exporting') && ! data_get($exportState, 'finished'))
        <div wire:poll="updateExportProgress" class="my-3 p-3 rounded bg-gray-100 text-center">
            <div>Exporting…</div>
            <span class="text-xs">{{ (int) data_get($exportState, 'progress', 0) }}%</span>
            <div class="bg-emerald-500 h-1 rounded"
                 style="width: {{ (int) data_get($exportState, 'progress', 0) }}%; transition: width 300ms;">
            </div>
        </div>
    @endif

    @if (data_get($exportState, 'finished'))
        <div class="my-3 p-3 rounded bg-gray-100">
            <p class="font-medium">Export completed</p>
            @foreach ((array) data_get($exportState, 'files', []) as $file)
                <a class="block cursor-pointer underline"
                   wire:click="downloadExport('{{ $file }}')">
                    {{ $file }}
                </a>
            @endforeach
        </div>
    @endif
</div>
```

::: info
Without `progressView()`, the export still runs and files are written to the configured disk. You can notify the user from the [batch callbacks](#batch-callbacks) instead of, or in addition to, a progress view.
:::

### Passing attributes

Queued export injects the table's public properties into `$parameters` on `datasource()`:

```php [app/Livewire/ProductTable.php]
use App\Models\Product;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public $categoryId; // [!code ++:7]

    public function datasource(array $parameters): ?Builder
    {
        return Product::with('category')
            ->where('category_id', $parameters['categoryId'] ?? $this->categoryId);
    }
}
```

## Configuration methods

### exportable()

Enables export and sets the file name. Called from `PowerComponents\LivewirePowerGrid\Facades\PowerGrid`.

| Parameters         | Description                     |
| ------------------ | ------------------------------- |
| (string) $fileName | Name of the exported file       |

```php [app/Livewire/ProductTable.php]
PowerGrid::exportable(fileName: 'my-export-file'),
```

### type()

File types available in the export menu.

| Parameters      | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| (string) $types | `Exportable::TYPE_XLS`, `Exportable::TYPE_CSV`              |

```php [app/Livewire/ProductTable.php]
PowerGrid::exportable('my-export-file')
    ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
```

### csvSeparator() / csvDelimiter()

CSV field separator and delimiter. Defaults: `,` and `"`.

```php [app/Livewire/ProductTable.php]
PowerGrid::exportable('my-export-file')
    ->type(Exportable::TYPE_CSV)
    ->csvSeparator('|')
    ->csvDelimiter("'"),
```

```text [my-export-file.csv]
ID|Product|Price
1|'Pizza'|10.00
2|'Bacon Cheeseburger'|4.99
3|'Caesar Salad'|7.50
```

### stripTags()

Strip HTML tags from exported cell values. Default: `false`.

```php [app/Livewire/ProductTable.php]
PowerGrid::exportable('my-export-file')
    ->stripTags(true),
```

### deleteFileAfterSend()

Delete the generated file after the HTTP download. Default: `true`.

### striped()

See [Striped rows](#striped-rows).

### columnWidth()

See [Column width](#column-width).
