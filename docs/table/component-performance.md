# Component Performance

In this section, we will cover how to measure your PowerGrid Component performance.

## Measure Performance

Sometimes you might experience a component that takes too long to render. To find the root of the problem, PowerGrid offers a built-in Performance Measurement tool.

PowerGrid Performance works out-of-the-box, and it can measure metrics like data retrieval time and database query time. In addition, it can inform you if a cache was used and which queries were performed.

These metrics can be very helpful to identify common problems, such as "N+1 Queries", payload size, and overload in PowerGrid's internal table `$rows` processing.

## Retrieve Performance Results

PowerGrid Measurement results can be accessed via Laravel Events and Laravel Pulse card.

### Laravel Events

You can retrieve the measurement results by listening for the PowerGrid `PowerGridPerformanceData` events in your application service Provider.

You can use different approaches to retrieve the data sent with the event. There are several tools available, from [Laravel Logs](https://laravel.com/docs/logging) to third-party applications.

The next example uses [LaraDumps](https://laradumps.dev) to capture the event data. LaraDumps is a free open-source debug tool to help you assess your component performance in a convenient way.

```php{3,4,8-11}
// app/Providers/AppServiceProvider.php

use PowerComponents\LivewirePowerGrid\Events\PowerGridPerformanceData;
use Illuminate\Support\Facades\Event;

public function register() 
{
    Event::listen(PowerGridPerformanceData::class, function (PowerGridPerformanceData $data) {
        ds($data); //send data to LaraDumps application
        //logger($data); //using Laravel Logs
    });
}
```

The contents of `PowerGridPerformanceData $data` will look similar to this:

```txt
tableName: "DishTable",
retrieveDataInMs: 12.0,
queriesTimeInMs: 8.31,
isCached: false,
queries: [
    0 => [
        "query" => "select count(*) as aggregate from `dishes`",
        "bindings" => [],
        "time" => 23.4
    ]
]
```

---

### Laravel Pulse

PowerGrid can be integrated into your Laravel Pulse Dashboard using the PowerGrid Performance Card.

You can read more about Laravel Pulse in the [official documentation](https://laravel.com/docs/pulse).

To configure PowerGrid Performance Card in Pulse, add the following code to the `recorders` section inside Pulse's configuration file.

```php{3,7-9}
// config/pulse.php

use PowerComponents\LivewirePowerGrid\Recorders\PowerGridPerformanceRecorder;

  'recorders' => [
      // ...
      PowerGridPerformanceRecorder::class => [
         'enabled' => env('POWERGRID_RECORD_ENABLED', true),
      ],
  ],

```

Next, enable PowerGrid Record in your application `.env` file adding the key:

```shell
POWERGRID_RECORD_ENABLED=true
```

Finally, add the PowerGrid Performance Card to the Laravel Pulse Dashboard.

```php{4}
// resources/views/dashboard.blade.php

<x-pulse>
    <livewire:powergrid-performance-card />
</x-pulse>
```

Now, when you access your Pulse Dashboard, you should have a card similar to this:

![Output](/_media/examples/measure-retrieve-data-pulse.png)
