# Testing

Create a test component inside the `tests` folder in your application, for example `tests/Feature/Livewire/UsersTableTest.php`

## Pest Browser Testing

[Pest Browser Testing](https://pestphp.com/docs/browser-testing) allows you to simulate authentic user interactions within your application—including clicking elements, typing input, and selecting options in real time.

.
The next example tests the [PowerGrid Demo](https://demo.livewire-powergrid.com/examples/demo-dish) component, ensuring that clicking and typing in the filter field will perform the search query and return the expected records.


```php
//tests/Browser/FilterFieldTest.php

$searchField = '[wire\:model\.live\.debounce\.700ms="search"]';

it('can filter by existing record')
    ->withVite() //enable Vite for this test
    ->visit('/examples/demo-dish')
    ->assertSee('Arkansas Possum Pie')
    ->fill($searchField, 'Bacalhau')
    ->assertDontSee('Arkansas Possum Pie')
    ->assertSee('Bacalhau com natas');
```

Here, we guarantee the row "Arkansas Possum Pie" is visible when the page loads. Then, we simulate a click in the filter and typing the word "Bacalhau". As a result, we ensure that "Arkansas Possum Pie" is not visible anymore, while the row "Bacalhau com natas" is visible.

## Liveware Testing 

You should follow the same concept defined in the [livewire documentation](https://livewire.laravel.com/docs/testing), and then you will be able to use other native assertions in PowerGrid:

### Testing Actions Buttons

Reference: [action button](.././table-features/button-class.html)

PowerGrid provides a simple testing utility to ensure that a button's structure complies with standards for later rendering with JavaScript. 

See this example.

Component: **UsersTable**
```php
class UsersTable extends PowerGridComponent {
    // ...
    
    public function datasource(): Collection
    {
        return collect([
            [
                'id'         => 29,
                'name'       => 'Luan',
                'balance'    => 241.86,
                'is_online'  => true,
                'created_at' => '2023-01-01 00:00:00',
            ],
            [
                'id'         => 57,
                'name'       => 'Daniel',
                'balance'    => 166.51,
                'is_online'  => true,
                'created_at' => '2023-02-02 00:00:00',
            ],
            [
                'id'         => 93,
                'name'       => 'Claudio',
                'balance'    => 219.01,
                'is_online'  => false,
                'created_at' => '2023-03-03 00:00:00',
            ],
            [
                'id'         => 104,
                'name'       => 'Vitor',
                'balance'    => 44.28,
                'is_online'  => true,
                'created_at' => '2023-04-04 00:00:00',
            ],
        ]);
    }

    public function actions($row): array
    {
        return [
            Button::add('view')
                ->icon('default-eye', [
                    'class' => '!text-green-500',
                ])
                ->slot('View')
                ->class('text-slate-500 flex gap-2 hover:text-slate-700 hover:bg-slate-100 font-bold p-1 px-2 rounded')
                ->dispatch('clickToEdit', ['dishId' => $row?->id, 'dishName' => $row?->name]),
        ];
    }
};
```

Component Test: **UsersTableTest.php**

### assertHasAction

```php{3}
it('should be able to see "view" action', function (string $component, object $params) {
    livewire(UsersTableTest::class)
        ->assertHasAction('view')
        // other assertions;
})
```

### assertActionContainsAttribute

`class` attribute example:

```php{3-6}
it('should be able to see "class" attribute in "view" action', function (string $component, object $params) {
    livewire(UsersTableTest::class)
        ->assertActionContainsAttribute(
            action: 'view', 
            attribute: 'class', 
            expected: 'flex gap-2 hover:text-slate-700'
        )
        // other assertions;
})
```

### assertActionContainsAttribute

`wire:click` attribute example:

```php{3-7}
it('should be able to see "wire:click" in "view" action', function (string $component, object $params) {
    livewire(UsersTableTest::class)
        ->assertActionContainsAttribute(
            action: 'view', 
            attribute: 'wire:click', 
            expected: 'clickToEdit',
            expectedParams: ['dishId' => 29, 'dishName' => 'Luan']
        )
        // other assertions;
})
```

### assertActionHasIcon

`icon` example:

```php{3-6}
it('should be able to see "wire:click" in "view" action', function (string $component, object $params) {
    livewire(UsersTableTest::class)
        ->assertActionContainsAttribute(
            action: 'view', 
            icon: 'default-eye', 
            expected: '!text-green-500'
        )
        // other assertions;
})
```
