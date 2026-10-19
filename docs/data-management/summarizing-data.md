---
title: Summarizing Data
description: Display column aggregates such as sum, count, average, minimum, and maximum in PowerGrid headers and footers.
---

# Summarizing Data

[[toc]]

## Introduction

PowerGrid can show aggregate values for a column in the table header, footer, or both. Built-in operations are `sum`, `count`, `avg`, `min`, and `max`. Custom closures use `withSummary()`.

Database datasources compute every requested built-in aggregate in a single query. Collection datasources derive the same operations in memory.

## Built-in operations

Chain `summarize()` on a [`Column::make()` or `Column::add()`](/table-structure/columns.html) column. You can chain more than one operation on the same column.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
    public function columns(): array
    {
        return [
            Column::make('Price', 'price')
                ->summarize('sum', 'Sum Price', header: true, footer: false)
                ->summarize('avg', 'Avg Price', header: true, footer: false)
                ->summarize('min', 'Min Price', header: true, footer: false)
                ->summarize('max', 'Max Price', header: true, footer: false)
                ->summarize('count', 'Count Price', header: true, footer: false),
        ];
    }
}
```

| Parameter           | Description                                                                  | Default  |
| ------------------- | ---------------------------------------------------------------------------- | -------- |
| (string) $operation | One of `sum`, `count`, `avg`, `min`, `max`.                                  | required |
| (string) $label     | Caption shown next to the value.                                             | required |
| (bool) $header      | If `true`, the result is shown in the table header, under the filters.       | `false`  |
| (bool) $footer      | If `true`, the result is shown in the table footer.                          | `true`   |

An unknown `$operation` throws `InvalidArgumentException`.

Examples per operation:

```php
Column::make('Price', 'price')->summarize('sum', 'Sum Price', header: true, footer: false);
Column::make('Price', 'price')->summarize('count', 'Count Price', header: true, footer: false);
Column::make('Price', 'price')->summarize('avg', 'Avg Price', header: true, footer: false);
Column::make('Price', 'price')->summarize('min', 'Min Price', header: true, footer: false);
Column::make('Price', 'price')->summarize('max', 'Max Price', header: true, footer: false);
```

## Custom summaries

Use `withSummary()` when a built-in aggregate is not enough. The closure receives the filtered query (cloned) or, for a Collection datasource, a cloned collection.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Column;

class ProductTable extends PowerGridComponent
{
    public function columns(): array
    {
        return [
            Column::make('Price', 'price')
                ->withSummary(
                    'expensive',
                    'Expensive',
                    fn ($query) => $query->where('price', '>=', 300)->count(),
                    header: true,
                    footer: true,
                ),
        ];
    }
}
```

| Parameter      | Description                                                            | Default  |
| -------------- | ---------------------------------------------------------------------- | -------- |
| (string) $key  | Unique key for this custom summary.                                    | required |
| (string) $label | Caption shown next to the value.                                      | required |
| (Closure) $using | Callback. Query datasource: cloned builder. Collection: cloned collection. | required |
| (bool) $header | If `true`, the result is shown in the table header, under the filters. | `false`  |
| (bool) $footer | If `true`, the result is shown in the table footer.                    | `true`   |

The closure is kept server-side. It is not serialized with the column payload.

## Formatting summarized data

Override `summarizeFormat()` and return an array of `field.{operations}` keys mapped to a formatter closure. List operations comma-separated inside the braces.

Operations are: `sum`, `avg`, `count`, `min`, `max`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Support\Number;

class ProductTable extends PowerGridComponent
{
    public function summarizeFormat(): array // [!code ++:8]
    {
        return [
            'price.{sum,avg,min,max}' => fn ($value) => Number::currency($value, in: 'USD'),
            'price.{count}' => fn ($value) => Number::format($value, locale: 'br'),
            'calories.{avg}' => fn ($value) => Number::format($value, locale: 'br', precision: 2).' kcal',
        ];
    }
}
```
