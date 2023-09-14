# Include Columns

Table columns are controlled by the `columns()` method.

You can find this method is inside your PowerGrid file (e.g., `DishTable.php`).

::: warning
Before proceeding, check if you have [Added the column](add-columns) in order to have it available for including.
:::

## Usage

To display a column to your table, include a new `Column::add()` in the `columns()` method.

Place your code inside the method's `return []` statement.

You should always provide both [title()](#titlestring-title) and [field()](#fieldstring-field-string-datafield).  View all [Column Methods](#column-methods).

Example:

```php
public function columns(): array
{
     return [
         Column::add()
             ->title('ID')
             ->field('id'),
        
         Column::add()
             ->title('Dish name')
             ->field('name')
             ->searchable(),
        
         Column::add()
             ->title('Price + taxes')
             ->field('price_after_taxes')
              ->sortable(),
      ];
}
```
`or using make() method`
```php
public function columns(): array
{
     return [
         Column::make(title: 'ID', field: 'id'),

         Column::make(title: 'Dish name', field: 'name')
            ->searchable(),

         Column::make(title: 'Price + taxes', field: 'price_after_taxes')
             ->sortable(),
  ];
}
```

## Column Methods

The methods below can be chained to the `PowerComponents\LivewirePowerGrid\Column` class.

### add

Adds a new column to your PowerGrid Table.

Example:

```php{1}
Column::add()
```

---

### title

* Sets a title in the column header.

| Parameter        |
|------------------|
| (string) $string |


Example:

```php{2}
Column::add()
    ->title('Price in EUR'),
```

::: tip
You can translate your title using Laravel's [translation strings](https://laravel.com/docs/8.x/localization#retrieving-translation-strings) feature.
:::

---

### placeholder

* Sets the placeholder for this column when using a [Column Filter](column-filters).

| Parameter             |
|-----------------------|
| (string) $placeholder |


Example:

```php{2}
Column::add()
    ->placeholder('Placeholder Description'),
```

---

### field

* Links the column to an existing [Datasource](datasource) field or [Custom Column](custom-columns).

| Parameter           | Description                                                                                                                                                                      |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| (string) $field     | database table field name or array field                                                                                                                                         |
| (string) $dataField | Optionally, you may pass a second parameter `$dataField` referring to the data source table and field. This is useful when you join tables and must maintain unique field names. |

Example:

```php{2}
Column::add()
    ->field('price_formatted'),
```

With dataField:

```php{2}
Column::add()
    ->field('category_name', 'categories.name'),
```

---

### searchable

By default, columns are not included when searching with [Search Input](features-setup?id=showsearchinput).

This method allows the column's content to be searched with this feature.

Example:

```php{2}
Column::add()
    ->searchable(),
```
---

### sortable

* Adds a sort button to the column header.

Example:


```php{2}
Column::add()
    ->sortable(),
```

::: warning
If your column fetches data via relationship, you must `join` the related table in your [Datasource](datasource) query.
::: 

---

### hidden

* Hides the column in your PowerGrid table.

Example:

```php{2}
Column::add()
    ->hidden(),
```

---

### visibleInExport

* This method can be useful when you want a column to appear in the file but not at the web-page.

| Parameter       | Description                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| (bool) $visible | When `true`, the column when be included when using the `export to file` function. |

Example:

```php{5}
Column::add()
    ->title('Postal envelope data')
    ->field('postal_data')
    ->hidden()
    ->visibleInExport(true),
```

---

### headerAttribute

| Parameter       | Description |
|-----------------|-------------|
| (string) $class | HTML class  |
| (string) $style | HTML style  |

Adds the class or style to the column header.

Example:

```php{2}
Column::add()
    ->headerAttribute('text-center', 'color:red')
```

---

### bodyAttribute

* Adds the class or style to each table row in this column.

| Parameter       | Description |
|-----------------|-------------|
| (string) $class | HTML class  |
| (string) $style | HTML style  |

Example:

```php{2}
Column::add()
    ->bodyAttribute('text-center', 'color:red')
```

---

### contentClassField

* Adds the contents of the specified database column to the Table Column content &lt;span> CSS class attribute.

| Parameter           | Description      |
|---------------------|------------------|
| (string) $dataField | Database Column  |

Example:

```php{2}
Column::add()
    ->contentClassField('status_class')
```

---
     
### contentClasses

* Adds the corresponding value of the key matching the column content in the provided array to the Table Column content &lt;span> CSS class attribute.

| Parameter                      | Description                             |
|--------------------------------|-----------------------------------------|
| (array,string) $contentClasses | Column content => CSS Class assignments |

Example:

```php{2-5}
Column::add()
    ->contentClasses([
          'In Progress' => 'text-blue-600',
          'Completed' => 'text-green-600'
     ])
```

You can add CSS classes to the span attribute.

```php{2-5}
Column::add()
    ->contentClasses('text-blue-600')
```

---
