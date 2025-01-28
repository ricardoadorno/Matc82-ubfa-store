const produtos = [
    {
        id: 1,
        nome: 'Mochila com Compartimento para Notebook',
        preco: 129.90,
        imagem: 'https://files.expanssiva.com.br/products/500x500/mochila-poliester-com-compartimento-para-notebook-ate-14-polegadas-13395d3-1630947968.jpg'
    },
    {
        id: 2,
        nome: 'Caneca Personalizada UFBA',
        preco: 39.90,
        imagem: 'https://71468.cdn.simplo7.net/static/71468/sku/lembrancinhas-personalizadas-lembrancinhas-personalizadas-formatura-caneca-de-porcelana-personalizada-com-nome-e-curso--p-1663247084619.jpg'
    },
    {
        id: 3,
        nome: 'Adesivos',
        preco: 29.99,
        imagem: 'https://www.fabeestore.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/t/etiq-estudar.jpg'
    },
    {
        id: 4,
        nome: 'Camiseta Estampada',
        preco: 59.90,
        imagem: 'https://cdn.awsli.com.br/600x1000/679/679489/produto/63038828/ec6eca41d5.jpg'
    },
    {
        id: 5,
        nome: 'Pendrive 64GB',
        preco: 49.99,
        imagem: 'https://lojamultilaser.vtexassets.com/arquivos/ids/177906/pd587.jpg?v=636616736232800000'
    },
    {
        id: 6,
        nome: 'Kit de Material para Engenharia/Cálculo',
        preco: 189.90,
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_rqsjb2AAPwhg03Pdo6lRafR0eGOkzCVLQQ&s'
    },
    {
        id: 7,
        nome: 'Livros Diversos',
        preco: 44.90,
        imagem: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m33s1ujkfo4554'
    },
    {
        id: 8,
        nome: 'Fone de Ouvido Bluetooth',
        preco: 79.99,
        imagem: 'https://m.media-amazon.com/images/I/51yHf2TFfUL._AC_UF1000,1000_QL80_.jpg'
    },
    {
        id: 9,
        nome: 'Planner Acadêmico 2025',
        preco: 69.90,
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-F2-znoNxb8RL3S4oAFSNE1nbabbNjgEgQ&s'
    }
];


let carrinho = [];

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
                <button class="btn-remover " onclick="removerDoCarrinho(${item.id})">Remover</button>
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
    carrinho = [];
    atualizarContadorCarrinho();
    mostrarCarrinho();
    fecharModalCarrinho();

    alert('Compra finalizada com sucesso!');
}

// Inicializa a loja
mostrarProdutos();