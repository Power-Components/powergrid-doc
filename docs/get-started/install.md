---
title: Install PowerGrid
description: Get PowerGrid up and running in just a few simple steps. This guide covers everything you need to cleanly integrate the package into your existing project.
---

# Install PowerGrid

[[toc]]

## Requirements

- PHP 8.3+
- [Laravel 12+](https://laravel.com/docs/installation) (Laravel 13 is supported)
- [Livewire 4+](https://livewire.laravel.com)
- [Tailwind CSS 4+](https://tailwindcss.com/docs/installation), [DaisyUI](https://daisyui.com), or [Flux](https://fluxui.dev)

## Installation

### 1. Install the package

```bash
composer require power-components/livewire-powergrid
```

Composer installs the required dependencies, including `power-components/turbine` and `power-components/partials`. Export is optional: it needs `openspout/openspout:^5.0`, see [Exporting Data](/data-management/exporting-data.html).

::: tip
Using [Laravel Boost](https://laravel.com/docs/boost)? Install or refresh PowerGrid's Agent Skills after requiring the package. See [AI Tools and Skills](/build-with-ai/tools-and-skills.html#laravel-boost) for details.
:::

### 2. Publish PowerGrid config file

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

The file lands at `config/livewire-powergrid.php`.

### 3. Configure PowerGrid

<div class="success custom-block">
<p class="custom-block-title">🎉 All set here</p>
<p>Next: <a href="/get-started/configure-powergrid.html">configure</a> PowerGrid.</p>
</div>
