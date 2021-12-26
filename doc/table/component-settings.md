# Component Settings

You can configure your PowerGrid Tables by setting some properties in your Table Class.

<br>

## Sort by Field and Direction

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

## Event Listeners

By default, PowerGrid is listening to the following events:

```php
    protected function getListeners()
    {
        return [
            'pg:datePicker-' . $this->tableName   => 'datePikerChanged',
            'pg:editable-' . $this->tableName     => 'inputTextChanged',
            'pg:toggleable-' . $this->tableName   => 'inputTextChanged',
            'pg:multiSelect-' . $this->tableName  => 'multiSelectChanged',
            'pg:toggleColumn-' . $this->tableName => 'toggleColumn',
            'eventRefresh'                        => '$refresh',
        ];
    }
    //...
```

To add a custom event to your PowerGrid Table, override the function `getListeners` merging a new event inside the existing `$this->listeners` property. See the following example:

```php
    protected function getListeners()
    {
        $this->listeners[] = 'myCustomEvent';
        return $this->listeners;
    }
```

---
