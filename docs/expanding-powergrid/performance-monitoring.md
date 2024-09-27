# Perfomance Monitoring

This section covers how to monitor your PowerGrid Component performance.

Here you will find:

[[toc]]

## Measure Performance

Sometimes, you may experience a component that takes too long to render. To find the root of the problem, PowerGrid offers a built-in Performance Measurement tool.

PowerGrid Performance works out-of-the-box, and it can measure metrics like data retrieval time and database query time. In addition, it can inform you if a cache was used and which queries were performed.

These metrics can be very helpful to identify common problems, such as "N+1 Queries", payload size, and overload in PowerGrid's internal Table `$rows` processing.

## Retrieve Performance Results

You can access the results of PowerGrid Performance Measurement using Laravel Events or via a dedicated Laravel Pulse card.

### Laravel Events

To retrieve the PowerGrid Performance Measurement via event, you must add an event listener to `PowerGridPerformanceData::class` in your Application Service Provider.

#### First, add the PowerGrid table component you want to listen to:

```php
public bool $measurePerformance = true;
```

You can use several options to access the data sent with the event. The most straightforward approach is using [Laravel Logs](https://laravel.com/docs/logging).

The example below uses [LaraDumps](https://laradumps.dev) to capture and display the event data. LaraDumps is a free, open-source debug tool that helps you assess your Component performance in a convenient way.

```php{3,4,8-11}
// app/Providers/AppServiceProvider.php

use PowerComponents\LivewirePowerGrid\Events\PowerGridPerformanceData; // [!code ++]
use Illuminate\Support\Facades\Event; // [!code ++]

public function register() 
{
    Event::listen(PowerGridPerformanceData::class, function (PowerGridPerformanceData $data) {// [!code ++]
        ds($data); //send data to LaraDumps application// [!code ++]
        //logger($data); //log data into laravel.log// [!code ++]
    });// [!code ++]
}
```

The contents of `PowerGridPerformanceData` will look something like this:

```plain
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

use PowerComponents\LivewirePowerGrid\Recorders\PowerGridPerformanceRecorder; // [!code ++]

  'recorders' => [
      // ...
      PowerGridPerformanceRecorder::class => [// [!code ++]
         'enabled' => env('POWERGRID_RECORD_ENABLED', true),// [!code ++]
      ],// [!code ++]
  ],

```

Next, enable PowerGrid Record in your application `.env` file adding the key:

```shell
# .env

APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

POWERGRID_RECORD_ENABLED=true # [!code ++]

# ...
```

Finally, add the PowerGrid Performance Card to the Laravel Pulse Dashboard.

```php{4}
// resources/views/dashboard.blade.php

<x-pulse>
    <livewire:powergrid-performance-card /> // [!code ++]
</x-pulse>
```

Now, when you access your Pulse Dashboard, you should have a card similar to this:

![Output](/examples/measure-retrieve-data-pulse.png)
