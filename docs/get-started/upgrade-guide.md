# Upgrade Guide

## Upgrade From V4

PowerGrid is now on version 5.x.

This page will provide you with important information to upgrade from v4.x.

### Dependency Upgrades

The following items have been updated in this release:

* PHP 8.1+
* [Laravel Framework](https://laravel.com/) 10.0+
* [Laravel Livewire](https://livewire.laravel.com/) 3.0+
* [Tailwind](https://tailwindcss.com/) v3+

---

### Rename Filter, Rules imports


---

### Change Button caption to Button slot

```php
   Button::add('bulk-demo')
       ->caption('Bulk Action')
       ->class('...')

    Button::add('bulk-demo')
       ->slot('Bulk Action')
       ->class('...')
```
