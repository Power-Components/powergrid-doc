# Release Notes

[[toc]]

### Dependencies

Powergrid was born with the intention of always keeping as close as possible to the latest laravel update, so we updated the minimum versions of php, tailwind and livewire for greater support and durability.

[Read more](upgrade-guide?id=dependency-upgrades)

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

### Independent Export Engine

[openspout](https://github.com/openspout/openspout) was previously installed as a dependency, now you must manually install it in `composer.json` and adjust which version you
is using in PowerGrid settings.

[Read more](../get-started/upgrade-guide.html#independent-export-engine)

---

### Deprecated Batch Export properties

For more comfort we moved the queues properties inside the Exportable Facade.

[Read more](../get-started/upgrade-guide.html#deprecated-queue-properties)

---

### Row Index

Sometimes we need to display the index instead of the id, for that you must call index() on the column you want.

Example: 
```php{5}
public function columns(): array
{
    return [
        Column::make('Index')
           ->index(),
}
```

![Output](/_media/examples/row-index.png)

---

### Tailwind Theme class

PowerGrid uses the slate color by default, you might want to change that, just insert the PowerGrid preset in the `tailwind.config.js` file

[Read more](../get-started/upgrade-guide.html#include-powergrid-presets-in-your-tailwind-config-js)

---

### Header::withoutLoading

If you don't want to display PowerGrid's default **loading** icon when some request is made to the server, just
call `withoutLoading()` on Header Facade. This is useful when you already have a layout to show the progress of internal calls. 

![Output](/_media/examples/without-loading.png)

---

### Custom SearchBox Theme

You can change the classes and styles of the input, icon search and icon close.

---

### Table::tdBodyEmpty

You can use tdBodyEmpty to change the row style when the table is empty.

[Read more](../get-started/upgrade-guide.html#table-tdbodyempty)

---

### Support TomSelect and SlimSelect

Description

---

### Filter::multiSelectAsync

Description

---

### deferLoading using wire:init

Description

---

### Search with whereHasMorph

Description

---

### BulkAction store

Description

---

### dynamic inputText options

Description

---

### Ability to place stripes on export

From this version we can define the color itself in the export listing by passing the `striped('color')` parameter (XLS only) .

```php
    public function setUp(): array
    {       
        return [
            Exportable::make('export')
                ->striped('f9a303') // Hex without '#'
                ->type(Exportable::TYPE_XLS),
        ];
    }
```

Result:

![Output](/_media/examples/features/striped.png)

[Read more](../table/features-setup?id=striped)

