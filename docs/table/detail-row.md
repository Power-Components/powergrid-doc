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
`view/components.detail.blade.php`
```html
<div class="p-2 bg-white border border-slate-200">
    <div>Id {{ $id }}</div>
    <div>Options @json($options)</div>
</div>
```
Result:

<img class="result-image" alt="disable" src="../_media/examples/features/detail-row-open.png" width="600"/>

--- 

### View

There are two ways you can specify the blade view with details:

* Passing the parameter `->view('components.detail')`
* Changing behavior in [Action Rules]()
---

### Parameters

In Detail, you can access any variable of the livewire powergrid component and pass other parameters together, for that do:

```php
->options(['name' => 'Luan'])
```

In the view, you can access the method like this (Example):

```php
<div>
   {{ $tableName }} 
   {{ data_get($options, 'name') }} // or $options['name'] 
</div>

```

### Toggle

You can toggle the detail via the `toggleDetail` method in [Button::toggleDetail()](table/row-actions-buttons?id=toggledetail) or simply by calling the method
`$this->toggleDetail(string $id)` passing the Id as a parameter.


<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/support">Support →</a></span>
</footer>
