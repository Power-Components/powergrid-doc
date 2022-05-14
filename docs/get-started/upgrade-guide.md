### Upgrade From V2

PowerGrid is now on version 3.x.

This page will give you important information to upgrade from v2.x.

> **❗ Important:**  Republish views if you have previously published
```bash
php artisan vendor:publish --tag=livewire-powergrid-views --force && php artisan view:clear
```

After making all the changes, be sure to run the command
```bash
npm run dev
```

### Dependency Upgrades

* PHP 8.0+
* [Laravel Framework](https://laravel.com/) 8.75+ | 9.0+
* [Laravel Livewire](https://laravel-livewire.com/docs/2.x/quickstart) 2.10+
* [Tailwind](https://tailwindcss.com/) v3+


---

### Deprecations

* [Update Data](https://2x.livewire-powergrid.com/#/table/update-data?id=reload-data-after-update)
* Tailwind v2 support

---

### Updating setUp Method

```php
     <!-- 🚫 Before -->
    public function setUp()
    {
       $this->showCheckBox()
          ->showRecordCount('short')
          ->showPerPage()
          ->showSearchInput()
          ->showExportOption('download', ['excel', 'csv']);
    }
```

Changed to:

```php
    <!-- ✅ After -->
    use PowerComponents\LivewirePowerGrid\Header;
    use PowerComponents\LivewirePowerGrid\Footer;
    use PowerComponents\LivewirePowerGrid\Exportable;
    
    public function setUp(): array
    {
        $this->showCheckBox();

        return [
            Exportable::make('export')
                ->type(Exportable::TYPE_XLS, Exportable::TYPE_CSV),
            Header::make()
                ->showToggleColumns()
                ->showSearchInput(),
            Footer::make()
                ->showPerPage()
                ->showRecordCount(),
        ];
    }
```

Read more about [setUp](table/features-setup?id=features-setup).

---

### Remove (? nullable) from addColumns
```php
     <!-- 🚫 Before -->
    public function addColumns(): PowerGridEloquent
```

Change To:
```php
     <!-- ✅ After -->
    public function addColumns(): PowerGridEloquent
```

---

### Changing updateMessages method

* Now we have specific methods for each situation:
  * **onUpdatedEditable**
  * **onUpdatedToggleable**
  

```php
    <!-- 🚫 Before -->
    public function update(array $data): bool
    {
      //...
    }
```

Change To:

```php
    <!-- ✅ After -->
    // when update from editable 
    public function onUpdatedEditable(string $id, string $field, string $value): void
    {
        // example
        User::query()->find($id)->update([
            $field => $value,
        ]);
    }
    // when update from toggleable
    public function onUpdatedToggleable(string $id, string $field, string $value): void
    {
    }
```

### 

<hr />
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/get-started/demo">Demo →</a></span>
</footer>
