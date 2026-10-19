---
title: Auto-Refresh
description: Automatically reloads a PowerGrid Table at fixed intervals to keep data up to date in real time applications
---

# Auto-Refresh

There is no `PowerGrid::autoRefresh()` helper. Poll a parent component and dispatch `pg:eventRefresh-{tableName}`. The table must have a unique [`$tableName`](/performance-and-look/table-reference-name.html).

[[toc]]

## Enabling Auto-Refresh

Use Livewire [wire:poll](https://livewire.laravel.com/docs/wire-poll) to dispatch the event on an interval. See [Events](/performance-and-look/events.html).

::: code-group

```php [PowerGrid Table]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public string $tableName = 'ProductTable'; // [!code ++]
}
```

```php [TableRefresher Component]
namespace App\Livewire;

use Livewire\Component;

class TableRefresher extends Component
{
    public function refreshTable() // [!code ++:4]
    {
        $this->dispatch('pg:eventRefresh-ProductTable');
    }

    public function render()
    {
        return view('livewire.table-refresher');
    }
}
```

```php [TableRefresher View]
<div wire:poll.30s="refreshTable">
    <livewire:product-table />
</div>
```

```php [App View]
<livewire:table-refresher />
```

:::
