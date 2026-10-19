---
title: PowerGrid Documentation - Introduction
description: Welcome to the official PowerGrid documentation. Explore how easily you can build beautiful, feature-rich data tables that save development time and enhance your data management.
---

# Welcome to PowerGrid

Livewire PowerGrid is a Livewire data table for Laravel. It handles columns, rows, sorting, filtering, pagination, and related features so you can ship an interactive table quickly.

Start at the [installation page](/get-started/install.html).

![Output](/screenshot.png)

## What it is for

Use PowerGrid when a static HTML table is not enough:

- **Ops and admin lists** — users, orders, products, invoices. Filter, edit inline, run bulk actions, and hide buttons with rules.
- **CRM and reporting** — leads, metrics, date-range filters, XLSX/CSV export, and column totals via `summarize()`.
- **Progress and policy tables** — enrollments, status tabs, rule clauses, incident queues.

## What it is not

- Not an admin panel or CMS (no dashboards or app navigation).
- Not a general UI kit (tables only).
- Not a drag-and-drop builder or realtime collaboration tool.

## Features

- **Theming** — Tailwind CSS 4, DaisyUI, Flux, or custom tokens via `theme_overrides`
- **Core table features** — Pagination, column sorting, filters (inline, dropdown, flyout), global search
- **Advanced features** — Custom filter builder, status tabs, inline editing, toggle switches, row buttons/checkboxes/dropdown menus, custom cell content, multi-row bulk actions, conditional action rules
- **Data & export** — Column summaries via `summarize()` (sum, count, avg, min, max), XLSX/CSV export (OpenSpout), queue export for large datasets
- **Architecture** — Server-side actions (Blade, no JS cache), Hot Zones for DOM isolation, portable grid definitions, PowerGrid Lite Blade components, plugin system, responsive
- **Laravel Scout compatible** — Conditional macros when `laravel/scout` is installed
- **Multi-language** — 🇺🇸 🇧🇷 🇪🇸 🇮🇹 🇩🇪 and more

## Sponsors

PowerGrid is an open-source project. You can support its development and sponsor creators via the GitHub repository.

<p>
  <a href="https://devsquad.com" target="_blank">
    <img src="/sponsors/devsquad.png" alt="DevSquad">
  </a>
</p>
<p>Supported by:</p>
<p>
  <a href="https://www.jetbrains.com/phpstorm/" target="_blank">
    <img src="/sponsors/phpstorm.png" alt="PHPStorm" width="32" height="32">
  </a>
  <a href="https://www.araxis.com/merge/" target="_blank">
    <img src="/sponsors/araxis.png" alt="Araxis Merge" width="32" height="32">
  </a>
</p>

## Credits

PowerGrid is an open-source project created by [Luan Freitas](https://twitter.com/luanfreitasdev) and [@DanSysAnalyst](https://github.com/dansysanalyst), built with the help of over [100 Contributors](https://github.com/Power-Components/livewire-powergrid/graphs/contributors) and the support of our sponsors.

Logo & artwork by [Caneco](https://github.com/caneco)
