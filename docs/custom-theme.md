## Usage

Powergrid allows you to customize some things in the table, such as the classes and styles of some
tags: `table, tr, td, input, select, label`.

As you already know, we support Tailwind and Bootstrap, so you will notice that these two files exist
which can be used via config which are loaded at component startup:

`config/livewire-powergrid.php`
```php
<?php

    return [
    
        'theme' => \PowerComponents\LivewirePowerGrid\Themes\Tailwind::class,
        // 'theme' => \PowerComponents\LivewirePowerGrid\Themes\Bootstrap5::class
   
        // ...
    ];
```

### Create a class

* Create a copy of one of these files for your theme you are using.
* Modify the namespace and classes you need to change. Ex:

`App\Http\Livewire\PowergridThemes\Tailwind.php`
  ```php
  namespace App\Http\Livewire\PowergridThemes;
  
  use PowerComponents\LivewirePowerGrid\Themes\Components\{Actions,
    checkbox,
    ClickToCopy,
    Cols,
    editable,
    FilterBoolean,
    FilterDatePicker,
    FilterInputText,
    FilterMultiSelect,
    FilterNumber,
    FilterSelect,
    footer,
    Table};
  
  class Tailwind extends ThemeBase
  {
      public string $name = 'tailwind';
  
      public function table(): Table
      {
          return Theme::table('rounded-lg min-w-full border border-slate-200 dark:bg-slate-600 dark:border-slate-500')
              ->div('my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto relative')
              ->thead('shadow-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-500')
              ->tr('')
              ->trFilters('bg-white shadow-sm dark:bg-slate-700')
              ->th('font-semibold px-2 pr-4 py-3 text-left text-xs font-semibold text-slate-700 tracking-wider whitespace-nowrap dark:text-slate-300')
              ->tbody('text-slate-800')
              ->trBody('border border-slate-100 dark:border-slate-400 hover:bg-slate-50 dark:bg-slate-700 dark:odd:bg-slate-800 dark:odd:hover:bg-slate -900 dark:hover:bg-slate-700')
              ->tdBody('px-3 py-2 whitespace-nowrap dark:text-slate-200')
              ->tdBodyTotalColumns('px-3 py-2 whitespace-nowrap dark:text-slate-200 text-sm text-slate-600 text-right space-y-2');
      }
  
      // ...
  ```

### Tailwind

> If you are using Tailwindcss, don't forget to specify the directory or class inside _tailwind.config.js_.

`tailwind.config.js`
  ```javascript
  module.exports = {
    content: [
        // powergrid table
        './app/Http/Livewire/**/*Table.php',
        // powergrid themes
        './app/Http/Livewire/PowergridThemes/*.php',
        //...
    ],
  }
  // ...
  ```

Specify your class path.

`config/livewire-powergrid.php`
```php
<?php

    return [
    
        'theme' => \App\Http\Livewire\PowergridThemes\Tailwind::class,
   
        // ...
    ];
```

Or inside a specific component using the `template` method:

```php
final class DishesTable extends PowerGridComponent
{
    use ActionButton;

    public function setUp(): array
    {
        // ...
    }
    
    public function template(): string
    {
        return App\Http\Livewire\PowergridThemes\Tailwind::class;
    }
    
    // ...
}
```

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/support">Support →</a></span>
</footer>