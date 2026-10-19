---
title: DataSource
description: Connect your data seamlessly. Whether you use database models, query builders, or raw collections, PowerGrid handles your data stream smoothly.
---

# DataSource

[[toc]]

## Configuring the DataSource

`datasource()` must return one of these types:

| Type                                                         | Description                                     |
| ------------------------------------------------------------ | ----------------------------------------------- |
| [Eloquent Builder](https://laravel.com/docs/eloquent)        | Pulls data from Laravel models.                 |
| [Query Builder](https://laravel.com/docs/queries)            | Uses manual SQL-style queries.                  |
| [Collection](https://laravel.com/docs/collections) / `Array` | Data stored in memory and managed in your code. |
| [Laravel Scout](https://laravel.com/docs/scout) Builder      | Full-text search via Scout (`Model::search()`). |

### Eloquent

Return an **Eloquent Builder** to retrieve records from a Model.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
  public function datasource(): Builder
  {
    return Product::query();
  }
}
```

### Query Builder

Return a **Query Builder** instance when you query the database without a Model.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Query\Builder; // [!code ++]
use Illuminate\Support\Facades\DB; // [!code ++]

class ProductTable extends PowerGridComponent
{
    public function datasource(): Builder // [!code ++:4]
    {
        return DB::table('products');
    }
}
```

### Collection

Return a Laravel Collection or an array. Useful for static data or data already loaded in memory.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Support\Collection;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function datasource(): Collection // [!code ++:20]
    {
        return collect([
            [
                'id'           => 1,
                'name'         => 'Pepperoni Pizza',
                'kitchen_name' => 'Pizza Station',
                'price'        => 14.00,
            ],
            [
                'id'           => 2,
                'name'         => 'Bacalhau com Natas',
                'kitchen_name' => 'Main Kitchen',
                'price'        => 16.50,
            ],
            [
                'id'           => 3,
                'name'         => 'Sparkling Water',
                'kitchen_name' => 'Beverages Bar',
                'price'        => 2.50,
            ],
        ]);
    }
}
```

### Scout

When [Laravel Scout](https://laravel.com/docs/scout) is installed, return a Scout Builder. PowerGrid applies the table [Search Input](/table-structure/header-and-footer.html#search-input) to that builder — do not pass `$this->search` into `search()` yourself.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Laravel\Scout\Builder as ScoutBuilder; // [!code ++]
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function datasource(): ScoutBuilder // [!code ++:4]
    {
        return Product::search();
    }
}
```

## Loading Relationships

Some features, such as `sortable()` and column filters, need the related table's columns in the same result row. Join those tables in `datasource()`, or eager-load relations when you only need them for [custom fields](#retrieving-relationship-fields).

To search related models without a join, see [`relationSearch()`](/data-management/searching-data.html#searching-with-relationships).

### Loading Eloquent Relationships

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
  public function datasource(): Builder
  {
    return Product::query()->with('kitchen');// [!code ++]
  }
}
```

The Product Model might look something like this:

```php [app/Models/Product.php]
class Product extends Model
{
    public function kitchen(): BelongsTo
    {
        return $this->belongsTo(Kitchen::class);
    }
}
```

### Joining Tables with Eloquent Builder

This example retrieves products together with their kitchen name by joining the `kitchens` table.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Database\Eloquent\Builder;// [!code ++]
use App\Models\Product;// [!code ++]

class ProductTable extends PowerGridComponent
{
    public function datasource(): Builder
    {
        return Product::query()// [!code ++:5]
            ->join('kitchens', function ($kitchens) {
                $kitchens->on('products.kitchen_id', '=', 'kitchens.id');
            })
            ->select('products.*', 'kitchens.name as kitchen_name');
    }
}
```

### Joining Tables with Query Builder

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use Illuminate\Support\Facades\DB;// [!code ++]
use Illuminate\Database\Query\Builder;// [!code ++]

class ProductTable extends PowerGridComponent
{
  public function datasource(): Builder
  {
      return DB::table('products')// [!code ++:10]
                ->join('kitchens', function ($kitchens) {
                    $kitchens->on('products.kitchen_id', '=', 'kitchens.id');
                })
                ->select([
                    'products.id',
                    'products.name',
                    'products.price',
                    'kitchens.name as kitchen_name',
                ]);
  }
}
```

## Defining DataSource Fields

`fields()` maps datasource values for your columns. Call `PowerGrid::fields()` and chain `add()` for each field. Without a closure, PowerGrid reads the attribute of the same name.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;// [!code ++:2]
use PowerComponents\LivewirePowerGrid\PowerGridFields;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields// [!code ++:7]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('price');
    }
}
```

### Retrieving Relationship Fields

#### Eloquent Fields

Use a closure to read a related model. This example returns the related kitchen name as `kitchen_name`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;// [!code ++:3]
use PowerComponents\LivewirePowerGrid\PowerGridFields;
use App\Models\Product;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields// [!code ++:7]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('kitchen_name', fn (Product $product) => e($product->kitchen->name));
    }
}
```

#### Join Fields

Fields from the joined table are available under the alias assigned in the query. Here `kitchens.name` is `kitchen_name`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;
use PowerComponents\LivewirePowerGrid\Facades\PowerGrid;// [!code ++:2]
use PowerComponents\LivewirePowerGrid\PowerGridFields;

class ProductTable extends PowerGridComponent
{
    public function fields(): PowerGridFields// [!code ++:7]
    {
        return PowerGrid::fields()
            ->add('id')
            ->add('name')
            ->add('price')
            ->add('kitchen_name');
    }
}
```

### Formatting Data

To modify data before it is displayed, see [Formatting Data](/data-management/formatting-data.html).

## Custom Primary Key

`$primaryKey` and `$sortField` default to `id`. Change both when your key column differs, or when joined tables both expose `id`. If the SQL key is qualified (for example `products.id`) but the row attribute is not, also set `$primaryKeyAlias`.

```php [app/Livewire/ProductTable.php]
use PowerComponents\LivewirePowerGrid\PowerGridComponent;

class ProductTable extends PowerGridComponent
{
    public string $primaryKey = 'products.custom_product_id';// [!code ++]

    public ?string $primaryKeyAlias = 'custom_product_id';// [!code ++]

    public string $sortField = 'products.custom_product_id';// [!code ++]
}
```
