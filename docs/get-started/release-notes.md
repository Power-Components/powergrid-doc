# Release Notes

### Dependencies

Para manter o projeto sempre atualizado com as últimas recomentações, optamos por atualizar as versões mínimas requiridas do projeto para ter maior suporte e durabilidade

[Veja mais](get-started/upgrade-guide?id=dependency-upgrades)

---

### Improved setUp method

Mudamos a maneira como tratamos a inicialização do componente powergrid para facilitar a inclusão de novos métodos e melhorias em partes isoladas.

[Veja mais](table/features-setup?id=features-setup)

---

### Export using openspout/openspout

Removemos o pacote anterior [box/spout](https://github.com/box/spout) pelo [openspout/openspout](https://github.com/openspout/openspout). Isso trará novas oportunidades e melhorias na exportação e compatibilidades com PHP 8 superior.

[Veja mais](https://github.com/openspout/openspout#copyright-and-license)

---

### Ability to place stripes on export

A partir dessa versão podemos definir a própria cor na listragem de exportação passando o parâmetro `striped('color')` (somente XLS) .

```php
    public function setUp(): array
    {       
        return [
            Exportable::make('export')
                ->striped('f9a303') // Hex without '#'
                ->type(Exportable::TYPE_XLS),
        ];
    }
```

Result:

<img class="result-image" alt="validation" src="../_media/examples/features/striped.png" width="500"/>

[Veja mais](https://github.com/openspout/openspout#copyright-and-license)

---

### Design improvement

Fizemos algumas melhorias no layout (tailwind only).

Result:

<img class="result-image" alt="validation" src="../_media/examples/features/new-layout.png" width="1200"/>

---

### Show ErrorBag in editOnClick line

Agora podemos mostrar uma mensagem de erro diretamente na linha do editOnClick após ser verificada
pelo método `$this->validate()` no backend.

Será ativado quando `$showErrorBag = true`;

Aqui está um exemplo:

```php
    public bool $showErrorBag = true;

    protected array $rules = [
        'name.*' => ['required', 'min:6'],
    ];
    
    public function columns(): array
    {
         return [
             Column::add()
                ->title('Name')
                ->field('name')
                ->editOnClick(true)
         ];
    }

    public function onUpdatedEditable($id, $field, $value): void
    {
        $this->validate();
        User::query()->find($id)->update([
            $field => $value,
        ]);
    }

```

Result:

<img class="result-image" alt="validation" src="../_media/examples/features/validation.png" width="500"/>

---

### Detail row (tailwind only)

Agora podemos inserir detalhes para cada linha reaproveitando os detalhes do componente.

Exemplo:
```php
   use PowerComponents\LivewirePowerGrid\Detail;

   public function setUp(): array
    {
        return [
            Detail::make()
                ->view('components.detail') // views/components.detail.blade.php
                ->options(['name' => 'Luan'])
                ->showCollapseIcon(),
        ];
    }
```
`view/components.detail.blade.php`
```html
<div class="p-2 bg-white border border-slate-200">
    <div>Id {{ $id }}</div>
    <div>Options @json($options)</div>
</div>
```

Result - Detail closed:

<img class="result-image" alt="validation" src="../_media/examples/features/detail-row-close.png" width="500"/>

Result - Detail open:

<img class="result-image" alt="validation" src="../_media/examples/features/detail-row-open.png" width="500"/>

Também podemos trocar a view para uma linha específica utilizando [Action Rules](table/action-rules?id=action-rules).

`toggleDetail()` method fará o toggle do detail.

```php
    public function actions(): array
    {
        return [
            Button::make('detail', 'Detail')
                ->class('bg-indigo-500 rounded-md cursor-pointer text-white px-3 py-2 m-1 text-sm')
                ->toggleDetail(),
        ];
    }

    public function actionRules(): array
    {
        return [
            Rule::rows()
                ->when(fn (User $user) => $user->id == 1)
                // view, array $options
                ->detailView('components.detail-rules', ['test' => 1]),
        ];
    }

```

[Veja mais](get-started/release-notes?id=improved-setup-method)

---

### Column make

As novas tabelas criadas virão com `Column::make` ao invés de `Column::add()->title ...`

Exemplo anterior (não depreciado).
```php
    <!-- Before -->
    public function columns(): array
    {
         return [
             Column::add()
                ->title('Name')
                ->field('name')
         ];
    }
```
Agora:
```php
    <!-- After -->
    public function columns(): array
    {
         return [
             // make(string $title, string $field, string $dataField = '')
             Column::make('Name', 'name', 'dishes.name')
         ];
    }
```

---

### Button make

As novas tabelas criadas virão com `Button::make` ao invés de `Button::add()->title ...`

Exemplo anterior (não depreciado).
```php
    <!-- Before -->
    public function actions(): array
    {
         return [
             Button::add('detail')
                ->caption('Detail')
         ];
    }
```
Agora:
```php
    <!-- After -->
    public function actions(): array
    {
         return [
             // make(string $action, string $caption)
             Button::add('detail', 'Detail')
         ];
    }
```
---
###

<hr />
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/get-started/upgrade-guide">Upgrade Guide →</a></span>
</footer>