[[toc]]

# Component Settings

You can configure your PowerGrid Tables by setting some properties in your Table Class.

<br>

### Sort by Field and Direction

You can pre-configure your Table to be sorted by a certain field (`$sortField`) and direction (`$sortDirection`).

The following example loads your Table sorted by `name` in `descending` order:

```php
class DishesTable extends PowerGridComponent
{
    public string $sortField = 'name';
    
    public string $sortDirection = 'desc';

    //...
```

---

### Event Listeners

By default, PowerGrid is listening to the following events:

```php
    protected function getListeners()
    {
        return [
            'pg:datePicker-'   .  $this->tableName  => 'datePikerChanged',
            'pg:editable-'     .  $this->tableName  => 'inputTextChanged',
            'pg:toggleable-'   .  $this->tableName  => 'inputTextChanged',
            'pg:multiSelect-'  .  $this->tableName  => 'multiSelectChanged',
            'pg:toggleColumn-' .  $this->tableName  => 'toggleColumn',
            'pg:eventRefresh-' .  $this->tableName  => '$refresh',
        ];
    }
    //...
```

To add a custom event to your PowerGrid Table, override the function `getListeners` merging a new event inside the existing `$this->listeners` property. See the following example:

```php
    protected function getListeners(): array
    {
        return array_merge(
            parent::getListeners(), 
            [
                'edit-dish'   => 'editDish',
                'delete-dish' => 'deleteDish'
            ]);
    }
```

---

## Sort String as Number

To sort string as numbers, you must declare `$withSortStringNumber` as  `true`.

This sorting method can be useful when your table has a rooms list, for example:

<table>
   <thead>
      <tr>
         <th>Sorting as string</th>
         <th>Sorting as Number (desirable)</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>10</td>
         <td>1a</td>
      </tr>
      <tr>
         <td>11</td>
         <td>1b</td>
      </tr>
      <tr>
         <td>1a</td>
         <td>2</td>
      </tr>
      <tr>
         <td>1b</td>
         <td>3</td>
      </tr>
      <tr>
         <td>2</td>
         <td>…</td>
      </tr>
      <tr>
         <td>3</td>
         <td>10</td>
      </tr>
      <tr>
         <td>…</td>
         <td>11</td>
      </tr>
   </tbody>
</table>

<br/>

Set up:

```php
class DishesTable extends PowerGridComponent
{
    public bool $withSortStringNumber = true;

    //...
```

<br/>

::: tip
📝 You might need to adjust the [->sortable()](include-columns?id=sortable) method in your fields when joining tables in your dataset.
:::

## Defer Loading

The table will be fully loaded after the data is completely ready.
Behind the scenes [wire:init](https://laravel-livewire.com/docs/2.x/defer-loading#introduction) is used

By default, a text in the center '**Loading**' will be shown.

::: tip
* If you want to change this behavior and use a custom view, you can assign the name in `$loadingComponent`.
* It might be useful for you to put **withoutLoading** together with **DeferLoading**. [Header::withoutLoading](../table/features-setup.html#withoutloading)
:::

Example:

```php
public bool $deferLoading = true; // default false

public string $loadingComponent = 'components.my-custom-loading';
```

`views/component/my-custom-loading.blade.php`
```html
<div wire:loading.flex class="absolute z-[90] w-full h-full inset-0 items-center justify-center bg-white bg-opacity-70">
    <!-- loading icon - green -->
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

