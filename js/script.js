let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save + update UI
function updateCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += parseFloat(item.price);

    cartList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">${item.name}</h6>
        </div>
        <span class="text-body-secondary">$${item.price}</span>
      </li>
    `;
  });

  cartList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
      <span>Total</span>
      <strong>$${total}</strong>
    </li>
  `;

  document.querySelector(".cart-count").innerText = `(${cart.length})`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    cart.push({
      name: this.dataset.name,
      price: this.dataset.price
    });

    updateCart();
  });
});

// init load
updateCart();
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    const cat = product.dataset.category;

    const matchSearch = name.includes(search);
    const matchCategory = category === "all" || cat === category;

    product.style.display = (matchSearch && matchCategory) ? "block" : "none";
  });
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);