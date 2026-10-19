---
title: UI Theme Override
description: Override the default PowerGrid UI theme for a specific table to match your application's design or domain-specific layout needs.
---

# UI Theme Override

The global theme comes from `config('livewire-powergrid.theme')`. Override it on one table with `template()`.

[[toc]]

## `template()`

Return a `Theme` instance from `template()`. This is the v7 hook (`PowerGridComponent::template(): ?Theme`).

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Themes\Theme;
use App\PowerGridThemes\MyTheme;

class ProductTable extends PowerGridComponent
{
    public function template(): ?Theme // [!code ++:4]
    {
        return new MyTheme();
    }
}
```

`customThemeClass(): ?string` is **deprecated** (since 7.x). It still returns a class name (or a registered theme key). If both are set, `template()` wins.

```php [app/Livewire/ProductTable.php]
public function customThemeClass(): ?string
{
    return MyTheme::class;
}
```

Resolution in `boot()`: `template()` if it returns a `Theme`; otherwise `customThemeClass()`; otherwise `config('livewire-powergrid.theme')`.

## Patch Tokens on the Active Theme

You do not need a new class to change a few classes on one table. Call `merge()` on a built-in theme:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;
use PowerComponents\LivewirePowerGrid\Themes\Theme;

public function template(): ?Theme
{
    return Tailwind::make()->merge([
        'table' => [
            'layout' => [
                'tr' => 'stripe hover:bg-yellow-50',
            ],
        ],
    ]);
}
```

To restyle every table without PHP, use `theme_overrides` in config. See [Custom Theme](/extending/custom-theme.html).
