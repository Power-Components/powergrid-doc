# Troubleshooting

## Theme, layout and view errors

If you are receiving errors or exceptions relative to your PowerGrid Theme, Layout, or Views, most likely you have published the PowerGrid views, and they have become outdated. This can happen after updating PowerGrid while using customized views.

To solve this problem, first back up your PowerGrid resource: Copy the `resources/views/vendor/livewire-powergrid` directory to `resources/views/vendor/livewire-powergrid-BACKUP`.

Then, proceed to republish your views. Run the command below.

```shell
php artisan vendor:publish --tag=livewire-powergrid-views
```

Next, clear Laravel caches. Run the command below.

```shell
php artisan optimize:clear
```

## Flatpickr Locale Support.

::: warning
Depending on your location, flatpickr will not have the expected support, to solve this kind of problem you can add it in the settings.
:::

See an example:
config/app.php is `'locale' => 'pt_BR'`,

Do this in the settings:

::: info
In this case, there is no support for **pt_BR**, so change locale pt_BR to **pt**
:::

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
