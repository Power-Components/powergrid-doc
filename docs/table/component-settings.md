# Component Settings

You can configure your PowerGrid Tables by setting some properties in your Table Class.

<br>

### Sort by Field and Direction

You can pre-configure your Table to be sorted by a certain field (`$sortField`) and direction (`$sortDirection`).

The following example loads your Table sorted by `name` in `descending` order:

```php
class DishesTable extends PowerGridComponent
{
    use ActionButton;

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
            'eventRefresh'                          => '$refresh',
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

This sorting method can be useful when your table has a rooms list, for example.

**Rooms table**

| Sorting as string | Sorting as Number (desirable) |
|-----------|-----------|
| 10        | 1a        |
| 11        | 1b        |
| 1a        | 2         |
| 1b        | 3         |
| 2         | ...       |
| 3         | 10        |
| ...       | 11        |

<br/>

Set up:

```php
class DishesTable extends PowerGridComponent
{
    use ActionButton;

    public bool $withSortStringNumber = true;

    //...
```

<br/>

> 📝 **NOTE:** You might need to adjust the [->sortable()](https://livewire-powergrid.docsforge.com/main/include-columns/#sortable) method in your fields when joining tables in your dataset.

---
