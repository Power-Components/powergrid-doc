# Component Performance

In this section, we will cover how to measure your PowerGrid Component performance.

## Measure Performance

Sometimes you might experience a component that takes too long to render. To find the root of the problem, PowerGrid offers a built-in Performance Measurement tool.

PowerGrid Performance works out-of-the-box, and it can measure metrics like data retrieval time and database query time. In addition, it can inform you if a cache was used and which queries were performed.

These metrics can be very helpful to identify common problems, such as "N+1 Queries", payload size, and overload in PowerGrid's internal table `$rows` processing.

## Retrieve Performance Results

PowerGrid Measurement results can be accessed via Laravel Events and Laravel Pulse card.

### Laravel Events

You can retrieve the measurement results by listening for the PowerGrid `MeasureRetrieveData` events in your application service Provider.

You can use different approaches to retrieve the data sent with the event. There are several tools available, from [Laravel Logs](https://laravel.com/docs/logging) to third-party applications.

The next example uses [LaraDumps](https://laradumps.dev) to capture the event data. LaraDumps is a free open-source debug tool to help you assess your component performance in a convenient way.

```php{7,8,9,10}
//app/Providers/AppServiceProvider.php

use PowerComponents\LivewirePowerGrid\Events\MeasureRetrieveData;

public function register() 
{
    Event::listen(MeasureRetrieveData::class, function (MeasureRetrieveData $measureRetrieveData) {
        ds($measureRetrieveData); //send data to LaraDumps application
        //logger($measureRetrieveData); //using Laravel Logs
    });
}
```

In the LaraDumps application, you will see an output similar to this:

![Output](/_media/examples/measure-retrieve-data.png)

---

### Laravel Pulse

PowerGrid can be integrated into your Laravel Pulse Dashboard using the PowerGrid Measurement Card.

You can read more about Laravel Pulse in the [official documentation](https://laravel.com/docs/pulse).

To configure PowerGrid Measurement Card in Pulse, add the following code to the `recorders` section inside Pulse's configuration file.

```php{5-7}
// config/pulse.php:

  'recorders' => [
      // ...
      \PowerComponents\LivewirePowerGrid\Recorders\PowerGridRecorder::class => [
         'enabled' => env('POWERGRID_RECORD_ENABLED', true),
      ],
  ],

```

Next, enable PowerGrid Record in your application `.env` file adding the key:

```shell
POWERGRID_RECORD_ENABLED=true
```

Finally, add the PowerGrid Measurement Card to the Laravel Pulse Dashboard.

```php{4}
// resources/views/dashboard.blade.php

<x-pulse>
    <livewire:powergrid-measurement-card />
</x-pulse>
```

Now, when you access your Pulse Dashboard, you should have a card similar to this:

![Output](/_media/examples/measure-retrieve-data-pulse.png)
