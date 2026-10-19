---
title: Defer Loading
description: Loads PowerGrid Table data only when the component initializes to improve performance and user experience on large datasets
---

# Defer Loading

Skip the datasource on first render. The table mounts empty, then `wire:init` calls `fetchDatasource()` and the rows load. This is not `PowerGrid::lazy()` (removed) and not Livewire's `#[Lazy]` attribute.

[[toc]]

## Enabling Defer Load

Set `$deferLoading` to `true`. Until `fetchDatasource()` runs, the body shows `__('Loading')`, or the view in `$loadingComponent`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public bool $deferLoading = true; // [!code ++]
}
```

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public bool $deferLoading = true; // [!code ++:3]

    public string $loadingComponent = 'components.my-custom-loading';
}
```

You may also disable the header [Loading Icon](/table-structure/header-and-footer.html#loading-icon) with `PowerGrid::header()->withoutLoading()`.
