# Detail Row

Em alguns casos precisamos mostrar mais informações na tabela como, por exemplo: _ao selecionar um produto gostaria de ver quais 
ingredientes esse produto tem ou outras informações como estoque, faturamento, etc_.

> Nota: O back-end será consultado somente quando fizer o toggle.

## Usage

Para usar o **Detail Row** você precisará: 

* Estar com o tailwind tema ativo
* Usar a classe Detail dentro de `setUp`.
* Ter uma view blade para mostrar os detalhes.

Esse é um exemplo:

```php
    public function setUp(): array
    {
        return [
            // ..
            Detail::make()
                ->view('components.detail')
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
Result:

<img class="result-image" alt="disable" src="../_media/examples/features/detail-row-open.png" width="600"/>

--- 

### View

Existem duas maneiras de você especificar a view blade com o details:

* Passando no parãmetro `->view('components.detail')`
* Alterando o comportamento em [Action Rules]()

---

### Parameters

No Detail, você poderá acessar qualquer variável do componente livewire powergrid e passar outros parâmetros em conjunto, para isso faça:

```php
->options(['name' => 'Luan'])
```

Na view, poderá acessar o método dessa maneira (Examplo):

```php
<div>
   {{ $tableName }} 
   {{ data_get($options, 'name') }} // or $options['name'] 
</div>

```

### Collapse

Você poderá fazer o toggle do detail através do método `toggleDetail` em [Button]() ou simplesmente chamando o método
`$this->toggleDetail(string $id)` passando o Id como parâmetro. 

<hr/>
<footer style="float: right; font-size: larger">
    <span><a style="text-decoration: none;" href="#/support">Support →</a></span>
</footer>
