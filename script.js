function buscarProdutosNoServidor() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(json => {
            produtos = json;
            mostrarProdutos();
        }).catch(error => {
            alert('Erro ao buscar produtos da API.');
        });
}

let carrinho = [];

let produtos = [];

function mostrarProdutos() {
    const containerProdutos = document.getElementById('produtos');

    if (produtos.length === 0) {
        containerProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }
    
    containerProdutos.innerHTML = produtos.map(produto => `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

// Controle do Carrinho
function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemCarrinho = carrinho.find(item => item.id === idProduto);

    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarContadorCarrinho();
    mostrarCarrinho();
}

function atualizarContadorCarrinho() {
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;
}

function mostrarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const finalizarCompra = document.getElementById('finalizar-compra');  

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<p>Carrinho vazio.</p>';
        totalCarrinho.innerHTML = '';
        finalizarCompra.style.display = 'none';
        return;
    }


    itensCarrinho.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <div>
                <h4>${item.nome}</h4>
                <p>Quantidade: ${item.quantidade}</p>
            </div>
            <div>
                <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
            </div>
        </div>
    `).join('');

    const total = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
    totalCarrinho.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
        
    if (carrinho.length > 0) {
        finalizarCompra.style.display = 'block';
    } else {
        finalizarCompra.style.display = 'none';
    }

}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarContadorCarrinho();
    mostrarCarrinho();
}

// Controle do modal do carrinho
const iconeCarrinho = document.querySelector('.icone-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const modalOverlay = document.querySelector('.modal-overlay');
const fecharCarrinho = document.querySelector('.fechar-carrinho');

iconeCarrinho.addEventListener('click', () => {
    modalCarrinho.classList.add('ativo');
    modalOverlay.classList.add('ativo');
});

function fecharModalCarrinho() {
    modalCarrinho.classList.remove('ativo');
    modalOverlay.classList.remove('ativo');
    
}

fecharCarrinho.addEventListener('click', fecharModalCarrinho);

function finalizarCompra() {

    fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigoDoPedido: Date.now(),
            itens: carrinho.map(item => ({ id: item.id, quantidade: item.quantidade }))
        }
        )
    }).catch(error => {
        alert('Erro ao finalizar a compra');
    });

    alert('Compra finalizada com sucesso!');
    
    window.location.reload();
}

// Inicializa a loja
buscarProdutosNoServidor();