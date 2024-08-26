# Upgrade Guide

## Upgrade From V5

This page will provide you with important information to upgrade from version 4.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.2+
* [Laravel Framework](https://laravel.com/) 10.0+
* [Laravel Livewire](https://livewire.laravel.com/) 3.0+
* [Tailwind](https://tailwindcss.com/) v3+

## Solve the necessary imports

#### Rename Filter class

```php{4}
use PowerComponents\LivewirePowerGrid\Filters\Filter; // [!code --]
use PowerComponents\LivewirePowerGrid\Facades\Filter; // [!code ++]
```

---
