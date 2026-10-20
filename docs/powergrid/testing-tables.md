---
title: Testing PowerGrid Tables
description: Test PowerGrid tables with Livewire assertions for actions, and drive dropdown/flyout filters through draftFilters.
---

# Testing PowerGrid Tables

[[toc]]

PowerGrid mixes `TestActions` into Livewire's `Testable`. Use the same [Livewire testing](https://livewire.laravel.com/docs/testing) flow, then the helpers below.

## Pest Browser Testing

[Pest Browser Testing](https://pestphp.com/docs/browser-testing) drives the real UI. Example: type into the search field and assert which rows remain.

```php [tests/Browser/ProductTableTest.php]
it('can filter products', function () {
    $this->withVite();

    $searchField = '[wire\:model\.live\.debounce\.700ms="search"]';

    visit('/products')
        ->assertSee('Arkansas Possum Pie')
        ->assertSee('Bacalhau')
        ->fill($searchField, 'Bacalhau')
        ->assertDontSee('Arkansas Possum Pie')
        ->assertSee('Bacalhau');
});
```

## Livewire Testing

::: warning Disable partials in tests
Search, sort, pagination, `resetPage()`, and filter changes send only the changed [hot zones](/extending/partials-and-hot-zones.html) and skip the full render. `Livewire::test()` keeps the last full render, so `assertSee()` / `assertDontSee()` check stale rows after those updates. Turn partials off for the test suite:

```xml [phpunit.xml]
<env name="POWERGRID_PARTIALS_ENABLED" value="false"/>
```
:::

### Testing Actions Buttons

See [action button](/performance-and-look/buttons.html). Helpers read `__turbine_actions` on the current page rows (collected in tests).

```php [app/Livewire/ProductTable.php]
public function actions($row): array
{
    return [
        Button::add('view')
            ->icon('icons.eye', [
                'class' => '!text-green-500',
            ])
            ->slot('View')
            ->class('text-slate-500 flex gap-2 hover:text-slate-700 hover:bg-slate-100 font-bold p-1 px-2 rounded')
            ->dispatch('clickToEdit', ['productId' => $row?->id, 'productName' => $row?->name]),
    ];
}
```

### assertHasAction

```php [tests/Livewire/ProductTable.php]
it('should be able to see "view" action', function () {
    livewire(ProductTable::class)
        ->assertHasAction('view');
});
```

### assertActionContainsAttribute

```php [tests/Livewire/ProductTable.php]
it('should be able to see "class" attribute in "view" action', function () {
    livewire(ProductTable::class)
        ->assertActionContainsAttribute(
            action: 'view',
            attribute: 'class',
            expected: 'flex gap-2 hover:text-slate-700'
        );
});
```

### wire:click - assertActionContainsAttribute

```php [tests/Livewire/ProductTable.php]
it('should be able to see "wire:click" in "view" action', function () {
    livewire(ProductTable::class)
        ->assertActionContainsAttribute(
            action: 'view',
            attribute: 'wire:click',
            expected: 'clickToEdit',
            expectedParams: ['productId' => 29, 'productName' => 'Luan']
        );
});
```

### assertActionHasIcon

```php [tests/Livewire/ProductTable.php]
it('should be able to see the "icons.eye" icon in "view" action', function () {
    livewire(ProductTable::class)
        ->assertActionHasIcon(
            action: 'view',
            icon: 'icons.eye',
            iconClass: '!text-green-500'
        );
});
```

Signatures from `Testing\TestActions`:

- `assertHasAction(string $action)`
- `assertActionContainsAttribute(string $action, string $attribute, string $expected, array $expectedParams = [])`
- `assertActionHasIcon(string $action, string $icon, ?string $iconClass = null)`

## Testing Dropdown and Flyout Filters

Panel modes (`dropdown` and `flyout`) never filter live. Edits land in `draftFilters` and commit on `applyFilters()`. Drive them through the draft:

```php [tests/Feature/ProductTableTest.php]
Livewire::test(ProductTable::class)
    ->call('fetchDatasource')
    ->set('draftFilters.name.value', 'pizza')
    ->call('applyFilters')
    ->assertSee('Pizza')
    ->assertDontSee('Salad');
```

The bag is keyed by field (`draftFilters.{field}.value`). Date ranges use the Flatpickr `formatted` string, here for `Filter::datetimepicker('created_at')`:

```php [tests/Feature/ProductTableTest.php]
Livewire::test(ProductTable::class)
    ->call('fetchDatasource')
    ->set('draftFilters.created_at.value.formatted', '2026-08-04 00:00 to 2026-08-06 23:59')
    ->call('applyFilters');
```

See [Filter Position](/table-structure/filters.html#filter-position).
