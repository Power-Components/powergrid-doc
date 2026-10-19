---
title: Filters
description: Text, select, date, number, and boolean filters on table columns, with inline, dropdown, and flyout layouts.
---

# Column Filters

[[toc]]

## Introduction

A column filter narrows rows by that column's value. Register filters in `filters()` and chain configuration methods on the `Filter` facade.

For a header-wide search, see [Search Input](/table-structure/header-and-footer.html#search-input). For AND / OR conditions on top of these filters, see [Filter Builder](/table-structure/filter-builder.html).

If the column is a [Custom Field](/data-management/formatting-data.html#transforming-data) or comes from a [relationship](/table-structure/datasource.html#loading-relationships), map the database field so filtering can run. See [Working With Custom Fields](/table-structure/columns.html#working-with-custom-fields) and [Relationship-Based Columns](/table-structure/columns.html#defining-relationship-based-columns).

## Enabling Filters

Return `Filter` definitions from `filters()`. The first argument is the [column](/table-structure/columns.html#defining-columns) field; the optional second argument is the database field when it differs.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function filters(): array // [!code ++:12]
    {
        return [
            Filter::inputText('name')->placeholder('Product Name'),

            Filter::boolean('in_stock')->label('In Stock', 'Out of Stock'),

            Filter::number('price_BRL', 'price')
                ->thousands('.')
                ->decimal(','),
        ];
    }
}
```

## Filter Position

| Value      | Behavior                                                                  |
| ---------- | ------------------------------------------------------------------------- |
| `inline`   | Filters inside the table. Updates are live and debounced.                 |
| `dropdown` | A popover anchored to a Filter button. Edits stay in a draft until Apply. |
| `flyout`   | A drawer from the left or right edge. Edits stay in a draft until Apply.  |
| `null`     | No filter UI.                                                             |

The v6 value `outside` is gone. Use `dropdown` or `flyout`.

Per table, set the config in `boot()`:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function boot(): void// [!code ++:4]
    {
        config(['livewire-powergrid.filter' => 'flyout']);
    }
}
```

Global default: [Filter Position](/powergrid/configuration-options.html#filter-position).

When `filter` is `flyout`, `filter_flyout` controls the drawer (`position` `left` or `right`, `close_on_escape`, `close_on_click_outside`). Override those keys the same way in `boot()`.

In dropdown and flyout, chain `order(int $order)` on a filter to set panel order. Otherwise PowerGrid uses the `filters()` array index. Inline filters ignore `order()`.

### Draft and Apply

Dropdown and flyout never filter live. Edits land in `draftFilters` and commit when the user presses Apply (`applyFilters()`). Reset restores the last committed state.

The bag is **field-keyed**: `draftFilters.{field}.value` (and `.op`, `.value.start`, `.value.end`, `.value.formatted` as needed). When the field contains a dot (for example `products.diet`), the key is the column name instead (`diet`).

```php [tests/Feature/ProductTableTest.php]
Livewire::test(ProductTable::class)
    ->set('draftFilters.name.value', 'pizza')
    ->call('applyFilters')
    ->assertSee('Pizza');
```

Date ranges use Flatpickr's `formatted` string on the **field** key:

```php
->set('draftFilters.created_at.value.formatted', '2024-01-01 to 2024-12-31')
->call('applyFilters');
```

## Filter Wire

Livewire modifiers come from `config('livewire-powergrid.filter_wire')`, merged over the defaults in `Support\FilterWire`. Override per table with `filterWire()`:

```php [app/Livewire/ProductTable.php]
public function filterWire(): array
{
    return [
        'input_text' => ['value' => 'live.debounce.800ms'],
    ];
}
```

Slots: `value`, `operator`, `start`, `end`, `formatted`. See [Filter Wire](/powergrid/configuration-options.html#filter-wire).

## Expand or Collapse the Filter Panel

With `flyout`, `$showFilters` controls whether the drawer is open. Set it to `true` to start with the drawer open. The `dropdown` popover keeps its open state in the browser and ignores `$showFilters`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public bool $showFilters = true;// [!code ++]
}
```

## Standard Filters

### Text Filter

Text input plus an operator dropdown. All operators are enabled by default. `operators()` always keeps `contains` in the list.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
       Filter::inputText('name', 'name')
          ->operators(['contains', 'is', 'is_not'])
          ->placeholder('Product name'),
    ];
}
```

| Method                             | Description              |
| ---------------------------------- | ------------------------ |
| `operators(array $operators)`      | Enabled search operators |
| `placeholder(string $placeholder)` | Input placeholder        |

Operators: `contains`, `contains_not`, `is`, `is_not`, `starts_with`, `ends_with`, `is_empty`, `is_not_empty`, `is_null`, `is_not_null`, `is_blank`, `is_not_blank`.

### Number Filter

Min / max inputs against a numeric column.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::number('price')
            ->thousands('.')
            ->decimal(',')
            ->placeholder('Min', 'Max'),
    ];
}
```

| Method                                  | Description                         |
| --------------------------------------- | ----------------------------------- |
| `thousands(string $thousands)`          | Thousands separator                 |
| `decimal(string $decimal)`              | Decimal separator                   |
| `placeholder(string $min, string $max)` | Placeholders for the min/max inputs |

### Boolean Filter

Dropdown with All, true, and false. Default labels are `Yes` / `No`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::boolean('in_stock')
            ->label('yes', 'no'),
    ];
}
```

`label(string $trueLabel, string $falseLabel)` sets the true and false option labels.

### Select Filter

Single-select dropdown from a datasource.

```php [app/Livewire/ProductTable.php]
use App\Models\Category;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::select('category_name', 'category_id')
            ->datasource(Category::all())
            ->optionLabel('name')
            ->optionValue('id'),
    ];
}
```

| Method                                              | Description                                      |
| --------------------------------------------------- | ------------------------------------------------ |
| `datasource(Collection\|array\|Closure $collection)` | Options source                                   |
| `computedDatasource(string $method)`                | Name of a computed property that returns options |
| `optionValue(string $value)`                        | Option value field                               |
| `optionLabel(string $value)`                        | Option label field                               |
| `depends(array $fields)`                            | Parent filter fields. See [Dependent Filters](#dependent-filters) |

### Multi-Select Filter

Multi-select dropdown from a datasource.

Tom Select and Slim Select are **not bundled**. Install one, expose it on `window`, and set `plugins.select.default` to `tom` or `slim` (Slim Select is the config default). See [TomSelect](/powergrid/configuration-options.html#tomselect) and [SlimSelect](/powergrid/configuration-options.html#slimselect).

```php [app/Livewire/ProductTable.php]
use App\Models\Category;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::multiSelect('category_name', 'category_id')
            ->datasource(Category::all())
            ->optionValue('id')
            ->optionLabel('name'),
    ];
}
```

| Method                                              | Description        |
| --------------------------------------------------- | ------------------ |
| `datasource(Collection\|array\|Closure $collection)` | Options source     |
| `optionValue(string $value)`                        | Option value field |
| `optionLabel(string $value)`                        | Option label field |
| `depends(array $fields)`                            | Parent filter fields |

### Multi-Select Async Filter

Same UI as [Multi-Select](#multi-select-filter), loading options from an HTTP endpoint. Requires Tom Select (`plugins.select.default` = `tom`). See [TomSelect](/powergrid/configuration-options.html#tomselect).

::: code-group

```php [PowerGrid Table]
use PowerComponents\LivewirePowerGrid\Facades\Filter;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::multiSelectAsync('category_name', 'category_id')
                ->url(route('category.index'))
                ->method('POST')
                ->parameters(['active' => 1])
                ->optionValue('id')
                ->optionLabel('name'),
        ];
    }
}
```

```php [Route]
use App\Http\Controllers\Api\CategorySearch;

Route::post('category', CategorySearch::class)->name('category.index');
```

```php [API Controller]
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class CategorySearch extends Controller
{
    public function __invoke(Request $request): Collection
    {
        return Category::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->when($request->search,
                fn (Builder $query) => $query
                    ->where('name', 'like', "%{$request->search}%")
            )
            ->get();
    }
}
```

:::

| Method                            | Description                         |
| --------------------------------- | ----------------------------------- |
| `url(string $url)`                | Endpoint that returns options       |
| `method(string $method = 'get')`  | HTTP method                         |
| `parameters(array $parameters)`   | Extra request payload (POST) or query string (GET) |
| `optionValue(string $value)`      | Option value field                  |
| `optionLabel(string $label)`      | Option label field                  |

The typed text is sent as `search`, so don't use `search` as a key in `parameters()`.

### Enum Select Filter

Dropdown from a PHP [Enum](https://www.php.net/manual/en/language.types.enumerations.php). To show labels instead of case values, implement `labelTurbineFilter()` on the enum.

::: code-group

```php [PowerGrid Table]
use App\Enums\Diet;
use PowerComponents\LivewirePowerGrid\Column;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::enumSelect('diet', 'products.diet') // [!code highlight:2]
                ->datasource(Diet::cases()),
        ];
    }

    public function columns(): array
    {
        return [
            Column::make('Diet', 'diet', 'products.diet') // [!code highlight:1]
            //...
        ];
    }
}
```

```php [Enum Diet]
enum Diet: int
{
    case ALL      = 0;
    case VEGAN    = 1;
    case CELIAC   = 2;

    public function labels(): string
    {
        return match ($this) {
            self::ALL         => "🍽️ All diets",
            self::VEGAN       => "🌱 Suitable for Vegans",
            self::CELIAC      => "🥜 Suitable for Celiacs",
        };
    }

    public function labelTurbineFilter(): string// [!code highlight:4]
    {
        return $this->labels();
    }
}
```

:::

| Method                                         | Description        |
| ---------------------------------------------- | ------------------ |
| `datasource(Collection\|array $enumCases)`     | Enum cases         |
| `optionValue(string $value)`                   | Option value field (default `value`) |
| `optionLabel(string $value)`                   | Option label field |

### Datetime Picker Filter

[Flatpickr](https://flatpickr.js.org) datetime range. Flatpickr is **not bundled** — install it and import its assets. See [Configuring Flatpickr](/powergrid/configuration-options.html#flatpickr).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::datetimepicker('produced_at_formatted', 'produced_at')
            ->params([
                'timezone' => 'America/Sao_Paulo',
            ]),
    ];
}
```

`params(array $params)` is merged into Flatpickr's config (`enableTime` is already `true` for datetime). Extra PowerGrid keys:

| Parameter   | Value    | Description                                          |
| ----------- | -------- | ---------------------------------------------------- |
| only_future | `bool`   | Disallow selecting dates in the past.                |
| no_weekends | `bool`   | Disallow selecting weekend dates.                    |
| timezone    | timezone | Parse the selected range in this timezone.           |

### Date Picker Filter

Same as [Datetime Picker](#datetime-picker-filter), without time.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::datepicker('creation_date_formatted', 'creation_date'),
    ];
}
```

## Dynamic Filter

Render an external Blade / Livewire component as the filter control (for example [WireUI](https://wireui.dev)). Bind it to a `filters.*` path in `attributes()`. PowerGrid does **not** apply a `dynamic` type to the query — read that path in `datasource()`, or use a standard filter with [`builder()`](#custom-filter-query).

```php [app/Livewire/ProductTable.php]
use Illuminate\Database\Eloquent\Builder;
use App\Models\Product;

public function datasource(): Builder
{
    return Product::query()
        ->when(
            data_get($this->filters, 'dynamic.in_stock'),
            fn (Builder $query, $value) => $query->where('in_stock', $value)
        );
}
```

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::dynamic('in_stock', 'in_stock')
                ->component('select')
                ->attributes([
                    'class'            => 'min-w-[170px]',
                    'async-data'       => route('categories.index'),
                    'option-label'     => 'name',
                    'multiselect'      => false,
                    'option-value'     => 'id',
                    'placeholder'      => 'Test',
                    'wire:model.live'  => 'filters.dynamic.in_stock',
                ]),
        ];
    }
}
```

| Method                            | Description                    |
| --------------------------------- | ------------------------------ |
| `component(string $component)`    | Component to render            |
| `attributes(array $attributes)`   | Attributes passed to the component |

## Dependent Filters

`depends()` lists parent filter keys (the parent's field, or its column name when the field contains a dot). The child `datasource()` closure receives the current parent values, keyed the same way.

```php [app/Livewire/ProductTable.php]
use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\Facades\Filter;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::select('category_name', 'category_id')
                ->datasource(Category::all())
                ->optionLabel('name')
                ->optionValue('id'),

            Filter::select('product_name', 'products.id')
                ->depends(['category_id']) // [!code highlight:10]
                ->datasource(
                    fn ($depends) => Product::query()
                        ->when(
                            isset($depends['category_id']),
                            fn (Builder $query) => $query->where('category_id', $depends['category_id'])
                        )
                        ->get()
                )
                ->optionLabel('name')
                ->optionValue('id'),
        ];
    }
}
```

## Custom Filter Query

Override how a filter hits the query with `builder()` (Eloquent / Query Builder) or `collection()` (Collections).

```php [app/Livewire/ProductTable.php]
use Illuminate\Database\Eloquent\Builder;
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::boolean('calories')// [!code ++:11]
                ->label('Caloric', 'Light')
                ->builder(function (Builder $query, string $value) {
                    $q = match ($value) {
                        default => ['operator' => '>=', 'calories' => 0],
                        'true'  => ['operator' => '>=', 'calories' => 300],
                        'false' => ['operator' => '<', 'calories' => 300],
                    };

                    return $query->where('calories', $q['operator'], $q['calories']);
                }),
        ];
    }
}
```

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\Collection;

->collection(function (Collection $collection, mixed $value) {
    return $collection->where('some_field', '!=', $value);
})
```

For a modal that composes several of these filters with AND / OR, see [Filter Builder](/table-structure/filter-builder.html).

## Filter by Relationship

Use `filterRelation()` with the relation name and the related field.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::inputText('category_name')// [!code ++:2]
                ->filterRelation('category', 'name'),
        ];
    }
}
```

## Default Filter Values

`default()` applies when the table mounts.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\Filter;

public function filters(): array
{
    return [
        Filter::select('category_name', 'category_id')
            ->datasource(Category::all())
            ->optionLabel('name')
            ->optionValue('id')
            ->default(1), // [!code ++]

        Filter::boolean('in_stock')
            ->label('In Stock', 'Out of Stock')
            ->default(true), // [!code ++]

        Filter::inputText('name')
            ->default(['value' => 'Pizza', 'operator' => 'contains']),

        Filter::number('price', 'price')
            ->default(['start' => 100, 'end' => 500]),

        Filter::datepicker('production_date', 'production_date')
            ->default(['start' => '2024-01-01', 'end' => '2024-12-31']),
    ];
}
```

| Filter type      | Default value                                              |
| ---------------- | ---------------------------------------------------------- |
| `select`         | Single value matching `optionValue`                        |
| `multiSelect`    | Array of values                                            |
| `boolean`        | `true` or `false`                                          |
| `inputText`      | String, or `['value' => …, 'operator' => …]`               |
| `number`         | Number (start only), or `['start' => …, 'end' => …]`       |
| `datepicker` / `datetimepicker` | `['start' => …, 'end' => …]` (`formatted` optional) |

## Custom Components

Replace a standard filter's markup with `component($view, $attributes = [])`. The view receives your attributes merged with the filter definition. Bind your input with `$attributes->get('wire')['value']`, the same `wire:model` the built-in control uses.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\Filter;

class ProductTable extends PowerGridComponent
{
    public function filters(): array
    {
        return [
            Filter::boolean('in_stock')
                ->component('my-custom-select', [
                    'class' => 'p-2',
                ]),
        ];
    }
}
```

```php [resources/views/components/my-custom-select.blade.php]
<select class="{{ $attributes->get('class') }}" {{ $attributes->get('wire')['value'] }}>
    <option value="all">All</option>
    <option value="true">{{ $attributes->get('trueLabel') }}</option>
    <option value="false">{{ $attributes->get('falseLabel') }}</option>
</select>
```
