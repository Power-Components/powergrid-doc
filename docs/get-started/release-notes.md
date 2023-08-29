# Release Notes

[[toc]]

## PowerGrid Version 5

### Deprecations

The following items have been deprecated in this release:

* Laravel 9
* Livewire 2
* Read a dynamic property within a parameter on buttons
* ClickToCopy
* ActionButton trait
* PowerGrid::eloquent()

---

### Improves & Features

* The method "actions" and "actionRules" will have row scope (Model, array).
* "`Column::action()`" column is required
* All methods on Buttons are now Macros.
* Performance improvement and it is now possible to customize `withSum, withCount, withMin, withMax, withAVG`
* Added `filterRelation()` to `Filter::inputText()`
* Add Closure to datasource to check filter dependencies (Filter::select)
