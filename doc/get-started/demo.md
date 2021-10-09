# Demo

Requirements

- PHP 7.4.1+
- [Laravel 8x]

----

PowerGrid offers you a demo Table with just 2 commands.

This table make use of the `User Model` and generates data on the fly. No data is saved in your database.

To run it, require PowerGrid via [Composer](https://getcomposer.org/). Run:

```bash
composer require power-components/livewire-powergrid
```

Next, generate the demo. Run the command:

```bash
php artisan powergrid:demo
```

You must include the route below in your `routes/web.php` file:

``Route::view('/powergrid', 'powergrid-demo');`

Now, just access `http://your.app/powergrid` and click around!

----

We also provide a full Laravel installation with PowerGrid.

Visit our [Demo repository](https://github.com/Power-Components/powergrid-demo)  and follow the README instructions on how to install and run it.
