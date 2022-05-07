# Demo

### Quick Demo Table

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


> 💡 **TIP:**  To have PowerGrid fully running, proceed to [Install](get-started/install?id=install) and [Configure](get-started/configure?id=configure).

----

### Demo Repository

We also provide a demo repository with PowerGrid fully configured in a Laravel project.

Visit the [repository](https://github.com/Power-Components/powergrid-demo) and follow the README instructions on how to install and run it.

<br/>

### Youtube

Check out some PowerGrid reviews and usage videos on Youtube:

- Livewire PowerGrid com Luan Freitas - Live Coding at [Live beer and code](https://www.youtube.com/watch?v=Mml5aagMOm4&t=20s) (🇧🇷 pt-BR)

- Livewire PowerGrid: Quick Datatable Package [REVIEW] by [Laravel Daily](https://www.youtube.com/watch?v=Qj0GLZJzDLY&t=4s)

- Tio Jobs Analisa As Novas Action Rules Do Pacote Power-Components PowerGrid by [Icaro Jobs](https://www.youtube.com/watch?v=8WLLHan1b-U) (🇧🇷 pt-BR)

- Laravel Livewire: Crea DataTables en Minutos con Powergrid [REVIEW] by [Code with Luis](https://www.youtube.com/watch?v=sV6Rs2y8fWk)

All videos were recorded by community members. If you like them, don't forget to hit 👍 Like, share and subscribe to their channels. Your reaction contributes to the community!

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/get-started/install">Install →</a></span>
</footer>
