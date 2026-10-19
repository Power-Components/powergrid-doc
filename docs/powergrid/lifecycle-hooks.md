---
title: Lifecycle Hooks
description: Customize PowerGrid's data flow at query, search, rows, and actions — after filtering and sorting, before Blade render.
---

# Lifecycle Hooks

[[toc]]

Override these methods on your table when default filtering, sorting, or action resolution is not enough. Defaults are no-ops (except `transformQuery()`, which also applies the active tab and a portable definition).

Actions are Blade on the server in v7. There is no client-side action cache.

`beforeSearch` is a convention method (not on `Hooks`). Field-specific `beforeSearch{Field}()` wins over the global hook.

## Pipeline Position

```text
+----------------------------------------+
|               Datasource               |
+----------------------------------------+
                    │
                    ▼
+----------------------------------------+
|      Filters / Search / Sorting        |
|      beforeSearch() runs here          |
+----------------------------------------+
                    │
                    ▼
             transformQuery()   ◀─ modify the builder before it hits the DB
                    │
                    ▼
+----------------------------------------+
|              Pagination                |
+----------------------------------------+
                    │
                    ▼
+----------------------------------------+
|          Data Transformation           |
+----------------------------------------+
                    │
                    ▼
               transformRows()  ◀─ enrich/modify the current page
                    │
                    ▼
+----------------------------------------+
|         Render Table (Blade)           |
|         transformActions() per row     |
+----------------------------------------+
```

## Transform Query

Runs after filters, search, and sorting, before pagination executes the query. Use it for eager loading, subqueries, `withCount()`, or query-level work that depends on the current filter state.

```php [app/Livewire/ProductTable.php]
public function transformQuery(mixed $query): mixed
{
    $query = parent::transformQuery($query); // keeps the active tab and definition() scope

    return $query
        ->withCount('comments')
        ->addSelect(DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products.id) as review_count'));
}
```

The default implementation applies the active [tab](/table-structure/tabs.html) scope and, if `definition()` returns a portable grid, `$definition->transformQuery($query)`. Call `parent::transformQuery()` when you override it, or tabs stop filtering.

## Before Search

Intercept the search string before it is applied. Use a global `beforeSearch($field, $search)` or a field-specific `beforeSearch{Field}($search)` (for `name`, that is `beforeSearchName`).

```php [app/Livewire/ProductTable.php]
public function beforeSearch(?string $field = null, ?string $search = null): ?string
{
    if ($field === 'phone') {
        return str($search)->replaceMatches('/[^0-9]+/', '')->toString();
    }

    return $search;
}
```

See [Searching Data](/data-management/searching-data.html#before-search-hook).

## Transform Rows

Runs after the query and field transformation, on the current page only. Use it to attach data that is not available at query time.

```php [app/Livewire/ProductTable.php]
use Illuminate\Support\Collection;

public function transformRows(Collection $rows): Collection
{
    $ids = $rows->pluck('id')->toArray();
    $apiData = ExternalApi::getByIds($ids);

    return $rows->map(function ($row) use ($apiData) {
        $row->external_score = $apiData[$row->id] ?? null;

        return $row;
    });
}
```

## Transform Actions

Runs per row while actions are rendered as Blade. `$actionsByRow` is keyed by that row's primary key; `$rows` is a one-row collection.

```php [app/Livewire/ProductTable.php]
public function transformActions(array $actionsByRow, Collection $rows): array
{
    foreach ($actionsByRow as $rowId => &$actions) {
        foreach ($actions as &$action) {
            if ($action['action'] === 'notifications') {
                $action['slot'] = 'Notifications';
            }
        }
    }

    return $actionsByRow;
}
```

Overriding this method also makes PowerGrid collect `__turbine_actions` on rows. In tests they are always collected (used by [testing helpers](/powergrid/testing-tables.html)).

## Other hooks

Also on `Hooks`: `onPluginUpdated()`, `afterFilterChanged()`, `tabQuery()`, `tabBadge()`, `beforeFilterBuilderApply()`, `validateFilterBuilder()`. `onUpdatedEditable()` and `onUpdatedToggleable()` exist as deprecated wrappers; plugins call `onPluginUpdated()` directly.
