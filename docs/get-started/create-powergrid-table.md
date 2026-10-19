---
title: Create a PowerGrid Table
description: Follow this straightforward walkthrough to generate your PowerGrid data table and see how quickly it handles your data.
---

# Create a PowerGrid Table

[[toc]]

## Creating a PowerGrid Table

After [base configuration](/get-started/configure-powergrid.html), run `php artisan powergrid:create`. This walkthrough creates a `ProductTable`. For flags and stubs, see [Create Table Command](/powergrid/artisan-commands.html#create-table).

### 1. Component name

```bash
$ php artisan powergrid:create
⚡ PowerGrid Table Generator

Enter a name for your new PowerGrid Table: ProductTable
```

`CamelCase` is recommended. The default suggestion is `UserTable`. If the component already exists, the generator asks before overwriting it.

### 2. Datasource

```bash
 ┌ Select your preferred DataSource: ───────────────────────────┐
 │ › Eloquent Builder                                           │
 │   Query Builder                                              │
 │   Collection                                                 │
 └──────────────────────────────────────────────────────────────┘
```

See [DataSource](/table-structure/datasource.html) for when to use each type. This example uses [Eloquent Builder](https://laravel.com/docs/eloquent).

### 3. Model (Eloquent)

Eloquent asks for a Model. Collection skips this step. Query Builder asks for a database table instead (see [Query Builder](#query-builder)).

```bash
 ┌ Select a Model or enter its Fully qualified name. ───────────┐
 ├──────────────────────────────────────────────────────────────┤
 │› App\Models\Product                                          │
 │  App\Models\FooBar                                           │
 │  App\Models\FoorBarBaz                                       │
 └──────────────────────────────────────────────────────────────┘
```

By default, PowerGrid lists Models under `app/Models`. Change that in [Customizing the Creation Process](/powergrid/create.html#customizing-the-creation-process).

### 4. Auto-import fields

```bash
 ┌ Auto-import Data Source fields from [Product] Model? ────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

Answer **No** to skip import. The default stub still includes sample `id` / `name` / `created_at` columns plus Action.

If the database has no tables, this prompt is skipped.

### 5. Column source (Eloquent only)

Eloquent then asks where the fields should come from. Query Builder does not ask this — it always reads the selected table.

```bash
 ┌ Where should the fields come from? ──────────────────────────┐
 │ › $fillable in [Product] Model                               │
 │   Columns in [products] DB table                             │
 └──────────────────────────────────────────────────────────────┘
```

### 6. Preview and confirm

```bash
👀 Preview of the fields from $fillable in [Product]:

  Field      Type      Generated as
  id         integer   Plain column
  name       string    Sortable, searchable column + text filter
  price      other     Sortable, searchable column
  in_stock   boolean   Toggleable column + boolean filter
  created_at datetime  Sortable column, formatted d/m/Y H:i:s + datetime filter

 ┌ Generate the component with these fields? ───────────────────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

The **Type** column is the bucket the database type maps to:

| Type       | Database types                                      | Generated as                                                  |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `string`   | `varchar`, `char`, `text` variants, `uuid`, `enum`  | `sortable()` + `searchable()` + `Filter::inputText()`         |
| `integer`  | `int` variants, `serial`                            | Plain column, no filter                                       |
| `boolean`  | `bool`, `bit`, `tinyint(1)`                         | `toggleable()` + `Filter::boolean()`                          |
| `date`     | `date`                                              | `sortable()`, formatted `d/m/Y` + `Filter::datepicker()`      |
| `datetime` | `datetime`, `timestamp` variants                    | `sortable()`, formatted `d/m/Y H:i:s` + `Filter::datetimepicker()` |
| `other`    | anything else (`decimal`, `json`, …)                | `sortable()` + `searchable()`, no filter                      |

With `$fillable`, fields are ordered primary key, `$fillable`, then `created_at`. The model's `$hidden` attributes are always skipped, and the table-schema source also skips sensitive columns (`password`, `remember_token`, `api_token`, and similar). If the source has no fields, only the Action column is generated.

Answer **No** to discard the preview. The generator then uses the default stub (sample `id` / `name` / `created_at` plus Action), same as declining auto-import.

### 7. Done

```bash
⚡ ProductTable was successfully created at [app/Livewire/ProductTable.php].

💡 include the ProductTable component using the tag: <livewire:product-table/>
```

<div class="success custom-block">
<p class="custom-block-title">🎉 Everything is in place</p>
<p>Next: <a href="/get-started/rendering-a-powergrid-table.html">Render a PowerGrid Table</a>.</p>
</div>

## Query Builder

Query Builder asks for a table instead of a Model, then the same auto-import prompt. It does not ask column source.

```bash
 ┌ Select your preferred DataSource: ───────────────────────────┐
 │   Eloquent Builder                                           │
 │ › Query Builder                                              │
 │   Collection                                                 │
 └──────────────────────────────────────────────────────────────┘

 ┌ Enter or Select a DB Table ──────────────────────────────────┐
 │ products                                                     │
 └──────────────────────────────────────────────────────────────┘

 ┌ Auto-import Data Source fields from [products] table? ───────┐
 │ ● Yes / ○ No                                                 │
 └──────────────────────────────────────────────────────────────┘
```

Collection skips Model, table, auto-import, and preview.
