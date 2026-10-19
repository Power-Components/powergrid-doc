---
title: Custom Themes
description: Match PowerGrid to your brand. Override a few tokens from config, inherit Tailwind in a child theme, or author a data-first ArrayTheme.
---

# Custom Theme

[[toc]]

PowerGrid 7 separates HTML from CSS. Blade views read classes through `theme()`. A theme is a PHP class that returns a nested token map.

| Theme      | Role                                                                   |
| ---------- | ---------------------------------------------------------------------- |
| `Tailwind` | Root theme. Full section methods. `parentTheme` is `null`.             |
| `DaisyUI`  | Token-only subclass of Tailwind. Ships **zero** Blade files.           |
| `Flux`     | Subclass of Tailwind. Keeps `<flux:*>` blades only where HTML differs. |

Cheapest first:

1. `theme_overrides` in config
2. A Theme class with section methods (inherit Tailwind, override what differs)
3. `ArrayTheme` — the same tokens as a plain array

There is no Bootstrap theme class. Do not branch on `isBootstrap5()` or `theme_style()` — both are gone. Use `theme()` and the theme class.

## Selecting a Theme

`config/livewire-powergrid.php` accepts a registered name or an FQCN. See [UI Theme](/powergrid/configuration-options.html#ui-theme).

```php [app/Providers/AppServiceProvider.php]
use PowerComponents\LivewirePowerGrid\PowerGridManager;
use App\PowerGridThemes\MyTheme;

public function boot(): void
{
    PowerGridManager::registerTheme('my-theme', MyTheme::class);
}
```

```php [config/livewire-powergrid.php]
'theme' => 'my-theme',
```

## No-Code Overrides

`theme_overrides` merge last. Use them for a handful of class changes on every table. See [Theme Overrides](/powergrid/configuration-options.html#theme-overrides).

## Architecture

A theme extends `PowerComponents\LivewirePowerGrid\Themes\Theme`.

- `struct()` returns the base token tree (`ThemeBuilder` or `array`). Built-in themes use it only to set `baseView`; section tokens come from the section methods.
- Token groups are public methods: `layout()`, `header()`, `table()`, `footer()`, `cols()`, `tabs()`, plus `filter()`, `editable()`, `toggleable()`.
- `Theme::name()` is the kebab-cased class basename. Do **not** declare `public string $name`.
- Set `protected ?string $parentTheme = Tailwind::class` so undeclared sections inherit from Tailwind.
- Prefer tokens over new Blade files. Add a view only when the markup is genuinely different.

Resolution order:

1. Parent theme tokens
2. `struct()` (merged over the parent)
3. This theme's section methods
4. Plugin `themeTokens()`
5. `config('livewire-powergrid.theme_overrides')` — last, wins

## Creating a Child Theme

Usual path: branded Tailwind variant, same HTML, different classes.

```php [app/PowerGridThemes/MyTheme.php]
<?php

namespace App\PowerGridThemes;

use PowerComponents\LivewirePowerGrid\Themes\Theme;
use PowerComponents\LivewirePowerGrid\Themes\Components;
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;

class MyTheme extends Theme
{
    protected ?string $parentTheme = Tailwind::class;

    protected function baseView(): string
    {
        return 'livewire-powergrid::components.themes.tailwind';
    }

    public function struct(): Components\ThemeBuilder
    {
        return Components\ThemeBuilder::make($this->name())
            ->baseView($this->baseView());
    }

    public function table(): array
    {
        return $this->section('table', fn (Components\Table $table) => $table
            ->layout(fn (Components\Layout $layout) => $layout
                ->th('font-semibold px-3 py-3 text-left text-xs text-white whitespace-nowrap')
                ->td('px-3 py-2 whitespace-nowrap')
            )
        );
    }
}
```

Everything you do not override comes from Tailwind. DaisyUI is this pattern taken all the way: it ships no blades.

A section method can also return a plain nested array:

```php [app/PowerGridThemes/MyTheme.php]
public function footer(): array
{
    return [
        'footer' => [
            'pagination' => [
                'item' => 'btn btn-sm',
            ],
        ],
    ];
}
```

Register with `PowerGridManager::registerTheme()` or set `'theme' => \App\PowerGridThemes\MyTheme::class`.

Scan the class in Tailwind CSS:

```css [resources/css/app.css]
@source "../../app/PowerGridThemes/MyTheme.php";
```

Then rebuild with `npm run build` or `npm run dev`.

## Section Methods

Only override sections that differ from the parent theme.

| Method         | Builder                      | Typical tokens                                    |
| -------------- | ---------------------------- | ------------------------------------------------- |
| `layout()`     | `Components\Layout`          | `wrapper`, `card`                                 |
| `header()`     | `Components\Header`          | layout, searchBox, toggleColumns, filters, export |
| `table()`      | `Components\Table`           | layout, body/tr, checkbox, radio                  |
| `footer()`     | `Components\Footer`          | layout, `pagination` (string alias)               |
| `cols()`       | `Components\Cols`            | `div`                                             |
| `tabs()`       | `Components\Tabs`            | `list`, `tab`, `tabActive`, `badge`               |
| `filter()`     | array or `Components\Filter` | per-type classes, `dropdown.*`, `flyout.*`        |
| `editable()`   | `Components\Component`       | `clickable`, `input`, `error` — **no view**       |
| `toggleable()` | `Components\Component`       | color `fill()` tokens — **no view**               |

### Header and search

Search lives under `header()`, not as a top-level method.

```php [app/PowerGridThemes/MyTheme.php]
public function header(): array
{
    return $this->section('header', fn (Components\Header $header) => $header
        ->view('header')
        ->layout(fn (Components\Layout $layout) => $layout
            ->container('md:flex md:flex-row w-full justify-between items-center gap-3 p-4')
            ->actions('px-3 py-2 rounded-md')
        )
        ->searchBox(fn (Components\SearchBox $searchBox) => $searchBox
            ->view('header.search')
            ->input('w-full rounded-md py-1.5 pl-8 text-sm')
            ->iconSearch('w-5 h-5 text-zinc-400')
        )
    );
}
```

Closure type-hints matter. Hint `searchBox` as `Components\SearchBox`, checkbox as `Components\Checkbox`, radio as `Components\Radio`, body as `Components\Body`, tabs as `Components\Tabs`. Hinting them as `Components\Component` throws a `TypeError`.

### Editable and toggleable

Do not set `editable.view`. The plugin blade is `powergrid-plugins::Editable.index`. Keep classes only.

```php [app/PowerGridThemes/MyTheme.php]
public function editable(): array
{
    return [
        'editable' => (new Components\Component())
            ->clickable('cursor-pointer py-2')
            ->input('rounded-md text-sm w-full')
            ->error('text-sm text-red-600 p-1')
            ->toArray(),
    ];
}

public function toggleable(): array
{
    return [
        'toggleable' => (new Components\Component())
            ->fill([
                'colorOn' => 'var(--color-accent, #16a34a)',
                'colorOff' => 'var(--color-zinc-200, #e4e4e7)',
                'colorOnDark' => 'var(--color-accent, #16a34a)',
                'colorOffDark' => 'var(--color-zinc-600, #52525b)',
                'knobOn' => 'var(--color-accent-foreground, #ffffff)',
            ])
            ->toArray(),
    ];
}
```

### Filters

`filter.multi_select` has no view token. Markup is `<x-livewire-powergrid::inputs.select>`.

`filter.dropdown.*` and `filter.flyout.*` style the panel placements. Leave `view` alone unless you replace the markup. The flyout `panel` token must keep positioning (`fixed inset-y-0`) and stay above `overlay`.

Tokens without a dedicated builder (for example `table.body.td.actions_wrapper`) can be merged in `resolveTokens()`:

```php [app/PowerGridThemes/MyTheme.php]
public function resolveTokens(): array
{
    if (empty($this->tokens)) {
        $tokens = parent::resolveTokens();

        $this->tokens = array_replace_recursive($tokens, [
            'table' => [
                'body' => [
                    'td' => [
                        'actions_wrapper' => 'flex gap-2',
                    ],
                ],
            ],
        ]);
    }

    return $this->tokens;
}
```

## ArrayTheme

Author the same tokens as a plain array. Everything not defined falls back to the parent (Tailwind by default).

```php [app/PowerGridThemes/MyArrayTheme.php]
use PowerComponents\LivewirePowerGrid\Themes\ArrayTheme;
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;

class MyArrayTheme extends ArrayTheme
{
    protected ?string $parentTheme = Tailwind::class;

    public function struct(): array
    {
        return [
            'footer' => [
                'pagination' => [
                    'item' => 'btn btn-sm',
                ],
            ],
        ];
    }
}
```

Ad-hoc, without a subclass:

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Themes\ArrayTheme;
use PowerComponents\LivewirePowerGrid\Themes\Tailwind;
use PowerComponents\LivewirePowerGrid\Themes\Theme;

public function template(): ?Theme
{
    return ArrayTheme::fromArray(
        ['footer' => ['pagination' => ['item' => 'btn btn-sm']]],
        parentTheme: Tailwind::class,
        name: 'compact',
    );
}
```

`ArrayTheme::fromFile(base_path('themes/my-theme.php'))` loads a PHP file that `return`s the token array.

## Per-Component Theme

Prefer `template()`. `customThemeClass()` still works but is deprecated; `template()` wins if both are set.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\Themes\Theme;
use App\PowerGridThemes\MyTheme;

public function template(): ?Theme
{
    return new MyTheme();
}
```

To patch a few tokens on one table with `merge()`, see [UI Theme Override](/performance-and-look/ui-theme-override.html#patch-tokens-on-the-active-theme).

## Views

- `theme('table.layout.td')` — CSS classes for a token
- `theme_view('header')` — Blade path for an alias

View resolution: theme `views()` map → token `view` → `baseView + alias` → parent theme → `components.structure.*`.

DaisyUI inherits Tailwind blades this way. Flux ships blades only where markup differs (`<flux:*>`).

Do not put `@if($theme === 'bootstrap')` in Blade. Structure is theme-agnostic; classes come from tokens.

Feature views (export, toggle-columns, soft-deletes) resolve automatically. Do not declare them in `struct()`.

## Migrating a v6 Theme

The [Upgrade Guide](/release-notes-and-upgrade/upgrade-guide.html#custom-themes) has the v6 → v7 key map. Short version:

1. Extend `Theme`, set `parentTheme = Tailwind::class`
2. Shrink `struct()` to `baseView` only
3. Move each old method into a section method
4. Nest search under `header()`, checkbox/radio under `table()`
5. Drop `editable.view`, `toggleable.view`, `filter.multi_select.view`
6. Delete `public string $name`

Laravel Boost includes the `upgrade-theme-v6-to-v7` skill for this conversion. See [AI Tools and Skills](/build-with-ai/tools-and-skills.html).
