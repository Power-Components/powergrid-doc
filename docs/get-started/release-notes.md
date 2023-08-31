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
* PowerGrid::eloquent()
* PowerGrid demo command (`php artisan powergrid:demo`)
* Rule::caption changed to Rule::slot

---

### Improves & Features

* The "actions" and "actionRules" methods will be row-scoped (Model, array).
* Column "`Column::action()`" is required
* All methods on buttons are now macros.
* Performance improvement and it is now possible to customize `withSum, withCount, withMin, withMax, withAVG`
* Added `filterRelation()` to `Filter::inputText()`
* Added closure to datasource to check filter dependencies (Filter::select)
* Added rule::loop to interact with $loop blade variable
