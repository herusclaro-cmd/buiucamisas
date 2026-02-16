const products = [
  {
    id: 1,
    name: "Camisa Teste R$3",
    price: 3.00,
    image: "https://via.placeholder.com/500x500?text=R$3"
  },
  {
    id: 2,
    name: "Camisa Teste R$5",
    price: 5.00,
    image: "https://via.placeholder.com/500x500?text=R$5"
  },
  {
    id: 3,
    name: "Camisa Teste R$10",
    price: 10.00,
    image: "https://via.placeholder.com/500x500?text=R$10"
  },
  {
    id: 4,
    name: "Kit Treino R$5",
    price: 5.00,
    image: "https://via.placeholder.com/500x500?text=Kit+5"
  },
  {
    id: 5,
    name: "Camisa Promo R$3",
    price: 3.00,
    image: "https://via.placeholder.com/500x500?text=Promo+3"
  },
  {
    id: 6,
    name: "Camisa Especial R$10",
    price: 10.00,
    image: "https://via.placeholder.com/500x500?text=Especial+10"
  }
];

const grid = document.getElementById("productsGrid");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" loading="lazy" width="500" height="500">
    <div class="product-title">${product.name}</div>
    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
    <button class="product-btn" onclick="buyNow(${product.id})">
      Comprar agora
    </button>
  `;

  grid.appendChild(card);
});

function buyNow(id) {
  const product = products.find(p => p.id === id);

  localStorage.setItem("checkoutProduct", JSON.stringify({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1
  }));

  window.location.href = "checkout.html";
}
