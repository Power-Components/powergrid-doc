---
title: Portable Grid Definitions
description: Describe a grid once and drive it from a Livewire PowerGrid Table or from an Inertia / REST endpoint.
---

# Portable Grid Definitions

[[toc]]

If the table only lives in Livewire, skip this page. Keep using `PowerGridComponent` as shown in [Create a PowerGrid Table](/get-started/create-powergrid-table.html).

Use a portable definition when the same grid must also feed Inertia (React / Vue) or a REST endpoint. You write columns, fields, filters, and `setUp()` once. Livewire and Inertia only change the adapter.

This lives in the Turbine engine (`PowerComponents\Turbine\GridDefinition`). PowerGrid's `TurbineTable` is the Livewire adapter.

## Describe the Grid Once

Extend `GridDefinition`. `datasource()` is required. You may also override `fields()`, `columns()`, `filters()`, `setUp()`, `actions()`, `actionRules()`, `relationSearch()`, `searchMorphs()`, and `transformQuery()`.

```php [app/Grids/ProductsGrid.php]
use PowerComponents\Turbine\GridDefinition;
use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;
use PowerComponents\LivewirePowerGrid\PowerGridFields;

class ProductsGrid extends GridDefinition
{
    public string $tableName = 'products';

    public int $perPage = 10;

    public function datasource(): mixed
    {
        return \App\Models\Product::query();
    }

    public function fields(): PowerGridFields
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('price');
    }

    public function columns(): array
    {
        return [
            Column::make('ID', 'id')->sortable(),
            Column::make('Name', 'name')->searchable()->sortable(),
            Column::make('Price', 'price')->sortable(),
        ];
    }

    public function setUp(): array
    {
        return [
            PowerGrid::footer()->showPerPage(10, [10, 25, 50]),
        ];
    }
}
```

## Livewire Adapter

Extend `TurbineTable` and return the definition. PowerGrid reads `datasource`, `columns`, `fields`, `filters`, `setUp`, `relationSearch`, `searchMorphs`, and `transformQuery` from it.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\TurbineTable;
use PowerComponents\Turbine\GridDefinition;
use App\Grids\ProductsGrid;

class ProductTable extends TurbineTable
{
    public string $tableName = 'products';

    protected function definition(): GridDefinition
    {
        return new ProductsGrid();
    }
}
```

Existing `PowerGridComponent` classes are unchanged. `definition()` returns `null` by default. `TurbineTable` throws if `definition()` is missing.

Row actions are not pulled from the definition automatically. If the grid has them, add `Column::action()` in the definition's `columns()` and forward `actions()` / `actionRules()` on the Livewire component. PowerGrid requires an action column whenever `actions()` exists.

## Inertia or REST Adapter

```php [app/Http/Controllers/ProductGridController.php]
use App\Grids\ProductsGrid;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductGridController
{
    public function __invoke(Request $request)
    {
        $grid = new ProductsGrid();

        return Inertia::render('products/index', [
            'columns' => fn () => $grid->columns(),
            'grid' => fn () => $grid->envelope($request),
        ]);
    }
}
```

`envelope()`, `toArray()`, `toResponse()`, and `toPaginator()` feed the request in. The JSON shape and the standalone builder are documented in the [Turbine README](https://github.com/power-components/turbine).
