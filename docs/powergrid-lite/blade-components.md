---
title: PowerGrid Lite - Blade Components
description: Lightweight Blade components for building themed data tables with sorting, searching, pagination, and row selection.
---

# PowerGrid Lite - Blade Components

[[toc]]

PowerGrid Lite builds a table in Blade, using the active theme tokens. Sorting, search, checkboxes, and persist are opt-in traits on your Livewire component. Search input and per-page stay in your view.

## Components

Tags use the `<x-pg-*>` prefix (`Blade::component` in the service provider).

| Component        | Props                                                                 | Renders                                      |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------- |
| `<x-pg-table>`   | `:paginate`, `record-count`                                           | Table wrapper + pagination via active theme. |
| `<x-pg-columns>` | `sticky`                                                              | `<thead>` wrapper                            |
| `<x-pg-column>`  | `sortable`, `:sorted`, `:direction`, `field`, `align`, `sticky`, `checkbox` | `<th>` with optional sort indicators   |
| `<x-pg-rows>`    | —                                                                     | `<tbody>` wrapper                            |
| `<x-pg-row>`     | `:key`, `:checkbox-value`                                             | `<tr>` with optional checkbox cell (`wire:model.live="checkboxValues"`) |
| `<x-pg-cell>`    | `align` (`start`, `center`, `end`), `sticky`, `variant` (`strong`)    | `<td>` with alignment and sticky support     |

`<x-pg-table>` only renders the table structure and pagination. Bind search and per-page with `wire:model` in your view.

## Traits

| Trait          | Features                                           |
| -------------- | -------------------------------------------------- |
| `WithSorting`  | Single and multi-column sort with direction toggle |
| `WithSearch`   | Live search with page reset                        |
| `WithCheckbox` | Row selection and select-all. Required by `<x-pg-column checkbox>` and `:checkbox-value`. Select-all fills values only if you define `getAllCheckboxValues()`. |
| `WithPersist`  | State persistence via cookies, session, or cache   |

`WithPersist` reads `config('livewire-powergrid.persist_driver')`. Declare a `$persist` array on the component (`sorting`, `checkbox`, `perPage`) to opt in.

## Usage

::: code-group

```php [ProductTable]
use Livewire\Component;
use Livewire\WithPagination;
use PowerComponents\LivewirePowerGrid\Lite\Traits\{WithCheckbox, WithSorting, WithSearch};

class ProductTable extends Component
{
    use WithPagination, WithSorting, WithSearch, WithCheckbox;

    public int $perPage = 10;

    public function render()
    {
        return view('livewire.products-table', [
            'products' => \App\Models\Product::query()
                ->when($this->search, fn ($q) => $q->where('name', 'like', "%{$this->search}%"))
                ->orderBy($this->sortField ?: 'name', $this->sortDirection)
                ->paginate($this->perPage),
        ]);
    }
}
```

```php [Blade View]
{{-- Search + per-page are your view's responsibility --}}
<input wire:model.live.debounce.700ms="search" type="text" placeholder="Search..." />
<select wire:model.live="perPage">
    <option value="10">10</option>
    <option value="25">25</option>
    <option value="50">50</option>
</select>

<x-pg-table :paginate="$products" record-count="full">
    <x-pg-columns>
        <x-pg-column checkbox />
        <x-pg-column sortable field="name"
            :sorted="$this->isSorted('name')"
            :direction="$this->sortDirectionFor('name')"
            wire:click="sortBy('name')">
            Name
        </x-pg-column>
        <x-pg-column>Price</x-pg-column>
    </x-pg-columns>

    <x-pg-rows>
        @foreach ($products as $product)
            <x-pg-row :key="$product->id" :checkbox-value="$product->id">
                <x-pg-cell>{{ $product->name }}</x-pg-cell>
                <x-pg-cell>{{ $product->price }}</x-pg-cell>
            </x-pg-row>
        @endforeach
    </x-pg-rows>
</x-pg-table>
```

:::
