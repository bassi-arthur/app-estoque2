const produtos = [];
const nomeProduto = document.getElementById('nomeProduto');
const quantidadeProduto = document.getElementById('quantidadeProduto');
const inputBusca = document.getElementById('inputBusca');
const visualizacaotamaho = document.getElementById('tamanhoLista');
const visualizacaoBtnSalvar = document.getElementById('btnSalvar')
const btnSalvar = document.getElementById('btnCadastro')
let proximoId = 0;

const buscaPorId = id => produto => produto.id === id;

inputBusca.addEventListener('keyup', (event) => {
    const nome = event.target.value;
    const listaProdutos = buscaProdutoPorNome(nome);
    atualizaListaProdutos(listaProdutos);
});

const atualizaListaProdutos = (listaProdutos) => {
    var tabelaProdutos = document.getElementById('table-produtos')
    var row = tabelaProdutos.insertRow(0)
    let rowProduto = '';
    const produtosAListar = listaProdutos && listaProdutos.length > 0 ? listaProdutos : produtos;
    for (produto of produtosAListar) {
        rowProduto += `
        <tr>
          <th scope="row">${produto.id}</th>
          <td>${produto.nome}</td>
          <td>${produto.quantidade}</td>
          <td><i class="fas fa-trash-alt" onclick="removeProduto(${produto.id})"> </i><i class="fas fa-user-edit" onclick="carregaDadosProduto(${produto.id})"></i></td>
        </tr>`;
    }
    visualizacaoProdutos.innerHTML = rowProduto;
    indicadores()
}

const visualizacaoProdutos = document.getElementById('table-produtos');

const adicionaProduto = () => {
    const produto = {
        id:proximoId,
        nome: nomeProduto.value,
        quantidade: parseInt(quantidadeProduto.value)
    };
    produtos.push(produto);
    proximoId++;
    atualizaListaProdutos();
    limpaCampos();
    indicadores()
}


const limpaCampos = () => {
    nomeProduto.value = '';
    quantidadeProduto.value = '';
}

const buscaProdutoPorNome = (nome) => {
    const nomeUpperCase = nome.toUpperCase();
    const listaProdutosEncontrandos = produtos.filter((nome) => nome.nome.toUpperCase().search(nomeUpperCase) > -1);
    return listaProdutosEncontrandos;
}

const removeProduto = (id) => {
    const produtoIndex = produtos.findIndex((produto) => produto.id === id)
    produtos.splice(produtoIndex, 1)
    atualizaListaProdutos()
    indicadores()
}

const editarProduto = (id) => {
    const produtoIndice = produtos.findIndex(buscaPorId(id));
    produtos[produtoIndice] = {
        id,
        nome: nomeProduto.value,
        quantidade: parseInt(quantidadeProduto.value)
    }
    limpaCampos();
    atualizaListaProdutos();
    btnSalvar.onclick = adicionaProduto;
}

btnSalvar.onclick = adicionaProduto;

const carregaDadosProduto = (id) => {
    const produto = produtos.find(buscaPorId(id));
    nomeProduto.value = produto.nome;
    quantidadeProduto.value = produto.quantidade;
    btnSalvar.onclick = () => editarProduto(id);
}

const indicadores = () => {
    let tamanho = produtos.length
    let tamanhoLista = `<h3>${tamanho}</h3>`
    visualizacaotamaho.innerHTML = tamanhoLista;
}

