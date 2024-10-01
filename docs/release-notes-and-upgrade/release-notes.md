# Release Notes

[[toc]]

### Deprecations

The following items have been deprecated in this release:

* Using `dynamicProperties` in Button macros.
* Drop support for `openspout/openspout` v3.
* Removed `Cache::make()->forever()` method.
* Removed Cache `rememberForever()` via config `cache_data` key.
* Removed from `Button::make()->method()` method.
* Removed `Button::make()->target()` method (now in route method).
* Removed `Button::make()->bladeComponent()` method available only for `actionRules()`.
* Removed `Button::make()->render()` method You can work around this by using `bladeComponent` in `actionRules()` method.
* Removed `tom-select.css` from dist. Use native CSS instead of PowerGrid dist path
---

### New Properties

* `$supportModel` (default: true) to control model support. By default, forceFill on the model loads all model attributes.
* `$withoutResourcesActions`: Disable process of icons in javascript memory

### Config Keys

**Added**:

- `cache_ttl`: (default: ) Value in seconds to keep some PowerGrid actions in the cache, such as actions and rules.
- `icon_resources`: Specifies resources settings for load SVG icons in the Javascript window.

**Removed**

* `cache_data` - Cache forever for collections.
* `check_version` - Enable release notification in powergrid:create command.

---

### Changes

`Button::route` needs 3rd parameters called target (_self, _blank)
`Button::toggleDetail()` button needs row id

### Improves & Features

### ✨ Javascript Actions Rendering

::: info
* Action rendering has been refactored for better performance and flexibility.
:::

**💡How it works**:

PowerGrid will load SVG icons (using Blade) at the beginning of the request and store them in JavaScript memory (window). This is configured via the config file (`icon_resources`). JavaScript-based action processing

Actions will be processed using JavaScript instead of PHP, reducing PHP memory usage and minimizing Livewire's payload. Reduced PHP memory usage

By processing actions with JavaScript, unnecessary PHP memory usage is eliminated, resulting in more efficient performance.

---

**Example**:

When adding the icon paths, PowerGrid will keep them saved in javascript to be used in the actions.
Suppose we are using icons provided by [wireui](https://wireui.dev/), and we want to use our actions, like this:

```php [MyTable.php]
Button::make('edit')
    ->icon('solid-pencil', [
       'x-tooltip' => __('Edit'),
    ])
    ->class('btn-icon-secondary')
    ->dispatch('save', [
         'payload' => ['key' => $row->id],
    ]),
```

So, our setup will look like this:

`config/livewire-powergrid.php`
```php
    'icon_resources' => [
        'paths' => [
            'outline' => 'vendor/wireui/wireui/resources/views/components/icons/outline',
            'solid'   => 'vendor/wireui/wireui/resources/views/components/icons/solid',
        ],

        'allowed' => [
            'cog',
            'pencil',
            'arrow-right',
        ],

        'attributes' => ['class' => 'size-5'],
    ],
```

| icon_resources | list of icons (SVG) that will be loaded into javascript memory              |
|----------------|-----------------------------------------------------------------------------|
| paths          | path containing the icons                                                   |
| allowed        | Only the icons defined here will be processed. If empty, all will be loaded |
| attributes     | attributes that will be added by default to the SVG                         |

### ✨ Column Macros

* If you need to add different query logic when searching for example, you can create a new macro (let's assume `searchableDateFormat`):

`AppServiceProvider`, boot method.
```php
Column::macro('searchableDateFormat', function () {
      $this->rawQueries[] = [
          'method'   => 'orWhereRaw',
          'sql'      => 'DATE_FORMAT('.$this->dataField.', "%d/%m/%Y") like ?',
          'bindings' => ['%{search}%'],
          'enabled'  => function (PowerGridComponent $component) {
              return filled($component->search);
          },
      ];

      return $this;
});
```

Now, in any PowerGrid table component:
```php
 Column::make('Created At', 'created_at')
     ->searchableDateFormat(),
```

### Row Template

If you want to customize a record in the table without using Blade's processing, you can use the rowTemplate() method. This approach prevents the unnecessary creation of Blade components for the same field across different rows by leveraging JavaScript instead.

**Consider the following example:**

::: info
For each rendered row in the 'name' field, a view will be created in PHP during the rendering process:
::: 

```php
public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('id')
        ->add('name', function ($row) {
            return \Blade::render(<<<blade
                <div id="custom-\$id" class="bg-red-100 py-1 rounded px-3">\$name</div>
            blade, [
                'id'   => $row->id,
                'name' => $row->name,
            ]);
        })
}
```

We can simplify this by using JavaScript to handle the rendering, as shown below:

```php{5-11,15-20}
 public function fields(): PowerGridFields
{
    return PowerGrid::fields()
        ->add('id')
        ->add('name', function ($row) {
            return [
                'template-name' => [
                    'id'   => $row->id,
                    'name' => $row->name,
                ],
            ];
        });
}

public function rowTemplates(): array
{
    return [
        'template-name' => '<div id="custom-{{ id }}" class="bg-red-100 py-1 rounded px-3">{{ name }}</div>',
    ];
}
```

In this setup, we instruct PowerGrid to look for 'template-name' and replace the HTML with the corresponding template during rendering. 
By doing so, the layout and styling are managed by JavaScript, which dynamically populates the fields with the appropriate data for each row.

This approach reduces the overhead associated with generating Blade views for each row, leading to improved performance and easier maintenance, especially when dealing with large datasets. 
Instead of repeatedly rendering Blade components, the JavaScript-based solution efficiently handles the customization directly in the browser, making your application more responsive and streamlined.
