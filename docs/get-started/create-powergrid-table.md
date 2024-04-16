# Create a PowerGrid Table

::: warning
You must have PowerGrid [installed](install.html#installation) and properly [configured](configure.html?id=configure#configure) before proceeding.
:::

## Create Command

To create a PowerGrid table, run the following command:

```bash
php artisan powergrid:create  
```

<br>

Now, just answer each question presented by the wizard.

### Component Name

Enter the name of your new PowerGrid Component.

Give a name to your PowerGrid Table component.

If you wish to create your component in a subdirectory, just enter the directory path. For example: `Tables/Dishes/DishTable`.

If your application is organized in a different architecture (E.g, Domain-Driven Design), proceed to read more on how to configure [Component's Custom Namespace](#component-s-custom-namespace).

In this example, let's create a component called `DishTable`.

```shell
  > php artisan powergrid:create
     __     ____                          ______     _     __
    / /_,  / __ \____ _      _____  _____/ ____/____(_)___/ /
    /_ ,' / /_/ / __ \ | /| / / _ \/ ___/ / __/ ___/ / __  / 
    /'   / ____/ /_/ / |/ |/ /  __/ /  / /_/ / /  / / /_/ /  
        /_/    \____/|__/|__/\___/_/   \____/_/  /_/\__,_/     

 ┌ What is the name of your Table Component? ───────────────────┐
 │ DishTable                                                    │
 └──────────────────────────────────────────────────────────────┘

```

---

### Component Datasource

Indicate if your component will use an Eloquent Builder, Query Builder or a Collection as data source.

Our example uses the Dish Eloquent Builder, so we choose accordingly.

```shell
 ┌ What type of data source will you use? ──────────────────────┐
 │ › ● Eloquent Builder                                         │
 │   ○ Query Builder                                            │
 │   ○ Collection                                               │
 └──────────────────────────────────────────────────────────────┘

```

---

### Component's Eloquent Model

Following our example, select a Model to be linked to your Component.

By default, PowerGrid suggest Eloquent Models placed in the default path `app/Models`.

If your application is organized in a different architecture (E.g, Domain-Driven Design), continue to read more about how to configure [Auto-Discover Models](#auto-discover-models).

In this example, let's select the `Dish` Eloquent Model under the FQN `App\Models\Dish`.

```shell
 ┌ Select a Model or enter its Fully qualified name. ───────────┐
 ├──────────────────────────────────────────────────────────────┤
 │› App\Models\Dish                                             │
 │  App\Models\FooBar                                           │
 │  App\Models\FoorBarBaz                                       │
 └──────────────────────────────────────────────────────────────┘

```

---

### Fillable Columns

PowerGrid can create columns based on your Model's `fillable` property.

Supported databases are: MySQL, PostgreSQL and SQLite.

If desirable, select `yes` to use this feature.

::: warning
If you don't use the `id` column as the primary key, you should make sure your model is `protected $primaryKey = null`;
:::

```shell
 ┌ Create columns based on Model's fillable property? ──────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

### All done

Now you may follow PowerGrid's indication on how to use your newly created component.

You will see something similar to the example below.

```shell
 ⚡ DishTable was successfully created at [app/Livewire/DishTable.php].

 💡 include the DishTable component using the tag: <livewire:dish-table/>
```

## Component's Custom Namespace

By default, PowerGrid will create components following the location specified under Livewire's Config Key `livewire.class_namespace`.

To adjust the configuration, run: `php artisan livewire:publish --config` to publish the file `config/livewire.php`.

The example below changes the namespace to "Domain".

```php
//config/livewire.php

    /*
    |---------------------------------------------------------------------------
    | Class Namespace
    |---------------------------------------------------------------------------
    */

    'class_namespace' => 'Domain',
```

Now, your components will be created inside the top `/Domain` directory.

The next example will create a component `ClientList` inside the path `/Domain/Client/Tables`

```shell
  > php artisan powergrid:create

 ┌ What is the name of your Table Component? ───────────────────┐
 │ Client\Tables\ClientList                                     │
 └──────────────────────────────────────────────────────────────┘

```

Resulting in:

```shell
 ⚡ ClientList was successfully created at [Domain/Client/Tables/ClientList.php].

 💡 include the ClientList component using the tag: <livewire:client.tables.client-list/>
```

## Auto-Discover Models

By default, PowerGrid auto discovers Models living in the directory `app/Models/`.

If your application is organized in a different architecture (E.g, Domain-Driven Design), you may add other directory paths inside the configuration key `livewire-powergrid.auto_discover_models_paths` in PowerGrid's [configuration file](/get-started/install.html#_2-publish-config-files).

The example below adds the main directory `/Domain` to be scanned for Eloquent Models.

```php
//config/livewire-powergrid.php

    /*
    |--------------------------------------------------------------------------
    | Auto-Discover Models
    |--------------------------------------------------------------------------
    |
    | PowerGrid will search for Models in the directories listed below.
    | These Models be listed as options when you run the
    | "artisan powergrid:create" command.
    |
    */

    'auto_discover_models_paths' => [
        //app_path('Models'),
        base_path('Domain'),
    ],
  ```

As a result, when creating a PowerGrid component, all Models under `/Domain` will be available in the select list.

```shell
 ┌ Select a Model or enter its Fully qualified name. ───────────┐
 ├──────────────────────────────────────────────────────────────┤
 │› Domain\Dish\Models\Dish                                     │
 │  Domain\Invoice\Models\Invoice                               │
 │  Domain\User\Models\User                                     │
 └──────────────────────────────────────────────────────────────┘

```

## Using Stubs

PowerGrid can have multiple stubs, follow this step:

* Publish
* Make the changes
* Rename if necessary
* Use it using `--template` when creating

---

## Publish command

::: info
If you need to create multiple stubs, be sure to rename them before publishing.
:::

```bash
php artisan powergrid:publish --type=stub
```

## Create with template

`--template`=full location of the stub template

```bash
php artisan powergrid:create --template=stubs/table.model.stub
```
