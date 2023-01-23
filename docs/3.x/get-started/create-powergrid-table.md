# Create a PowerGrid Table

[[toc]]

::: warning
You must have PowerGrid [installed](install.html#installation) and properly [configured](configure.html?id=configure#configure) before proceeding.
:::

### Create Command

To create a PowerGrid table, run the following command:

```bash
php artisan powergrid:create  
```

<br>

Now, answer the question in your screen to complete the creation process:

**1. Enter the name of your PowerGrid Component.**

For example: `DishTable`.

---

**2. Indicate if your component will use a Model or a Collection as data source.**

Type `M` for Model or `C` for Collection.


This example uses the Dish Model, so we typed `M`:


---

**3. If you choose Model, enter the path to your Model.**

In this example, the Dish Model is located at App\Models\Dish.

If you don't specify App\Models -powergrid will create based on default App\Models directory.


---

**4. Use Fillable?**

PowerGrid can create columns based on your Model's `fillable` property.

Supported databases are: MySQL, Postgre and SQLite.

If desirable, type `yes` to use this feature.

> If you don't use the 'id' column as the primary key, you should make sure your model is `protected $primaryKey = null`;

---

**⚡ PowerGrid Table created!**

PowerGrid indicates the location where your new Table component was created.

You can also see the syntax to include the Table in your page:

![Output](/_media/create_output.png)
<hr/>

## Using Stubs

Powergrid can have multiple stubs, follow this step:

* Publish
* Make the changes
* Rename if necessary
* Use it using `--template` when creating

--- 

### Publish command

> If you need to create multiple stubs, be sure to rename them before publishing.

```bash
php artisan powergrid:publish --type=stub
```


### Create with template

`--template`=full location of the stub template

```bash
php artisan powergrid:create --template=stubs/table.model.stub
                                     // stubs/my-custom-table.stub
```

