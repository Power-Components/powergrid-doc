# Release Notes

[[toc]]

## PowerGrid Version 5

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
  * Ex:
  ```php
  public function actions()
  {
    // 
  }
  
  public function actions($row) // Model|array $row,
  {
    // 
  }
  ```
* Column "`Column::action()`" is required
* All methods on buttons are now [macros](https://laravel.com/api/10.x/Illuminate/Support/Traits/Macroable.html). See this example:
  * [Livewire Dispatching events from Blade templates](https://livewire.laravel.com/docs/events#dispatching-events-from-blade-templates)
    ```php
      \PowerComponents\LivewirePowerGrid\Button::macro('dispatch', function (string $event, array $params) {
          $this->dynamicProperties['dispatch'] = [
               "component" => "button",
               "attribute" => "wire:click",
               "value"     => "\$dispatch('{$event}', " . Js::from($params) . ")",
          ];

          return $this;
      });
    ```
---

| key       | value                     |
|-----------|---------------------------|
| component | a, span, button, div, etc |
| attribute | html attribute            |
| value     | html attribute value      |

--- 

* Performance improvement and it is now possible to customize `withSum, withCount, withMin, withMax, withAVG`
  * A new syntax has been added to allow for summary formation
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

![Output](/_media/examples/summarize_format.png)

---
  
* Added `filterRelation()` to `Filter::inputText()`
  ```php
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
  * In this case below, when filtering a category, the value will automatically be sent to the chef filter.

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
