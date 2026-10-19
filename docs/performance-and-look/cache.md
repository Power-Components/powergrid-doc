---
title: Cache
description: Learn how to use Laravel Cache within PowerGrid to improve performance by storing and reusing query results efficiently.
---

# Cache

Store the table query result in Laravel's [Cache](https://laravel.com/docs/cache) for a TTL. Enable it per table with `PowerGrid::cache()` in `setUp()`.

[[toc]]

## Enabling Cache

Chain the [Cache methods](#cache-methods) on `PowerGrid::cache()`. Adding it to `setUp()` turns caching on (`enabled` defaults to `true`).

The default cache tag is `{prefix}powergrid-{dbTable}-{tableName}`:

- `{prefix}` comes from `prefix()` (empty by default)
- `{dbTable}` is `$datasource->getModel()->getTable()` when the datasource exposes `getModel()`; otherwise `$tableName`

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public string $tableName = 'ProductTable';

    public function setUp(): array
    {
        return [
           PowerGrid::cache() // [!code ++:3]
              ->ttl(60)
              ->prefix(auth()->id().'_'), // e.g. 1_powergrid-products-ProductTable
        ];
    }
}
```

`customTag()` replaces the `powergrid-{dbTable}-{tableName}` segment. `prefix()` is still prepended.

```php [app/Livewire/ProductTable.php]
public function setUp(): array
{
    return [
        PowerGrid::cache() // [!code ++:3]
           ->ttl(60)
           ->customTag('my-custom-tag'),
    ];
}
```

The remember key also includes page, per page, search, sort, filters, Filter Builder, and soft-deletes, so each view of the table is cached separately.

Drivers that support tags (Redis, Memcached) store the payload under that tag. Other drivers prefix the remember key with the tag string.

## Cache Methods

`PowerComponents\Turbine\Components\SetUp\Cache`, returned by `PowerGrid::cache()`:

| Method                   | Description |
| ------------------------ | ----------- |
| `ttl(int $time)`         | Seconds to cache. Default `300`. |
| `customTag(string $tag)` | Replaces the default tag. |
| `prefix(string $prefix)` | Prepended to the tag. |
| `disabled()`             | Sets `enabled` to `false`. |

## Clearing cache

Flush the same tag whenever the underlying data changes, or you will serve stale rows. See [removing tagged cache items](https://laravel.com/docs/cache#removing-tagged-cache-items).

```php [app/Models/Product.php]
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Product extends Model
{
    protected static function booted(): void // [!code ++:12]
    {
        static::created(fn (Product $product) => self::clearCache());
        static::updated(fn (Product $product) => self::clearCache());
        static::deleted(fn (Product $product) => self::clearCache());
    }

    private static function clearCache(): void
    {
        Cache::tags([auth()->id().'_powergrid-products-ProductTable'])->flush();
    }
}
```

## `cache_ttl` in config

`cache_ttl` in `config/livewire-powergrid.php` is **not** the query-result TTL. It caches resolved action rules. Default `null` (off). Query results use `PowerGrid::cache()->ttl()` only.
