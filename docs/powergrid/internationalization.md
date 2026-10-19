---
title: Internationalization
description: Locales PowerGrid ships and how to override translations.
---

# Internationalization

[[toc]]

PowerGrid UI strings use Laravel's localization. If the app locale matches a shipped file, those translations are used.

## Supported Languages

Files live under `resources/lang/{locale}/datatable.php` in the package:

| Locale  | Language              |
| ------- | --------------------- |
| `ar`    | Arabic                |
| `bn_BD` | Bengali (Bangladesh)  |
| `ca`    | Catalan               |
| `cs`    | Czech                 |
| `de`    | German                |
| `en`    | English               |
| `es`    | Spanish               |
| `fa`    | Persian               |
| `fr`    | French                |
| `id`    | Indonesian            |
| `it`    | Italian               |
| `ms_MY` | Malay (Malaysia)      |
| `nl`    | Dutch                 |
| `pl`    | Polish                |
| `pt`    | Portuguese            |
| `pt_BR` | Brazilian Portuguese  |
| `ru`    | Russian               |
| `tr`    | Turkish               |
| `uk`    | Ukrainian             |
| `yr`    | Yoruba                |

## Customizing Translations

Publish the language files, then edit the copies in your app:

```bash
php artisan vendor:publish --tag=livewire-powergrid-lang
```

See [Publish Language Files](/powergrid/artisan-commands.html#publish-language-files).

## Add or Improve Translations

Strings follow [Laravel Localization](https://laravel.com/docs/localization). Add a locale or send fixes as a pull request to [Power-Components/livewire-powergrid](https://github.com/Power-Components/livewire-powergrid).
