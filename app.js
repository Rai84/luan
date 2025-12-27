let carrinho = [];

/* Navegação */
function irParaSegundaTela() {
  window.location.href = "pedido.html";
}

function irParaCardapio() {
  window.location.href = "cardapio.html";
}

/* Carrinho */
function adicionarAoCarrinho(nome, preco) {
  const item = carrinho.find((p) => p.nome === nome);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
}

function alterarQuantidade(nome, delta) {
  const item = carrinho.find((p) => p.nome === nome);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter((p) => p.nome !== nome);
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";
  let subtotal = 0;

  carrinho.forEach((item) => {
    subtotal += item.preco * item.quantidade;

    lista.innerHTML += `
      <li class="item-carrinho">
        <span>${item.nome}</span>
        <div>
          <button onclick="alterarQuantidade('${item.nome}', -1)">-</button>
          <span>${item.quantidade}</span>
          <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
        </div>
      </li>
    `;
  });

  subtotalEl.textContent = subtotal.toFixed(2);
  totalEl.textContent = subtotal.toFixed(2);
}
