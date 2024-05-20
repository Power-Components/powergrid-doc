# Install

This section covers how to install PowerGrid Laravel in your Laravel Application.

Here you will find:

[[toc]]

## Requirements

- PHP 8.1+
- [Laravel 10+](https://laravel.com/docs/installation)
- [Livewire 3.0+](https://livewire.laravel.com)
- [Tailwind v3](https://tailwindcss.com/docs/guides/laravel) or [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## Installation

### 1. Install the package

First, require PowerGrid via [Composer](https://getcomposer.org/). Run the following command in your Laravel project.

```bash
composer require power-components/livewire-powergrid
```

### 2. Publish Config files

Next, publish PowerGrid's config file. This file is used to configure PowerGrid, it will be available at: `config/livewire-powergrid.php`.

Run the following command:

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

### 3. Configure PowerGrid

<div class="success custom-block">
  <p class="custom-block-title">🎉 All done!</p>
  <p>Let's go on and <a href="/get-started/powergrid-configuration.html#initial-configuration">configure</a> PowerGrid!</p>
</div>

## Optional Steps

This subsection covers optional installations steps.

These steps are only necessary if you wish to customize PowerGrid resources.

### Publish Views

To publish Views, run the following command:

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```

### Publish Translations

To publish PowerGrid translation (language) files, run the following command:

```bash
php artisan vendor:publish --tag=livewire-powergrid-lang
```
