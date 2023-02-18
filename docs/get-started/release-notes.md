# Release Notes

[[toc]]

### Dependencies

Powergrid was born with the intention of always keeping as close as possible to the latest laravel update, so we updated the minimum versions of php, tailwind and livewire for greater support and durability.

[Read more](upgrade-guide?id=dependency-upgrades)

---

### Independent Export Engine

[openspout](https://github.com/openspout/openspout) was previously installed as a dependency, now you must manually install it in `composer.json` and adjust which version you
is using in PowerGrid settings.

[Read more](../get-started/upgrade-guide.html#independent-export-engine)

---

### Deprecated Batch Export properties

For more comfort we moved the queues properties inside the Exportable Facade.

[Read more](../get-started/upgrade-guide.html#deprecated-queue-properties)

---

### Support TomSelect and SlimSelect

Add support for [Slim Select](https://slimselectjs.com/) and [Tom Select](https://tom-select.js.org/) by default instead of using the multi select component that came by default in version 3. 
) and Tom Select by default instead of using the multi select component that came by default in version 3. 
This allows for further customization and greater support.

[Read more](../table/column-filters.html#multiselect)

---

### Changed `Columns::makeFilters` to Filter Facade

Instead of calling the method to create a custom filter inside a column, we should use the Filters Facade

```php
<!-- 🚫 Before -->
Column::makeInputSelect() 
Column::makeInputMultiSelect()
Column::makeInputDatePicker()
Column::makeInputEnumSelect()
Column::makeInputRange()
Column::makeInputText()
Column::makeBooleanFilter()

<!-- ✅ After -->
Filter::multiSelect()
Filter::datepicker()
Filter::select()
Filter::number()
Filter::inputText()
Filter::boolean()
```

[Read more](../get-started/upgrade-guide.html#filters)

---

### Multi Sorting

Now we can apply multiple column sorts, set `public bool $multiSort` to true

* Basically we are chaining several `->orderBy(..)->orderBy(..)` in [Laravel Eloquent ORM](https://laravel.com/docs/9.x/eloquent) according to each click you perform on the column

![Output](/_media/examples/multi-sort.png)

---

### Dynamic Filter

PowerGrid Filters are internal components, if you want to use an external component you can use
this functionality. A practical example is when you are using external components (such as [wireui](https://livewire-wireui.com/)) throughout your system and want to
apply them in PowerGrid too.

Example:
```php
public function filters(): array
{
    return [
        Filter::dynamic('in_stock', 'in_stock')
            ->filterType(DynamicInput::FILTER_SELECT)
            ->component('select') // <x-select ...attributes/>
            ->attributes([
                'class'        => 'min-w-[170px]',
                'async-data'   => route('categories.index'),
                'option-label' => 'name',
                'multiselect'  => false,
                'option-value' => 'id',
                'placeholder'  => 'Test',
            ]),
    ];
}
```

![Output](/_media/examples/dynamic-select.png)

---

### Row Index

Sometimes we need to display the index instead of the id, for that you must call index() on the column you want.

Example: 
```php{5}
public function columns(): array
{
    return [
        Column::make('Index', '')
           ->index(),
}
```

![Output](/_media/examples/row-index.png)

---

### Tailwind Theme class

PowerGrid uses the slate color by default, you might want to change that, just insert the PowerGrid preset in the `tailwind.config.js` file

[Read more](../get-started/upgrade-guide.html#include-powergrid-presets-in-your-tailwind-config-js)

---

### Header Without Loading

If you don't want to display PowerGrid's default **loading** icon when some request is made to the server, just
call `withoutLoading()` on Header Facade. This is useful when you already have a layout to show the progress of internal calls. 

![Output](/_media/examples/without-loading.png)

---

### Custom SearchBox Theme

You can change the classes and styles of the input, icon search and icon close.

---

### Table tdBodyEmpty

You can use tdBodyEmpty to change the row style when the table is empty.

[Read more](../get-started/upgrade-guide.html#table-tdbodyempty)

---

### Filter Multi Select Async

If you don't want to load the multiselect data immediately when starting the page, you can use this feature, it helps your datatable behave faster. 
As Powergrid uses [TomSelect](../get-started/release-notes.html#support-tomselect-and-slimselect), set it in settings (here).

[Read more](../table/column-filters.html#filter-multiselectasync)

---

### Defer Loading using wire:init

The table will be fully loaded after the data is completely ready. 
Behind the scenes [wire:init](https://laravel-livewire.com/docs/2.x/defer-loading#introduction) is used

By default, a text in the center '**Loading**' will be shown. 

::: tip
If you want to change this behavior and use a custom view, you can assign the name in `$loadingComponent`.
::: 

Example:

```php
public bool $deferLoading = true;

public string $loadingComponent = 'components.my-custom-loading';
```

`views/component/my-custom-loading.blade.php`
```html
<div wire:loading.flex class="absolute z-[90] w-full h-full inset-0 items-center justify-center bg-white bg-opacity-70">
    <svg class="w-10 h-10 animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
</div>
<div class="p-2 space-y-4 animate-pulse">
    {{-- # Column--}}
    <div class="flex items-center gap-4">
        @for ($i = 0; $i < 10; $i++)
            {{-- # Row --}}
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
            </div>
        @endfor
    </div>
    {{-- # Column--}}
    <div class="flex items-center gap-4">
        @for ($i = 0; $i < 10; $i++)
            {{-- # Row --}}
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
            </div>
        @endfor
    </div>
    {{-- # Column--}}
    <div class="flex items-center gap-4">
        @for ($i = 0; $i < 10; $i++)
            {{-- # Row --}}
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
            </div>
        @endfor
    </div>
</div>
```

![Output](/_media/examples/defer-loading-example.png)

---

### Search with whereHasMorph

Now you can search your table if your data source has morphic relationship [whereHasMorph](https://laravel.com/docs/9.x/eloquent-relationships#querying-morph-to-relationships)

---

### BulkAction store

Using the Alpine store, we can track how many items have been selected.
This is useful to count how many items we will export or carry out a mass action.

[Read more](../table/bulk-actions.html#show-number-of-selected-items)

---

### Dynamic inputText

Description

---

