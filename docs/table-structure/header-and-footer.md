---
title: Header and Footer
description: Customize header and footer to better integrate PowerGrid to your application's design.
---

# Table Header & Footer

[[toc]]

## Introduction

The header holds search, column toggles, filter controls, and bulk actions. The footer holds pagination and record counts.

## Header Elements

Chain methods on `PowerGrid::header()`.

### Search Input

Chain `showSearchInput()` on `PowerGrid::header()`. See [Searching Data](/data-management/searching-data.html).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::header()// [!code ++]
                ->showSearchInput(),// [!code ++]
        ];
    }
}
```

::: info
Header search does not match Enum labels. See [Searching Data - Enum](/data-management/searching-data.html#enum).
:::

### Toggle Column Visibility

Chain `showToggleColumns()` on `PowerGrid::header()`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
             PowerGrid::header() // [!code ++]
                ->showToggleColumns(),// [!code ++]
        ];
    }
}
```

### Header Alignment

Align the header controls group with `left()`, `center()`, `right()`, or `align('left'|'center'|'right')`. The default is right.

```php [app/Livewire/ProductTable.php]
PowerGrid::header()
    ->left()
    ->showSearchInput();
```

### Header Element Configuration

Header buttons resolve icon, title, and label in this order: your `setUp()` configuration, then the theme token, then the package default.

Pass a closure to `showToggleColumns()`, `showSearchInput()`, `showSoftDeletes()`, `filtersToggle()`, `clearFiltersPill()`, or `searchClearIcon()`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;

public function setUp(): array
{
    return [
        PowerGrid::header()
            ->showToggleColumns(fn ($element) => $element
                ->icon('columns')
                ->title('Columns')
                ->showLabel())
            ->showSearchInput(fn ($element) => $element
                ->title('Search products...'))
            ->filtersToggle(fn ($element) => $element
                ->icon('funnel')
                ->showLabel())
            ->clearFiltersPill(fn ($element) => $element
                ->hideLabel())
            ->searchClearIcon(fn ($element) => $element
                ->icon('x-mark')),

        PowerGrid::filterBuilder()->title('Filter')->icon('funnel'),
        PowerGrid::exportable('report')->title('Export')->icon('icons.download'),
    ];
}
```

| Method                                           | Description                                                                                                                                     |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon(string $icon, array $iconAttributes = [])` | Icon name. `funnel` renders `<x-funnel />`. `icons.funnel` renders `<x-icons.funnel />`. Packaged icons use `livewire-powergrid::icons.filter`. Unknown components render nothing. |
| `withoutIcon()`                                  | Hide the icon                                                                                                                                   |
| `title(string $title)`                           | Literal text or a lang key. Always used as `title` / `aria-label`. Becomes visible text only with `showLabel()`.                                |
| `showLabel()` / `hideLabel()`                    | Show or hide the label next to the icon                                                                                                         |
| `view(string $view)`                             | Replace the element Blade view                                                                                                                  |

Style the same controls from the theme (`header.toggle_columns.*`, `header.filters.*`, `header.export.*`). See [Custom Theme](/extending/custom-theme.html).

### Loading Icon

Chain `withoutLoading()` on `PowerGrid::header()` to hide the loading indicator.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::header()// [!code ++]
                ->withoutLoading(),// [!code ++]
        ];
    }
}
```

### Display Soft Deleted Records

Adds a header control for _With deleted records_, _Without deleted records_, or _Only deleted records_.

Chain `showSoftDeletes()` on `PowerGrid::header()`. Pass `showMessage: false` to hide the status message (default `true`).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function setUp(): array
    {
        return [
            PowerGrid::header()// [!code ++]
                ->showSoftDeletes(showMessage: true),// [!code ++]
        ];
    }
}
```

### Multi-row Bulk Actions

See [Bulk Actions](/table-structure/bulk-actions.html).

## Footer Elements

Chain methods on `PowerGrid::footer()`.

| Method                                          | Description                                      |
| ----------------------------------------------- | ------------------------------------------------ |
| `showPerPage(int $perPage = 10, array $perPageValues = [10, 25, 50, 100, 0])` | Per-page dropdown. `0` is "show all". |
| `showRecordCount(string $mode = 'full')`        | Record count (`full`, `short`, `min`).           |
| `pagination(string $viewPath)`                  | Custom pagination view.                          |
| `pageName(string $pageName = 'page')`           | Query-string page key (alphanumeric only).       |
| `includeViewOnTop(string $viewPath)`            | Blade view above the footer.                     |
| `includeViewOnBottom(string $viewPath)`         | Blade view below the footer.                     |

See [Pagination](/table-structure/pagination.html).

## Include Views

`includeViewOnTop()` and `includeViewOnBottom()` render a Blade view above or below the header or footer. Chain them on `PowerGrid::header()` or `PowerGrid::footer()`. The view can read the component's public properties.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public string $someProperty =  "foobar"; // [!code highlight:1]

    public function setUp(): array
    {
        return [
            PowerGrid::header()// [!code ++:2]
                ->includeViewOnTop('components.datatable.header-top')
                ->includeViewOnBottom('components.datatable.header-bottom'),

            PowerGrid::footer()// [!code ++:2]
                ->includeViewOnTop('components.datatable.footer-top')
                ->includeViewOnBottom('components.datatable.footer-bottom'),
        ];
    }
}
```

```php [resources/views/components/datatable/header-bottom.blade.php]
<div>
    This is my property: {{ $someProperty }}
</div>
```

Custom pagination views are covered in [Custom Pagination Component](/table-structure/pagination.html#custom-pagination-component).
