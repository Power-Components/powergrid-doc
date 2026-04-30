# Searching Data

This section covers PowerGrid's Search functionality.

Here you will find:

[[toc]]

## Introduction

The methods in this section apply to Table Header [Search Input](/table-features/header-and-footer.html#search-input) and/or the individual [Column Filters](/table-features/filters.html).

## Before Search Hook

Sometimes, you may need to reverse [data formatting](/table-component/data-source-fields.html#formatting-data-examples) before executing a [Search Input](/table-features/header-and-footer.html#search-input) database query. This is often the case with currency, boolean phone numbers, and other field types.

With PowerGrid you can use the method `beforeSearch()` to intercept a search string, and prepare it to be searched in the database.

The next example demonstrates cleaning a phone number before searching. Users might search for a "+1-999-123-1235", while the database record is "19991231235".

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function beforeSearch(string $field = null, string $search = null)// [!code ++:9]
    {
        if ($field === 'phone') {
            //+1-999-123-1235 => 19991231235
            return str($search)->replaceMatches('/[^0-9]+/', '')->toString();
        }

        return $search;
    }
}
```

You may also create a dedicated method for each field you want to intercept.

The method name must be: `beforeSearch`+ `fieldname` in camel case. For example, `beforeSearchPhone()` for the field `phone`.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function beforeSearchPhone($search): string// [!code ++:4]
    {
        return str($search)->replaceMatches('/[^0-9]+/', '')->toString();
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using  <a target="_blank" href="https://demo.livewire-powergrid.com/examples/beforesearch-hook">Before Search Hook</a>.</p>

</div>

## Searching Custom Fields

Here you will find examples using the [`beforeSearch()`](/table-features/searching-data.html#before-search-hook) method to reverse Custom Field [Data Formatting](/table-component/data-source-fields.html#formatting-data-examples), preparing data for database searches.

### Currency

The example below reverses the [Currency](/table-component/data-source-fields.html#currency) data formatting.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function beforeSearch(string $field = null, string $search = null)
    {
        if ($field === 'price') {// [!code ++:6]
            $parsedCurrency = (new \NumberFormatter('pt-PT', \NumberFormatter::CURRENCY))
                ->parse(preg_replace('/\s+/', "\u{A0}", $search));

            return $parsedCurrency == false ? floatval($search) : $parsedCurrency;
        }

        return $search;
    }
}
```

---

### Boolean

The example below reverses the [Boolean](/table-component/data-source-fields.html#boolean) data formatting.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function beforeSearch(string $field = null, string $search = null)
    {
        if ($field === 'in_stock') {// [!code ++:7]
            return match (strtolower(trim($search))) {
                'yes'   => '1',
                'no'    => '0',
                default => $search,
            };
        }

        return $search;
    }
}
```

---

### Date

Consider using the [`searchableRaw()`](/table-component/component-columns.html#searchableraw) column method.

---

### Enum Field

Currently, PowerGrid does not support searching Enum fields with the [Search Input](/table-features/header-and-footer.html#search-input). Consider using a [Filter Enum Select](/table-features/filters.html#enum-select) instead.

## Searching with Relationship

To include relationships when searching with [Search Input](/table-features/header-and-footer.html#search-input) or [Column Filters](/table-features/filters.html), you must indicate these relationships in the `relationSearch()` method in your Table Component.

The method returns an associative array with `model_name` => `columns to be searched`. Nested relationships should also be indicated in this array.

The next example adds the relationship to the `kitchen` Model and includes the column `name` and the nested relationship with the `Chef` Model. A Dish has a Kitchen, and a Kitchen has a Chef.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    public function relationSearch(): array// [!code ++:9]
    {
        return [
            'kitchen' => [ // relationship on dishes model
                'name', // column enabled to search
                'chef' => ['name'] // nested relation and column enabled to search
            ],
        ];
    }
}
```

<div class="onlinedemo custom-block">
  <p class="custom-block-title">🚀 See it in action</p>
  <p>See an interactive example using <a target="_blank" href="https://demo.livewire-powergrid.com/examples/search-with-relationship">Relation Search</a>.</p>

</div>

## Custom Search Handler

The global search logic is resolved via the Laravel container, allowing you to replace the default implementation with your own handler.

### SearchHandlerContract

Your custom handler must implement the `SearchHandlerContract` interface:

```php
namespace PowerComponents\LivewirePowerGrid\DataSource\Processors\Database\Handlers;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;

interface SearchHandlerContract
{
    public function apply(EloquentBuilder|QueryBuilder $query): EloquentBuilder|QueryBuilder;
}
```

### Binding Your Handler

Register your custom handler in a Service Provider (e.g., `AppServiceProvider::register()`):

```php
use PowerComponents\LivewirePowerGrid\DataSource\Processors\Database\Handlers\SearchHandlerContract;
use App\Support\Powergrid\Handlers\SearchHandler;

public function register(): void
{
    $this->app->bind(SearchHandlerContract::class, function ($app, array $params) {
        return new SearchHandler($params['component']);
    });
}
```

### Example: Custom Handler

```php
// app/Support/PowerGrid/Handlers/SearchHandler.php

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use PowerComponents\LivewirePowerGrid\DataSource\Processors\Database\Handlers\SearchHandlerContract;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class SearchHandler implements SearchHandlerContract
{
    public function __construct(
        protected readonly PowerGridComponent $component
    ) {}

    public function apply(EloquentBuilder|QueryBuilder $query): EloquentBuilder|QueryBuilder
    {
        $search = $this->component->search;

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
The default `SearchHandler` uses `protected` methods, so you can also **extend** it instead of replacing it entirely.
:::


## Query String

To enable the Query functionality, you must declare a method `queryString()` inside your Table Component class.

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    protected function queryString(): array// [!code ++:8]
    {
        return $this->powerGridQueryString();
    }
}
```

You can also exclude some fields from the query string, as demonstrated below.  For more information, visit Livewire [excluding query string](https://livewire.laravel.com/docs/url#excluding-certain-values) documentation section.

Example:

```php
// app/Livewire/DishTable.php

use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class DishTable extends PowerGridComponent
{
    protected function queryString(): array// [!code ++:8]
    {
        return [
            'search' => ['except' => ''],
            'page' => ['except' => 1],
            ...$this->powerGridQueryString(),
        ];
    }
}
```
