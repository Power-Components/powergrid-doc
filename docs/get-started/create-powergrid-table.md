# Create a PowerGrid Table

This section covers the the process of creating a PowerGrid Component.

Here you will find:

[[toc]]

## Introduction

Now that you've finished the PowerGrid [Essential Configuration](/get-started/powergrid-configuration.html#essential-configuration), it's time create your very first Table Component!

## Create a Table

To create a PowerGrid Table, run the following command in your Laravel project.

```bash
php artisan powergrid:create  
```

The assistant will guide you through the process and help you generate your Table Component.

### 1. Name the Component

First, you need to name your new Table Component.

In this example, let's create a component called "__DishTable__" to list all dishes in a food menu.

```shell
     __     ____                          ______     _     __
    / /_,  / __ \____ _      _____  _____/ ____/____(_)___/ /
    /_ ,' / /_/ / __ \ | /| / / _ \/ ___/ / __/ ___/ / __  / 
    /'   / ____/ /_/ / |/ |/ /  __/ /  / /_/ / /  / / /_/ /  
        /_/    \____/|__/|__/\___/_/   \____/_/  /_/\__,_/     

 ┌ What is the name of your Table Component? ───────────────────┐
 │ DishTable                                                    │
 └──────────────────────────────────────────────────────────────┘
```

To create your Component in a subdirectory, just enter the directory path followed by the component name. For example: `Tables/Dishes/DishTable`.

If your application is organized in a different architecture (E.g, Domain-Driven Design), proceed to read more on how to configure a [Custom Namespace](/get-started/powergrid-configuration.html#custom-namespace) for PowerGrid Components.

---

### 2. Select the Data Source

Now, configure the data source from which your Table will pull data from.

<br/>

#### 2.1. Select the data source

Select the data source type.

In our example, we will use Laravel's [Eloquent Builder](https://laravel.com/docs/eloquent).

```shell
 ┌ What type of data source will you use? ──────────────────────┐
 │ › ● Eloquent Builder                                         │
 │   ○ Query Builder                                            │
 │   ○ Collection                                               │
 └──────────────────────────────────────────────────────────────┘
```

<br/>

#### 2.2. Model

Here, you need to select a Model to be linked to the component.

Following our example, we will use the `Dish` Model.

```shell
 ┌ Select a Model or enter its Fully qualified name. ───────────┐
 ├──────────────────────────────────────────────────────────────┤
 │› App\Models\Dish                                             │
 │  App\Models\FooBar                                           │
 │  App\Models\FoorBarBaz                                       │
 └──────────────────────────────────────────────────────────────┘
```

By default, PowerGrid suggests Eloquent Models placed in the default path `app/Models`. 

You can customize the [Auto-Discover Models](/get-started/powergrid-configuration.html#auto-discover-models) if your application is organized in a different architecture (E.g, Domain-Driven Design).

<br/>

#### 2.3. Auto-import Fields

PowerGrid can automatically generate Table Fields, Columns and Filters from your data source.

```shell
 ┌ Auto-import Data Source fields from [Dish] Model? ───────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

Answering "no" generates a Component containing only the `Action` Column, and you can add your Fields and Columns manually later.

*Note: This feature is available only for MySQL, PostgreSQL, and SQLite databases.*

<br/>

#### 2.4. Select the Field Source

Next, choose where the fields should be read from.

- **`$fillable`** (default): only the fields listed in your Model's `fillable` property, plus the primary key and `created_at`. This is PowerGrid's long-standing behavior, unchanged.
- **DB table**: every column of the table your Model is mapped to, read directly from the database schema.

Both options remain available - just press `Enter` to keep using `$fillable`.

Reading from the database table is handy when your Model keeps a short `fillable` list, or has no `fillable` at all because it relies on `guarded`.

In our example, let's read all columns from the `dishes` table.

```shell
 ┌ Where should the fields come from? ──────────────────────────┐
 │   ○ $fillable in [Dish] Model                                │
 │ › ● Columns in [dishes] DB table                             │
 └──────────────────────────────────────────────────────────────┘
```

This question is only asked for **Eloquent Builder** data sources. Query Builder Components always read the columns of the table you informed in the previous step.

Columns holding sensitive data (`password`, `remember_token`, `email_verified_at`, `two_factor_secret`, `two_factor_recovery_codes` and `api_token`) are never generated. Attributes listed in your Model's `hidden` property are skipped as well.

<br/>

#### 2.5. Preview and Confirm the Fields

Before writing anything to disk, PowerGrid shows exactly what it is about to generate and asks for your confirmation.

```shell
 👀 Preview of the fields from the [dishes] table:

 +------------+----------+---------------------------------------------------+
 | Field      | Type     | Generated as                                      |
 +------------+----------+---------------------------------------------------+
 | id         | integer  | Plain column                                      |
 | name       | string   | Sortable, searchable column + text filter         |
 | in_stock   | boolean  | Toggleable column + boolean filter                |
 | created_at | datetime | Sortable column, formatted d/m/Y H:i:s + datetime |
 +------------+----------+---------------------------------------------------+

 ┌ Generate the component with these fields? ───────────────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

Each column type generates a different set of Fields, Columns and Filters:

| Type       | Generated as                                                     |
|------------|------------------------------------------------------------------|
| `integer`  | Plain Column.                                                     |
| `string`   | Sortable and searchable Column + [Text Filter](/table-features/filters.html#text-filter). |
| `boolean`  | [Toggleable](/table-features/columns.html#toggleable) Column + [Boolean Filter](/table-features/filters.html#boolean-filter). |
| `date`     | Sortable Column formatted as `d/m/Y` + [Date Picker Filter](/table-features/filters.html#date-picker-filter). |
| `datetime` | Sortable Column formatted as `d/m/Y H:i:s` + [Datetime Picker Filter](/table-features/filters.html#datetime-picker-filter). |
| other      | Sortable and searchable Column, without Filter.                   |

Answering "no" discards the fields and generates the Component with only the `Action` Column. Just run the command again if you want to try the other source.

If the table cannot be read - for example, when your database has not been migrated yet - PowerGrid warns you and generates the Component with only the `Action` Column.

<br/>

### 3. Use Your Table

⚡ Your PowerGrid Table is ready!

At this step, you should see a message that looks like this:

```plain
⚡ DishTable was successfully created at [app/Livewire/DishTable.php].

💡 include the DishTable component using the tag: <livewire:dish-table/>
```

In the feedback message, you will find:

- The file path where your Component was created.
- The HTML tag to include it in your Blade View.

<br/>

<div class="success custom-block">
  <p class="custom-block-title">🎉 That's it!</p>
  <p>Now we can proceed to the <a href="/get-started/rendering-a-powergrid-table">Show a PowerGrid Table</a> section.</p>
</div>

## Customize the Component Creation

### Component Stubs

You may customize the default PowerGrid Component, adapting it to your needs.

To publish the stub, run the following command:

```bash
php artisan powergrid:publish --type=stub
```

If you need to create multiple stubs, be sure to rename the file after publishing each stub.

You may use the flag `--template` passing the full location of your stub when creating a new component.

```bash
php artisan powergrid:create --template=stubs/custom-component.stub
```

### Custom Namespace

See [Custom Namespace](/get-started/powergrid-configuration.html#custom-namespace).

### Custom Model Location

See [Auto-Discover Models](/get-started/powergrid-configuration.html#auto-discover-models).

