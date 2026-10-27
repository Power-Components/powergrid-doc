---
title: Partials and Hot Zones
description: Partials and Hot Zones update only the HTML fragments affected by sorting, filtering, searching, pagination, and tabs.
---

# Partials and Hot Zones

[[toc]]

PowerGrid uses `power-components/partials` to isolate DOM updates. A sort, search, filter, page change, or tab switch renders only the affected fragments (Hot Zones) server-side, and the browser morphs only those elements instead of the whole Livewire component.

If `partials()` is not available, PowerGrid falls back to a full-component render. Set `POWERGRID_PARTIALS_ENABLED=false` (config `powergrid-partials.enabled`) to force full renders, for example in `Livewire::test()` suites. See [Testing Tables](/powergrid/testing-tables.html#livewire-testing).

## Hot Zones

Names include the table's `$tableName`.

| Hot Zone        | Partial name                     | Updated when                                     |
| --------------- | -------------------------------- | ------------------------------------------------ |
| Table head      | `pg-thead-{tableName}`           | Sort (header indicators)                         |
| Table body      | `pg-tbody-{tableName}`           | Search, sort, filter, paginate, per-page change  |
| Pagination      | `pg-pagination-{tableName}`      | Search, sort, filter, paginate, per-page change  |
| Filter fields   | `pg-filter-fields-{tableName}`   | Filter panel contents (dropdown / flyout mode)   |
| Filter trigger  | `pg-filter-trigger-{tableName}`  | Filter button / badge in flyout mode             |
| Enabled filters | `pg-enabled-filters-{tableName}` | Active filter pills                              |
| Tabs            | `pg-tabs-{tableName}`            | Tab change, search, filter (badge counts)        |

### Zone Update Map

| User action     | Zones updated                                                      |
| --------------- | ------------------------------------------------------------------ |
| Search          | tbody + pagination + tabs                                          |
| Sort            | thead + tbody + pagination                                         |
| Filter          | tbody + pagination + filter fields / trigger + enabled filters + tabs |
| Paginate        | tbody + pagination                                                 |
| Per-page change | tbody + pagination                                                 |
| Tab change      | tabs + tbody + pagination                                          |

## How Partials Preserve User Input

The search input uses `wire:partial.ignore="pg-search-{tableName}"` so it is not overwritten during a partial morph. Cursor position and typed text stay intact when other zones update.

Inline filters use `wire:partial.ignore="pg-inline-filters-{tableName}"` for the same reason.

## Requirements

`power-components/partials` is a Composer dependency of PowerGrid. No extra configuration is needed beyond the [installation guide](/get-started/install.html).

::: info
Partials require Livewire 4+ and work with all PowerGrid themes.
:::
