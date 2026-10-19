---
title: Create PowerGrid Tables
description: Reference for the creation assistant — names, subdirectories, stubs, namespace, and model discovery.
---

# Create PowerGrid Tables

[[toc]]

Reference for `php artisan powergrid:create`. For the step-by-step walkthrough, see [Create a PowerGrid Table](/get-started/create-powergrid-table.html).

## Naming convention

Use `CamelCase`, for example `ProductTable`. The generator kebab-cases that name for the Livewire tag (`<livewire:product-table />`) and camel-cases it for `$tableName`, appending `Table` when the name does not end with it (`Product` → `productTable`).

## Creating Components in Subdirectories

Prefix the name with a path. `Tables/Product/ProductTable` writes `ProductTable` under `Tables/Product` inside Livewire's class namespace (default `app/Livewire`).

The Livewire tag uses dot notation: `<livewire:tables.product.product-table />`.

## Auto-import fields

Eloquent and Query Builder can auto-import columns. Collection cannot.

After you confirm auto-import:

- **Eloquent** — choose `$fillable` on the model **or** the database table schema.
- **Query Builder** — fields come from the table you selected. There is no fillable prompt.

If you decline auto-import or discard the preview, the generator uses the default stub (sample `id` / `name` / `created_at` columns plus Action). If the chosen source has no fields, only the Action column is generated.

## Customizing the Creation Process

### Component Stubs

Default stubs (under the package `resources/stubs/`):

| Datasource        | Stub                         | With auto-import                    |
| ----------------- | ---------------------------- | ----------------------------------- |
| Eloquent Builder  | `table.model.stub`           | `table.model.fillable.stub`         |
| Query Builder     | `table.query-builder.stub`   | `table.query-builder.fillable.stub` |
| Collection        | `table.collection.stub`      | —                                   |

Publish the Eloquent model stub:

```bash
php artisan powergrid:publish --type=stub
```

That copies `stubs/table.model.stub`. Duplicate it, then:

```bash
php artisan powergrid:create --template=stubs/custom-component.stub
```

`--template` is a path relative to the project root. When you pass it, the generator does not switch to a `.fillable.stub`.

### Custom Namespace

Components are written under Livewire's `class_namespace` (`config/livewire.php`). See [Custom Namespace](/powergrid/configuration-options.html#custom-namespace).

### Custom Model Location

The Eloquent model picker scans `livewire-powergrid.auto_discover_models_paths`. See [Auto-Discover Models](/powergrid/configuration-options.html#auto-discover-models).
