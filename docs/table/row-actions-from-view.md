# Row Actions From View

PowerGrid offers the possibility to render a custom view inside each row's "Action" column.

This is useful when you need to build a combination of actions for a complex scenario or when working with cache on a large dataset.

## Usage

First, you must include an `action` in your table columns. See the example below.

```php
public function columns(): array
{
    return [
        // ... other columns ...
        Column::action('Action'), // [!code ++]
    ];
}
```

Then, add the method `actionsFromView()` to your PowerGrid table.

```php
use Illuminate\View\View;

public function actionsFromView($row): View
{
    return view('actions-view', ['row' => $row]);
}
```

The `$row` variable contains a **rendered table row**, and you must pass it to your view.

Your view may look something like the example below.

```blade
// resources/views/actions-view.blade.php

<div>
    @if($row->in_stock == 'Yes')
        <button>Order now</button>
    @else
        - out of sock -
    @endif
</div>
```

In this demonstration, the button "Order now" will only appear for dishes in stock.
