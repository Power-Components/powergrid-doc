# Release Notes

[[toc]]

### Deprecations

The following items have been deprecated in this release:

* Laravel 9
* Livewire 2
* Read a dynamic property within a parameter on buttons
* Column::clickToCopy
* ActionButton trait
* `PowerGrid::eloquent()` changed to `PowerGrid::columns()`
* PowerGrid demo command (`php artisan powergrid:demo`)
* Rule::caption changed to Rule::slot

---

### Improves & Features

* The "_actions_" and "_actionRules_" methods will be row-scoped (Model, array).
  * E.g.,
  ```php
  public function actions()
  {
    // 
  }
  
  public function actions($row) // Model|array $row, // [!code focus:6]
  { 
    // 
  }
  ```
  
* Column "`Column::action()`" is required
* All methods on buttons are now [macros](https://laravel.com/api/10.x/Illuminate/Support/Traits/Macroable.html). See this example:

::: code-group

```php{7-20} [AppServiceProvider.php]
use PowerComponents\LivewirePowerGrid\Button;
  
class AppServiceProvider extends ServiceProvider
{
      public function boot(): void
      {
          Button::macro('icon', function (string $icon, array $attributes = []) {
              $this->dynamicProperties['icon'] = [
                  'component' => 'a',
              ];
  
              $attributes = new ComponentAttributeBag($attributes);
              $attributes = $attributes->merge(['class' => 'w-5 h-5'])->toHtml();
  
              $this->slot = Blade::render(<<<HTML
  <x-icon name="$icon" $attributes />
  HTML, ['attributes' => $attributes]);
  
              return $this;
          });
      }
}
```

```php [MyTable.php]
class MyTable extends PowerGridComponent
{
     // ---
     public function actions($dish): array
     {
         return [
            Button::add('edit')
                ->icon(icon: 'pencil', attributes: ['w-5 h-5']) // [!code focus]
                 ->route('advices.edit', ['advice' => $dish->id]),
         ];
     }
}
```

:::

| key       | value                     |
|-----------|---------------------------|
| component | a, span, button, div, etc |
| attribute | html attribute            |
| value     | html attribute value      |

--- 

* Performance improvement and it is now possible to customize `withSum, withCount, withMin, withMax, withAVG`

::: info
A new syntax has been added to allow for summary formation
:::

```php
      public function summarizeFormat(): array
      {
          return [
              'price.{sum,avg}' => function ($value) {
                  return (new \NumberFormatter('en_US', \NumberFormatter::CURRENCY))
                      ->formatCurrency($value, 'USD');
              },
              'price.{count,min,max}' => fn ($value) => $value,
          ];
      }
```

---
  
* Added `filterRelation()` method to `Filter::inputText()`
  ```php{5}
  public function filters(): array
  {
     return [
         Filter::inputText('category_name')
            ->filterRelation('category', 'name')
    ];
  }
  ```
  
---

* Added closure (`\Closure`) to datasource and `depends` method to check filter dependencies (`Filter::select`)

::: info 
In this case below, when filtering a category, the value will automatically be sent to the chef filter.
::: 

  ```php{10,11-18} 
  public function filters()
  {
       return [
            Filter::select('category_name', 'category_id')
                ->dataSource(Category::all())
                ->optionLabel('name')
                ->optionValue('id'),

            Filter::select('chef_name', 'chef_id')
                ->depends(['category_id'])
                ->dataSource(fn ($depends) => Chef::query()
                    ->when(isset($depends['category_id']),
                        fn (Builder $query) => $query->whereRelation('categories',
                            fn (Builder $builder) => $builder->where('id', $depends['category_id'])
                        )
                    )
                    ->get()
                )
                ->optionLabel('name')
                ->optionValue('id'),
      ];
  }
  ```
  
---

* Added `Rule::loop` method to interact with `$loop` blade variable
  ```php{5-7}
  public function actionRules($row): array
  {
       return [
           Rule::rows()
               ->loop(function ($loop) {
                   return $loop->index % 2;
               })
               ->setAttribute('class', '!bg-gunmetal-100'),
       ];
  }
  ```
