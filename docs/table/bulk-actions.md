# Bulk Actions

A Bulk Action is an efficient way to perform actions on one or more selected rows at the same time.

::: warning
Only available for Tailwind theme
::: 

To illustrate, imagine you that you need to select several "dishes" and mark them as "Sold-out".

### Usage

To implement Bulk Actions in PowerGrid, you must add an `Action Button` inside the `header()` method. When clicked, this button will emit an event which will be handled as needed, for example by another component. See the code below:

```php
<?php

//...
   public function header(): array
    {
        return [
            Button::add('bulk-sold-out')
                ->slot(__('Mark as Sold-out'))
                ->class('cursor-pointer block bg-indigo-500 text-white')
                ->dispatch('bulkSoldOutEvent', [])
        ];
    }
```

Next, you must make PowerGrid aware of your new custom event `bulkSoldOutEvent`. To do so, add it in the `getListeners()` method as shown in the code below:

```php
<?php

//...
    protected function getListeners()
    {
        return array_merge(
            parent::getListeners(), [
                'eventX',
                'eventY',
                'bulkSoldOutEvent',
            ]);
    }
```

Following that, you must handle your event `bulkSoldOutEvent` in its own method. At this point, you could integrate another component, such as a modal confirmation.

The example below will trigger a Browser alert:

```php
<?php

//...
    public function bulkActionEvent(): void
    {
        if (count($this->checkboxValues) == 0) {
            $this->dispatchBrowserEvent('showAlert', ['message' => 'You must select at least one item!']);

            return;
        }

        $ids = implode(', ', $this->checkboxValues);

        $this->dispatchBrowserEvent('showAlert', ['message' => 'You have selected IDs: ' . $ids]);
    }
```

Finally, for this example to work, you must listen for the `showAlert` in the blade file which renders your table (e.g, `dishes.blade.php`):

```php
//...
     <!-- Scripts -->
     @livewireScripts
     <script src="//unpkg.com/alpinejs" defer></script>
     <script>
         window.addEventListener('showAlert', event => {
            alert(event.detail.message);
         })
     </script>
```

Now, you can select some rows and when you click on "Mark as Sold-out" button, an alert should appear with the IDs you have selected.

### Show number of selected items

We can access the selected values when we are using bulkActions with [showCheckbox()](./features-setup.html#showcheckbox).

For that, you must access the global `pgBulkActions` javascript component:

* To fetch the selected total via javascript:

```javascript
window.pgBulkActions.count('detail') // detail is the name of the table.
```

Example:

```php{5}
public function header(): array
{
     return [
        Button::add('bulk-delete')
            ->slot(__('Bulk delete (<span x-text="window.pgBulkActions.count(\'' . $this->tableName . '\')"></span>)'))
            ->class('cursor-pointer block bg-white-200 text-gray-700 ')
            ->dispatch('bulkDelete-' . $this->tableName, []),
     ];
 }
```

Result:

![Output](/_media/examples/bulk-action-store.png)


* To fetch the selected ids via javascript

```javascript
window.pgBulkActions.get('detail') // detail is the name of the table.
```

![Output](/_media/examples/bulk-action-store-get.png)


::: tip
When selecting an item, no request will be sent to the server.
:::

