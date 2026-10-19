---
title: Configure PowerGrid
description: Learn how to complete the initial PowerGrid setup in your application.
---

# Configure PowerGrid

[[toc]]

## Base Configuration

### 1. Import Javascript Assets

Add the following import to `resources/js/app.js`.

::: code-group

```javascript [Tailwind / DaisyUI]
import './../../vendor/power-components/livewire-powergrid/resources/js/powergrid.js' // [!code ++]
```

```javascript [Flux]
import './../../vendor/power-components/livewire-powergrid/resources/js/powergrid-flux.js' // [!code ++]
```

:::

Flux uses `<flux:dropdown>` and `<flux:menu>` instead of PowerGrid's Alpine dropdown and export menu. Import `powergrid-flux.js` when the active theme is Flux. Import `powergrid.js` for Tailwind and DaisyUI.

### 2. Choose a UI Theme

PowerGrid ships `Tailwind` _(default)_, `DaisyUI`, and `Flux`.

Set the active theme in `config/livewire-powergrid.php`. The value can be a registered name or an FQCN.

```php [config/livewire-powergrid.php]
'theme' => 'tailwind',
// 'theme' => 'daisyui',
// 'theme' => 'flux',
// 'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class,
```

See [Custom Theme](/extending/custom-theme.html) to register your own name or override tokens without a Theme class.

### 3. Import Theme Assets

Import theme assets in `resources/css/app.css`.

::: code-group

```css [Tailwind 4]
@import "tailwindcss";
@import '../../vendor/power-components/livewire-powergrid/resources/css/tailwind4.css';

/** enable dark mode */
@custom-variant dark (&:where(.dark, .dark *));
```

```css [DaisyUI 5]
@import "tailwindcss";
@import '../../vendor/power-components/livewire-powergrid/resources/css/base.css';
@plugin "daisyui";

@custom-variant dark (&:is([data-theme="night"] *));

@source '../../vendor/power-components/livewire-powergrid/src/**/*.php';
@source '../../vendor/power-components/livewire-powergrid/resources/views/**/*.php';
```

```css [Flux]
@import "tailwindcss";
@import '../../vendor/power-components/livewire-powergrid/resources/css/base.css';

@source '../../vendor/power-components/livewire-powergrid/src/**/*.php';
@source '../../vendor/power-components/livewire-powergrid/resources/views/**/*.php';
```

:::

`tailwind4.css` already `@source`s the package; Tailwind picks up your `app/` files automatically. DaisyUI and Flux must `@source` the package themselves (`vendor/` is gitignored) and import `base.css` for `x-cloak` and select/datepicker widths.

The Tailwind import sets `--color-accent-*` to green and `--color-pg-secondary-*` to blue. To change the accent, re-map the scale in `@theme` after the import:

```css [resources/css/app.css]
@theme {
    --color-accent-50: var(--color-indigo-50);
    --color-accent-100: var(--color-indigo-100);
    --color-accent-200: var(--color-indigo-200);
    --color-accent-300: var(--color-indigo-300);
    --color-accent-400: var(--color-indigo-400);
    --color-accent-500: var(--color-indigo-500);
    --color-accent-600: var(--color-indigo-600);
    --color-accent-700: var(--color-indigo-700);
    --color-accent-800: var(--color-indigo-800);
    --color-accent-900: var(--color-indigo-900);
    --color-accent-950: var(--color-indigo-950);
    --color-accent: var(--color-accent-600);
    --color-accent-content: var(--color-accent-600);
    --color-accent-foreground: var(--color-white);
}
```

Override `--color-pg-secondary-*` the same way if you need to.

### 4. Build your table

<div class="success custom-block">
<p class="custom-block-title">🎉 you are ready to go</p>
<p>Now it's time to <a href="/get-started/create-powergrid-table.html">create your first PowerGrid Table</a>.</p>
</div>

## More Configuration Options

See the PowerGrid's [Configuration](/powergrid/configuration-options.html) section for more details.
