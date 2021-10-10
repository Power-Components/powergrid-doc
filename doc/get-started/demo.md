# Demo

## Requirements

- PHP 7.4.1+ and [Laravel 8x](https://laravel.com/docs/8.x/installation)

## Quick Demo Table

PowerGrid offers you a demo Table with just 2 commands.

The demo Table makes use of your `User Model` and generate data on the fly. No changes are saved in your database.

To run it, require PowerGrid via [Composer](https://getcomposer.org/). Run:

```bash
composer require power-components/livewire-powergrid
```

Next, generate the demo. Run the command:

```bash
php artisan powergrid:demo
```

You must include the route below in your `routes/web.php` file:

```php
//...

Route::view('/powergrid', 'powergrid-demo');
```

Now, just access `http://your.app/powergrid` and click around! We hope you like it!

> 💡 **TIP:**  To have PowerGrid fully running, proceeded to [Install](https://livewire-powergrid.docsforge.com/main/install/) and [Configure](https://livewire-powergrid.docsforge.com/main/install/).

----

## Demo Repository

We also provide a demo repository containing PowerGrid in a Laravel project.

Visit our the [repository](https://github.com/Power-Components/powergrid-demo)  and follow the README instructions on how to install and run it.
