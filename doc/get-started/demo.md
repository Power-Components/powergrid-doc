# Demo

## Requirements

- PHP 7.4.1+ and [Laravel 8x](https://laravel.com/docs/8.x/installation)

## Quick Demo Table

PowerGrid offers you a demo Table with just 2 commands.

The Table uses the structure of `User Model` and generate data on the fly. No changes are saved in your database.

First, require PowerGrid via [Composer](https://getcomposer.org/). Run:

```bash
composer require power-components/livewire-powergrid
```

Next, generate the demo. Run the command:

```bash
php artisan powergrid:demo
```

Now, you must include the route below in your `routes/web.php` file:

```php
<?php
//...

Route::view('/powergrid', 'powergrid-demo');
```

Everything is ready! Access `http://your-app.example/powergrid` (change *your-app.example* to your app domain) and click around!


> 💡 **TIP:**  To have PowerGrid fully running, proceed to [Install](https://livewire-powergrid.docsforge.com/main/install/) and [Configure](https://livewire-powergrid.docsforge.com/main/configure/).

----

## Demo Repository

We also provide a demo repository with PowerGrid fully configured in a Laravel project.

Visit the [repository](https://github.com/Power-Components/powergrid-demo) and follow the README instructions on how to install and run it.
