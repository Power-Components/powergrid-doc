# Create a PowerGrid Table

::: warning
You must have PowerGrid [installed](install.html#installation) and properly [configured](configure.html?id=configure#configure) before proceeding.
:::

### Create Command

To create a PowerGrid table, run the following command:

```bash
php artisan powergrid:create  
```

<br>

Now, answer the question in your screen to complete the creation process:

**1. Enter the name of your PowerGrid Component.**

For example: `DishTable`.

```shell
  powergrid [main] ⚡  > php artisan powergrid:create
     __     ____                          ______     _     __
    / /_,  / __ \____ _      _____  _____/ ____/____(_)___/ /
    /_ ,' / /_/ / __ \ | /| / / _ \/ ___/ / __/ ___/ / __  / 
    /'   / ____/ /_/ / |/ |/ /  __/ /  / /_/ / /  / / /_/ /  
        /_/    \____/|__/|__/\___/_/   \____/_/  /_/\__,_/     

 ┌ What is the name of your Table Component? ───────────────────┐
 │ UserTable                                                    │
 └──────────────────────────────────────────────────────────────┘

```

---

**2. Indicate if your component will use a Eloquent Builder, Query Builder or a Collection as data source.**

This example uses Dish Eloquent Builder, so we choose `0`:

```shell
 ┌ What type of data source will you use? ──────────────────────┐
 │ › ● Eloquent Builder                                         │
 │   ○ Query Builder                                            │
 │   ○ Collection                                               │
 └──────────────────────────────────────────────────────────────┘

```

---

**3. If you choose Eloquent Builder, enter the path to your Model.**

In this example, the Dish Model is located at App\Models\Dish.

::: info
If you don't specify App\Models -powergrid will create based on default App\Models directory.
:::

```shell
┌ Enter your Model name or file path ───────────────────────────┐
 │ User                                                         │
 ├──────────────────────────────────────────────────────────────┤
 │   User                                                       │
 └──────────────────────────────────────────────────────────────┘

```

---

**4. Use Fillable?**

PowerGrid can create columns based on your Model's `fillable` property.

Supported databases are: MySQL, PostgresSQL and SQLite.

If desirable, type `yes` to use this feature.

::: warning
If you don't use the 'id' column as the primary key, you should make sure your model is `protected $primaryKey = null`;
:::

```shell
┌ Create columns based on Model's fillable property? ───────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

**⚡ PowerGrid Table created!**

PowerGrid indicates the location where your new Table component was created.

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

