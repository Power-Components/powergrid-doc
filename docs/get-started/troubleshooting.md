# Troubleshooting

## Flatpickr Locale Support.

> Depending on your location, flatpickr will not have the expected support, to solve this kind of problem you can add it in the settings.

See an example:
config/app.php is `'locale' => 'pt_BR'`,

Do this in the settings:

> In this case, there is no support for **pt_BR**, so change locale pt_BR to **pt**

`config/livewire-powergrid.php`
```php{7}
     'plugins' => [
        // ...
        'flatpickr' => [
            // ...
            'locales'   => [
                'pt_BR' => [
                    'locale'     => 'pt',
                    'dateFormat' => 'd/m/Y H:i',
                    'enableTime' => true,
                    'time_24hr'  => true,
                ],
            ],
        ],
    ],
```
