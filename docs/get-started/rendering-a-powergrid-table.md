---

title: Rendering a PowerGrid Table
description: Display your data grids anywhere on your site. Learn the simple syntax needed to include your newly created tables directly into your frontend layouts.

---

# Rendering a PowerGrid Table

[[toc]]

## Render PowerGrid

PowerGrid Tables are Livewire components. Render `ProductTable` (`app/Livewire/ProductTable.php`) with:

```php [resources/views/my-view.blade.php]
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>My App</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @livewireStyles
    </head>
    <body>
        <livewire:product-table />// [!code focus] //[!code ++]

        @livewireScripts
    </body>
</html>
```

For multiple tables on one page, passing data, routes, and subfolders, see [Render PowerGrid Tables](/powergrid/render.html).

## Next steps

- [Datasource](/table-structure/datasource.html)
- [Columns](/table-structure/columns.html)
