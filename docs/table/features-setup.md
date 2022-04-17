# Features Setup

The `setup()` method controls general features present in your Table.

You can find this method inside your PowerGrid file (e.g. `DishTable.php`).

Example of usage:

```php
//..
public function setUp()
{
   $this->showCheckBox()
      ->showRecordCount('short')
      ->showPerPage()
      ->showSearchInput()
      ->showExportOption('download', ['excel', 'csv']);
}
```

You can chain the methods to configure the following features:

## showCheckBox()

Enables and displays checkboxes on each table row.

Result:

<img class="result-image" alt="showCheckBox" src="../_media/examples/features/showCheckBox.png" width="200"/>

---

## showPerPage(int $perPage)

Shows a dropdown menu for selecting the number of rows displayed per page (default: 10).

By default, `$perPage` accepts the values: `10`, `25`, `50`, `100` and `0` (zero represents "show all").

If you need a different set of values, you may override the `$perPageValues` array. See the following example:

```php
class DishesTable extends PowerGridComponent
{
   //Custom per page values
   public array $perPageValues = [0, 5, 10, 1000, 5000];

    public function setUp()
    {
        $this->showPerPage(10);
    }

    //....
```

Result:

<img class="result-image" alt="showPerPage" src="../_media/examples/features/showPerPage.png"/>

---

## showSearchInput()

Enables the search functionality and show the search input field at the page top.

Result:

<img class="result-image" alt="showSearchInput" src="../_media/examples/features/showSearchInput.png"/>

---

## showRecordCount(string $mode)

Shows the record count at the page bottom.

Available modes:

- **full** (default): Full sentence. E.g., `Showing 1 to 10 of 100 Results`.
- **short**: Only numbers including total. E.g, `1 - 10 | 100`.
- **min**: Only numbers, without total. E.g., `1 - 10`

Example:

`->showRecordCount('full')`

Result:

<img class="result-image" alt="showRecordCount" src="../_media/examples/features/showRecordCount.png" width="400"/>

---

## showExportOption(string $fileName, array $type)

Enable the `export to file` functionality and shows export button at the page top.

The file name (`$fileName`) and file type must be provided.

Available file types:

- *excel*
- *csv*

Example:

`->showExportOption('my-dish-table', ['excel', 'csv'])`

Result:

<img class="result-image" alt="showExportOption" src="../_media/examples/features/showExportOption.png"/>

> 💡 If you are working with lots of data, we recommend to use [Queue Export](table/queue-export).

---

## showToggleColumns()

Displays the button to hide/show (toggle) columns.

> Works fine without inline filters
Example:

`->showToggleColumns()`

Result:

<img class="result-image" alt="showToggleColumns" src="../_media/examples/features/showToggleColumns.png"/>

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/datasource?id=datasource">Next →</a></span>
</footer>

## persist(array $items)

If you need the state of columns and filters to be saved in cookies, you can use the persist method.

Example:

`->persist(['columns', 'filters'])`

Result:

![Output](../_media/persist.gif)

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/table/datasource?id=datasource">Next →</a></span>
</footer>
