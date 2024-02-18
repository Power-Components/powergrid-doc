# Measurement Retrieve Data

Sometimes, when a table takes a long time to load, we can suggest some possible solutions that must be tested based on the server configurations and the number of simultaneous requests, among others. 

However, it is possible to identify common problems such as Queries (N+1), payload size, and PowerGrid's internal processing time to generate the $rows.
You can start customizing the default themes to create your own variation in a few steps.

In PowerGrid you can use two concepts (Events and Laravel Pulse):

## Laravel Events - Listening to the MeasureRetrieveData event

To start listening for events, declare to your service provider:

```php
use PowerComponents\LivewirePowerGrid\Events\MeasureRetrieveData;

// Service Provider
public function register() 
{
    Event::listen(MeasureRetrieveData::class, function (MeasureRetrieveData $measureRetrieveData) {
        ds($measureRetrieveData); // ds() -> laradumps.dev
    });
}
```

The output will be an instance of Measure Retrieve Data (Using [laradumps](https://laradumps.dev)):

![Output](/_media/examples/measure-retrieve-data.png)

---

## Using Laravel Pulse with PowerGrid Measurement Card.

Read about [Laravel Pulse](https://laravel.com/docs/pulse)

In Laravel Pulse configuration - config/pulse.php add:

```php{7-9}
// config/pulse.php:
   // ..

  'recorders' => [
      // ..
      
      \PowerComponents\LivewirePowerGrid\Recorders\PowerGridRecorder::class => [
         'enabled' => env('POWERGRID_RECORD_ENABLED', true),
      ],
  ],

```

From the Laravel Pulse dashboard:

```blade{4}
<x-pulse>
    ...
 
    <livewire:powergrid-measurement-card />
</x-pulse>

```

You now have a card similar to this:

![Output](/_media/examples/measure-retrieve-data-pulse.png)
