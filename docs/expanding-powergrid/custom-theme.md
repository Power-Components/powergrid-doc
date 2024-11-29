# Custom Theme

This section covers PowerGrid Custom Themes.

Here you will find:

[[toc]]

## Introduction

You can start customizing the [default themes](/get-started/powergrid-configuration.html#_2-choose-a-css-theme) to create your own variation in a few steps.

You may also have a look at the [Personalizing Header and Footer](/table-features/header-and-footer.html#personalizing-header-footer) subsection before creating a new theme.

## Creating your Custom Theme

To create your Custom Theme, first [install](/get-started/install) PowerGrid and then, follow the steps below.

1. Open the directory `vendor/power-components/livewire-powergrid/src/Themes/`

2. Copy the theme you want to use as base (`Tailwind.php`  or `Bootstrap5.php` ) to the directory where you want  you theme to live (for example `app\PowerGridThemes\BigFonts.php`).

3. Now, modify the `namespace`,  `class name` and customize the css to your needs.

The example below modifies the Tailwind theme:

```php
<?php

namespace App\PowerGridThemes;

use \PowerComponents\LivewirePowerGrid\Themes\Tailwind;

class BigFonts extends Tailwind
{
    public string $name = 'tailwind';

    public function table(): array
    {
        return [
            'layout' => [
                'base'      => 'p-3 align-middle inline-block min-w-full w-full sm:px-6 lg:px-8',
                'div'       => 'rounded-t-lg relative border-x border-t border-pg-primary-200 dark:bg-pg-primary-700 dark:border-pg-primary-600',
                'table'     => 'min-w-full dark:!bg-primary-800',
                'container' => '-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8',
                'actions'   => 'flex gap-2',
            ],

            'header' => [
                'thead'    => 'shadow-sm rounded-t-lg bg-pg-primary-100 dark:bg-pg-primary-900',
                'tr'       => '',
                'th'       => 'font-extrabold px-3 py-3 text-left text-xs text-pg-primary-700 tracking-wider whitespace-nowrap dark:text-pg-primary-300',
                'thAction' => '!font-bold',
            ],

            'body' => [
                'tbody'              => 'text-pg-primary-800',
                'tbodyEmpty'         => '',
                'tr'                 => 'border-b border-pg-primary-100 dark:border-pg-primary-600 hover:bg-pg-primary-50 dark:bg-pg-primary-800 dark:hover:bg-pg-primary-700',
                'td'                 => 'px-3 py-2 whitespace-nowrap dark:text-pg-primary-200',
                'tdEmpty'            => 'p-2 whitespace-nowrap dark:text-pg-primary-200',
                'tdSummarize'        => 'p-2 whitespace-nowrap dark:text-pg-primary-200 text-sm text-pg-primary-600 text-right space-y-2',
                'trSummarize'        => '',
                'tdFilters'          => '',
                'trFilters'          => '',
                'tdActionsContainer' => 'flex gap-2',
            ],
        ];
    }

    public function footer(): array
    {
        return [
            'view'   => $this->root() . '.footer',
            'select' => 'appearance-none !bg-none focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 rounded-md border-0 bg-transparent py-1.5 px-4 pr-7 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-auto',
        ];
    }

    public function cols(): array
    {
        return [
            'div' => 'select-none flex items-center gap-1',
        ];
    }

    public function editable(): array
    {
        return [
            'view'  => $this->root() . '.editable',
            'input' => 'focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full',
        ];
    }

    public function toggleable(): array
    {
        return [
            'view' => $this->root() . '.toggleable',
        ];
    }

    public function checkbox(): array
    {
        return [
            'th'    => 'px-6 py-3 text-left text-xs font-medium text-pg-primary-500 tracking-wider',
            'base'  => '',
            'label' => 'flex items-center space-x-3',
            'input' => 'form-checkbox dark:border-dark-600 border-1 dark:bg-dark-800 rounded border-gray-300 bg-white transition duration-100 ease-in-out h-4 w-4 text-primary-500 focus:ring-primary-500 dark:ring-offset-dark-900',
        ];
    }

    public function radio(): array
    {
        return [
            'th'    => 'px-6 py-3 text-left text-xs font-medium text-pg-primary-500 tracking-wider',
            'base'  => '',
            'label' => 'flex items-center space-x-3',
            'input' => 'form-radio rounded-full transition ease-in-out duration-100',
        ];
    }

    public function filterBoolean(): array
    {
        return [
            'view'   => $this->root() . '.filters.boolean',
            'base'   => 'min-w-[5rem]',
            'select' => 'appearance-none !bg-none focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full',
        ];
    }

    public function filterDatePicker(): array
    {
        return [
            'base'  => '',
            'view'  => $this->root() . '.filters.date-picker',
            'input' => 'flatpickr flatpickr-input focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-auto',
        ];
    }

    public function filterMultiSelect(): array
    {
        return [
            'view'   => $this->root() . '.filters.multi-select',
            'base'   => 'inline-block relative w-full',
            'select' => 'mt-1',
        ];
    }

    public function filterNumber(): array
    {
        return [
            'view'  => $this->root() . '.filters.number',
            'input' => 'w-full min-w-[5rem] block focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 rounded-md border-0 bg-transparent py-1.5 pl-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6',
        ];
    }

    public function filterSelect(): array
    {
        return [
            'view'   => $this->root() . '.filters.select',
            'base'   => '',
            'select' => 'appearance-none !bg-none focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full',
        ];
    }

    public function filterInputText(): array
    {
        return [
            'view'   => $this->root() . '.filters.input-text',
            'base'   => 'min-w-[9.5rem]',
            'select' => 'appearance-none !bg-none focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full',
            'input'  => 'focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full',
        ];
    }

    public function searchBox(): array
    {
        return [
            'input'      => 'focus:ring-primary-600 focus-within:focus:ring-primary-600 focus-within:ring-primary-600 dark:focus-within:ring-primary-600 flex items-center rounded-md ring-1 transition focus-within:ring-2 dark:ring-pg-primary-600 dark:text-pg-primary-300 text-gray-600 ring-gray-300 dark:bg-pg-primary-800 bg-white dark:placeholder-pg-primary-400 w-full rounded-md border-0 bg-transparent py-1.5 px-2 ring-0 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 w-full pl-8',
            'iconClose'  => 'text-pg-primary-400 dark:text-pg-primary-200',
            'iconSearch' => 'text-pg-primary-300 mr-2 w-5 h-5 dark:text-pg-primary-200',
        ];
    }
}
```

4. Finally, you can [configure](/get-started/powergrid-configuration.html#_2-choose-a-css-theme) PowerGrid to use your new theme:

```php{10}
// config/livewire-powergrid.php

/*
|--------------------------------------------------------------------------
| Theme
|--------------------------------------------------------------------------
*/

'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class, // [!code --]
'theme' => \App\PowerGridThemes\BigFonts::class, // [!code ++]
```


Alternatively, you can apply your custom theme only in specific PowerGrid Tables:

Just modify the `customThemeClass()` to return your new theme class.

```php
class DishTable extends PowerGridComponent
{
    public function customThemeClass(): ?string
    {
        return \App\PowerGridThemes\BigFonts::class;
    }
```

## Note for Tailwind CSS

When using Tailwind CSS you may need to add your custom theme file to your Tailwind configuration as a content in order to scan your file for classes during the build process. The following shows an example of how to do so when using the above `app\PowerGridThemes\BigFonts.php` file as an example.

1. Add the following file to your `tailwind.config.js` in the `content` key:

```js
module.exports = {
    ...

    content: [
        '...',
        './app/PowerGridThemes/BigFonts.php', // replace with path to your custom theme [!code ++]
    ],

    ...
}
```

2. Rebuild your assets using `npm run build` or `npm run dev`.