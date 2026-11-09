---
title: PowerGrid Documentation - Introduction
description: Livewire PowerGrid builds data tables for Laravel Livewire with tabs, filters, search, inline editing and export.
---

# Introduction

Livewire PowerGrid is a data table for [Laravel Livewire](https://livewire.laravel.com). You describe columns, filters and actions in one PHP class; PowerGrid renders the table with Tailwind CSS, DaisyUI or Flux.

<TablePreview />

Ready to build one? Go to [Install](/get-started/install).

## When to use it

| Use case | Typical table |
| :--- | :--- |
| Admin lists | Users, orders, products, invoices with inline edits, bulk actions and rules |
| Reporting | Leads and metrics with date-range filters, totals and XLSX/CSV export |
| Work queues | Enrollments, tickets, incidents split by status tabs |

PowerGrid is not an admin panel, a UI kit or a drag-and-drop builder. It renders tables only.

## Features

| Area | What you get |
| :--- | :--- |
| Finding rows | [Search](/data-management/searching-data), [sorting](/data-management/sorting-data), [filters](/table-structure/filters) (inline, dropdown, flyout), [filter builder](/table-structure/filter-builder), [tabs](/table-structure/tabs), [pagination](/table-structure/pagination) |
| Actions | [Inline editing](/data-management/editing-data), toggles, [row buttons](/table-structure/row-buttons), [bulk actions](/table-structure/bulk-actions), [conditional rules](/table-structure/conditional-rules) |
| Data | [Summaries](/data-management/summarizing-data) with `summarize()` (sum, count, avg, min, max), [XLSX/CSV export](/data-management/exporting-data) via OpenSpout, queued for large datasets |
| Look | Tailwind CSS 4, DaisyUI or Flux, [theme overrides](/performance-and-look/ui-theme-override), [responsive layout](/performance-and-look/responsive-layout) |
| Architecture | Server-side actions in Blade, [Hot Zones](/extending/partials-and-hot-zones), [portable grid definitions](/extending/portable-grid-definitions), [PowerGrid Lite](/powergrid-lite/blade-components), [plugins](/extending/plugin-system) |
| Search engines | Laravel Scout macros when `laravel/scout` is installed |
| Language | [20 translations](/powergrid/internationalization) |

## Sponsors

PowerGrid is open source. [Sponsor the creators on GitHub](https://github.com/sponsors/luanfreitasdev) to keep it going.

<div class="sponsors">
  <a class="featured" href="https://devsquad.com" target="_blank" rel="noopener">
    <img src="/sponsors/devsquad.png" alt="DevSquad">
    <small>Main sponsor</small>
  </a>
  <a href="https://www.jetbrains.com/phpstorm/" target="_blank" rel="noopener">
    <img src="/sponsors/phpstorm.png" alt="">
    <span>PhpStorm<small>Supported by</small></span>
  </a>
  <a href="https://www.araxis.com/merge/" target="_blank" rel="noopener">
    <img src="/sponsors/araxis.png" alt="">
    <span>Araxis Merge<small>Supported by</small></span>
  </a>
</div>

## Credits

Created by [Luan Freitas](https://twitter.com/luanfreitasdev) and [@DanSysAnalyst](https://github.com/dansysanalyst), with over [100 contributors](https://github.com/Power-Components/livewire-powergrid/graphs/contributors) and our sponsors. Logo and artwork by [Caneco](https://github.com/caneco).
