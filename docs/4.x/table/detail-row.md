# Detail Row

In some cases we need to show more information in the table, for example: 
_when selecting a product I would like to see which ingredients this product has or other information such as stock, billing, etc_.

> Note: The backend will only be queried when toggle.

## Usage

To use the **Detail Row** you will need:

* Tailwind theme active
* Use the Detail class inside `setUp`.
* Have a blade view to show the details.

This is an example:

```php
    public function setUp(): array
    {
        return [
            // ..
            Detail::make()
                ->view('components.detail')
                ->options(['name' => 'Luan'])
                ->showCollapseIcon(),
        ];
    }
```

You can access your model data in the view file using the variable `$row`.

```html
<!-- File: resources/views/components/detail.blade.php -->

<div class="p-2 bg-white border border-slate-200">
    <div>Id {{ $id }}</div>
    <div>Options @json($options)</div>

    @if ($row->calories < 100)
        <div>Diet dish!</div>
    @endif

</div>
```

Result:

![Output](/_media/examples/features/detail-row-open.png)

--- 

### View

There are two ways you can specify the blade view with details:

* Passing the parameter `->view('components.detail')`
* Model data is available with the variable `$row`.
* Changing behavior in [Action Rules]()
---

### Parameters

In Detail, you can access any variable of the livewire powergrid component and pass other parameters together, for that do:

```php
->options(['name' => 'Luan'])
```

In the view, you can access the method like this (Example):

```php

<div class="p-2 bg-white border border-slate-200">
    <div>Table: {{ $tableName }} </div>
    <div>Id: {{ $id }}</div>
    <div>Name: {{ $row->name }}</div>
    <div>Options: @json($options)</div>

    <div class="flex justify-end">
        <button wire:click.prevent="toggleDetail('{{ $id }}')" class="p-1 text-xs bg-red-600 text-white rounded-lg">Close</button>
    </div>
</div>
```

### Collapse Others

* By default, powergrid will keep the open state of other details when you toggle a row using `toggleDetail`. To close the last open use:

```php
->collapseOthers()
```

---

### Toggle

You can toggle the detail via the `toggleDetail` method in [Button::toggleDetail()](row-actions-buttons?id=toggledetail) or simply by calling the method
`$this->toggleDetail(string $id)` passing the Id as a parameter.

