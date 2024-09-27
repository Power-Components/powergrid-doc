# Testing

Create a test component inside the `tests` folder in your application, for example `tests/Feature/Livewire/UsersTableTest.php`

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
