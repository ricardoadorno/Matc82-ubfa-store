let produtos = [];
let pedidos = [];

function buscarProdutos() {
    fetch('http://localhost:3000/produtos').
        then(response => response.json()).
        then(json => {
            produtos = json;
            renderizarProdutos();
        }).catch(error => {
            alert('Erro ao buscar produtos da API.');
        });
}

function buscarPedidos() {
    fetch('http://localhost:3000/pedidos').
        then(response => response.json()).
        then(json => {
            pedidos = json;
            renderizarPedidos();
        }).catch(error => {
            alert('Erro ao buscar pedidos da API.');
        });
}

function renderizarProdutos() {
const containerProdutos = document.getElementById('listaProdutos');
containerProdutos.innerHTML = produtos.map(produto => `
    <div class="cartao-produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-remover" onclick="removerProduto(${produto.id})">Remover</button>
        <button class="btn-editar" onclick="renderizarFormularioEdicao(${produto.id})">Editar</button>
    </div>
`).join('');
}

function renderizarPedidos() {
const containerPedidos = document.getElementById('listaPedidos');
let total = 0;

containerPedidos.innerHTML = pedidos.map(pedido => `
    <div class="pedidos">
        <h3>Pedido #${pedido.codigoDoPedido}</h3>
        ${pedido.itens.map(item => {
            const produto = produtos.find(p => p.id === item.id);
            total += produto.preco * item.quantidade;
            return `
                <div class="cartao-pedido">
                    <p>${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${item.quantidade}</p>
                </div>
            `
        })}
        <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
    </div>
`).join('');
}

function renderizarFormularioEdicao(produtoId) {
const containerFormulario = document.querySelector('.formulario');
const produto = produtos.find(p => p.id === produtoId);

containerFormulario.innerHTML = `
        <h2>Editar Produto</h2>
        <label for="nomeProduto">Nome:</label>
        <input type="text" id="nomeProduto" value="${produto.nome}">
        <label for="precoProduto">Preço:</label>
        <input type="number" id="precoProduto"  value="${produto.preco}">
        <label for="imagemProduto">Imagem:</label>
        <input type="text" id="imagemProduto" value="${produto.imagem}">
        <button onclick="editarProduto(${produtoId})">Editar</button>
`;

 document.getElementById('nomeProduto').focus();
}

function adicionarProduto() {

const novoProduto = {
    id: produtos.length + 1,
    nome: document.getElementById('nomeProduto').value,
    preco: parseFloat(document.getElementById('precoProduto').value),
    imagem: document.getElementById('imagemProduto').value,
};

fetch('http://localhost:3000/produtos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoProduto)
}).then(response => response.json())
    .then(json => {
        window.location.reload();
    }).catch(error => {
        alert('Erro ao adicionar produto na API.');
    });
    
}

function removerProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    }).then(response => {
        window.location.reload();
    }).catch(error => {
        alert('Erro ao remover produto da API.');
    });
}

function editarProduto(id) {

    const produtoEditado = {
        nome: document.getElementById('nomeProduto').value,
        preco: parseFloat(document.getElementById('precoProduto').value),
        imagem: document.getElementById('imagemProduto').value,
    };

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoEditado)
    }).then(response => response.json())
        .then(json => {
            window.location.reload();
        }).catch(error => {
            alert('Erro ao editar produto na API.');
        });

}

// Inicialização
buscarProdutos();
buscarPedidos();