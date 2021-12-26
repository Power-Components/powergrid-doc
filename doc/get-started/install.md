# Install

## Requirements

- PHP 7.4.1+
- [Laravel 8x](https://laravel.com/docs/8.x/installation)
- [Livewire 2x](https://laravel-livewire.com)
- [Tailwind](https://tailwindcss.com/docs/guides/laravel) or [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [Alpine 3x](https://alpinejs.dev/)

## Installation

### 1. Via Composer

Require PowerGrid via [Composer](https://getcomposer.org/), run:

```bash
composer require power-components/livewire-powergrid
```

### 2. Publish Config files

Publish PowerGrid configuration file. Run the following command:

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

The configuration file will be available at: `config/livewire-powergrid.php`.

### 3. Publish files (OPTIONAL)

Skip this step if you don't need to customize views or language files.

To publish Views, run:

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```

To publish Language files, run:

```bash
php artisan vendor:publish --tag=livewire-powergrid-lang
```
