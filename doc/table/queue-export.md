# Queue Export

If you are working with lots of data, it's recommended to enable Queue Export.

Queue export will divide your records into batches, increasing the export performance.

For instance, if you have 1 million records, you may set up 10 queues. Each batch will contain a total of 100,000 records.

> **❗ Important:** Queues only take effect when exporting ALL records. If you have manually selected some records, they will be exported in a single batch.

<br/>

## Get started

To enable Queue Export, you must configure the following properties in your PowerGrid Table file (e.g. `DishTable.php`):

- `$queues`: Number of queues to be used.
- `$onQueue`: Queue name. If blank, `default` will be used.
- `$onConnection`: Connection. Read more in [Laravel Queue Documentation](https://laravel.com/docs/8.x/queues#connections-vs-queues).
- `$showExporting`: Show the export progress on the screen if `true` (default).

Example:

```php
class DishesTable extends PowerGridComponent
{

  public int $queues = 2; // Use two queues

  public string $onQueue = 'my-dishes'; //queue name

  public string $onConnection = 'redis'; // default sync

  public bool $showExporting = true; //Show progress on screen

  //...
```

---

## Back-end

You can manipulate the state of processing in the back-end:

```php
public function onBatchThen(Batch $batch)
{
    // All jobs completed successfully...
    // TODO notify user!
}

public function onBatchCatch(Batch $batch, Throwable $e)
{
   // First batch job failure detected...
   // TODO add to failure log.
}

public function onBatchFinally(Batch $batch)
{
  // The batch has finished executing...  
   // TODO add to success log.
}
```

---

## Front-end

You can also receive You can manipulate the state of processing in the front end (Livewire):

```php
public function onBatchExecuting(Batch $batch)
{
    // send alert

   if ($batch->finished()) {
       $this->dispatchBrowserEvent('batch-finished', $batch);
   } else {
      $this->dispatchBrowserEvent('batch-executing', $batch);
   }   
}
```

<br/>

> 💡 **TIP:**  Read more about Batches in Laravel [Documentation](https://laravel.com/docs/8.x/queues#inspecting-batches).
