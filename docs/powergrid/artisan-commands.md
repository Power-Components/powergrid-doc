---
title: Artisan Commands
description: PowerGrid artisan commands generate tables, publish stubs or the export job, and generate PhpStorm theme metadata. Config, language files, and views use Laravel vendor:publish tags.
---

# Artisan Commands

[[toc]]

PowerGrid registers three artisan commands. Config, translations, and Blade views are published with Laravel's `vendor:publish`, not `powergrid:*`.

| Command                              | What it does                                      |
| ------------------------------------ | ------------------------------------------------- |
| `php artisan powergrid:create`       | Interactive table generator                       |
| `php artisan powergrid:publish`      | Publish the export job or the model stub          |
| `php artisan powergrid:generate-theme-meta` | Write `.phpstorm.meta.php` for `theme()` / `theme_view()` |

| `vendor:publish` tag             | What it copies                         |
| -------------------------------- | -------------------------------------- |
| `livewire-powergrid-config`      | `config/livewire-powergrid.php`        |
| `livewire-powergrid-lang`        | Language files                         |
| `livewire-powergrid-views`       | Blade views                            |

## Create Table

```bash
php artisan powergrid:create
```

Pass a custom stub with `--template` (path relative to the project root):

```bash
php artisan powergrid:create --template=stubs/custom-component.stub
```

The interactive flow, datasource types, and fillable vs table-schema import are in [Create a PowerGrid Table](/get-started/create-powergrid-table.html). For subdirectories, stubs, and namespace, see [Create PowerGrid Tables](/powergrid/create.html).

::: tip
To change where components are generated or which model directories are scanned, see [Application Structure](/powergrid/configuration-options.html#application-structure).
:::

## Publish Config File

```bash
php artisan vendor:publish --tag=livewire-powergrid-config
```

## Publish Language Files

Copies translations into your app so you can override labels. See [Internationalization](/powergrid/internationalization.html).

```bash
php artisan vendor:publish --tag=livewire-powergrid-lang
```

## Publish Stubs

`powergrid:publish` defaults to `--type=job`. Use `--type=stub` for the Eloquent model stub:

```bash
php artisan powergrid:publish --type=stub
```

This copies `table.model.stub` to `stubs/table.model.stub`. Duplicate it and pass the copy with `--template` on [Create Table](#create-table). To overwrite an existing file, pass `--force=1` (the option takes a value; a bare `--force` does not overwrite).

## Publish Export Job

```bash
php artisan powergrid:publish --type=job
```

Writes `app/Jobs/ExportJob.php` from the package export job (namespace rewritten to `App\Jobs`). This is the command default when `--type` is omitted.

## Publish Views

```bash
php artisan vendor:publish --tag=livewire-powergrid-views
```

Copied views live under `resources/views/vendor/livewire-powergrid` and are **not** updated when you upgrade PowerGrid.

::: danger
Publishing Blade views may cause **breaking changes**. Proceed only if you understand the risks and are prepared to maintain the customized views in future updates.
:::

## Generate PhpStorm meta

`theme()` and `theme_view()` take string keys. This command writes `.phpstorm.meta.php` in the project root so PhpStorm can autocomplete token names and view aliases.

```bash
php artisan powergrid:generate-theme-meta
```

Regenerate it after you change theme tokens.
