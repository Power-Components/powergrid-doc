---
title: Searching Data
description: Configure header search across columns, JSON, raw SQL, relationships, Scout, and custom handlers.
---

# Searching Data

[[toc]]

## Introduction

Header search filters rows across columns marked `searchable()`. Enable the input in [Header Elements - Search Input](/table-structure/header-and-footer.html#search-input). Column filters are separate; see [Filters](/table-structure/filters.html).

The default LIKE search uses only `searchable()` columns from the server-declared `columns()` method. `searchableRaw()` and `searchableJson()` add extra `orWhereRaw` clauses when the search box is filled.

## Searchable columns

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Column;

public function columns(): array
{
    return [
        Column::make('Product name', 'name')
            ->searchable(),

        Column::make('Category', 'category_name', 'categories.name')
            ->searchable(),
    ];
}
```

Pass `$dataField` for custom fields and joined relationships so the query hits a real column. See [Searchable Column](/table-structure/columns.html#searchable-column).

## Raw SQL search

Use `searchableRaw()` when the displayed value does not match the stored column (dates, formatted numbers). The SQL is applied as `orWhereRaw` with a `LIKE` binding of `%{search}%`. `beforeSearch` still runs on the term.

```php [app/Livewire/ProductTable.php]
Column::make('Production date', 'produced_at_formatted', 'produced_at')
    ->searchableRaw('DATE_FORMAT(products.produced_at, "%d/%m/%Y") like ?'),
```

## JSON search

`searchableJson($tableName)` lowercases the JSON column and runs `LIKE`. Supported for SQLite and MySQL.

```php [app/Livewire/ProductTable.php]
Column::make('Additional', 'additional')
    ->searchableJson('products'),
```

`$tableName` is quoted into `LOWER("table"."field")` (PostgreSQL) or `LOWER(\`table\`.\`field\`)` (other drivers). Pass `''` to omit the table prefix.

## Before search hook

Intercept the search string before the query. Useful for currency, booleans, and phone numbers.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function beforeSearch(?string $field = null, ?string $search = null) // [!code ++:9]
    {
        if ($field === 'phone') {
            return str($search)->replaceMatches('/[^0-9]+/', '')->toString();
        }

        return $search;
    }
}
```

A per-field method named `beforeSearch` + field in StudlyCase takes precedence. Example: field `phone` → `beforeSearchPhone()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function beforeSearchPhone($search): string // [!code ++:4]
    {
        return str($search)->replaceMatches('/[^0-9]+/', '')->toString();
    }
}
```

### Currency

```php [app/Livewire/ProductTable.php]
public function beforeSearch(?string $field = null, ?string $search = null)
{
    if ($field === 'price') { // [!code ++:6]
        $parsedCurrency = (new \NumberFormatter('pt-PT', \NumberFormatter::CURRENCY))
            ->parse(preg_replace('/\s+/', "\u{A0}", $search));

        return $parsedCurrency == false ? floatval($search) : $parsedCurrency;
    }

    return $search;
}
```

### Boolean

```php [app/Livewire/ProductTable.php]
public function beforeSearch(?string $field = null, ?string $search = null)
{
    if ($field === 'in_stock') { // [!code ++:7]
        return match (strtolower(trim($search))) {
            'yes' => '1',
            'no' => '0',
            default => $search,
        };
    }

    return $search;
}
```

### Date

Use [`searchableRaw()`](#raw-sql-search).

### Enum

Header search does not match Enum labels. Use a [Filter Enum Select](/table-structure/filters.html#enum-select-filter).

## Searching with relationships

Return an associative array from `relationSearch()`: `relation => columns`. Nested relations are nested arrays. Requires Eloquent relationships on the model.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function relationSearch(): array
    {
        return [ // [!code highlight:2]
            'kitchen' => [
                'name',
                'chef' => ['name'],
            ],
        ];
    }
}
```

## Laravel Scout

If `datasource()` returns a `Laravel\Scout\Builder`, PowerGrid prepends the header search term to the Scout query (`"{search},{existingQuery}"`). Column `searchable()` is not used for that path; Scout uses the model's index.

```php [app/Livewire/ProductTable.php]
use Laravel\Scout\Builder as ScoutBuilder;
use App\Models\Product;

public function datasource(): ScoutBuilder
{
    return Product::search();
}
```

## Custom search handler

Database header search is resolved from the container as `SearchHandlerContract`. Bind your own implementation in a service provider.

```php [vendor/power-components/turbine/...]
namespace PowerComponents\Turbine\DataSource\Processors\Database\Handlers;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;

interface SearchHandlerContract
{
    public function apply(EloquentBuilder|QueryBuilder $query): EloquentBuilder|QueryBuilder;
}
```

```php [app/Providers/AppServiceProvider.php]
use PowerComponents\Turbine\DataSource\Processors\Database\Handlers\SearchHandlerContract;
use App\Support\PowerGrid\Handlers\SearchHandler;

public function register(): void
{
    $this->app->bind(SearchHandlerContract::class, function ($app, array $params) {
        return new SearchHandler($params['component']);
    });
}
```

`$params['component']` is the table (a Turbine `Context`; your `PowerGridComponent` implements it).

```php [app/Support/PowerGrid/Handlers/SearchHandler.php]
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use PowerComponents\Turbine\Contracts\Context;
use PowerComponents\Turbine\DataSource\Processors\Database\Handlers\SearchHandlerContract;

class SearchHandler implements SearchHandlerContract
{
    public function __construct(
        protected readonly Context $component
    ) {}

    public function apply(EloquentBuilder|QueryBuilder $query): EloquentBuilder|QueryBuilder
    {
        $search = $this->component->state()->search;

        if (empty($search)) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }
}
```

::: tip
The default `PowerComponents\Turbine\DataSource\Processors\Database\Handlers\SearchHandler` uses `protected` methods, so you can extend it instead of replacing it.
:::
