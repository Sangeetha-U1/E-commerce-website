// =====================
// CART SYSTEM
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart (event delegation)
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  cart.push({
    name: btn.dataset.name,
    price: Number(btn.dataset.price)
  });

  updateCart();
});

// Update cart UI + storage
function updateCart() {
  const cartList = document.getElementById("cart-items");
  if (!cartList) return;

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small>$${item.price}</small>
        </div>

        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
          Remove
        </button>
      </li>
    `;
  });

  cartList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
      <strong>Total</strong>
      <strong>$${total}</strong>
    </li>
  `;

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.innerText = `(${cart.length})`;

  localStorage.setItem("cart", JSON.stringify(cart));

  attachRemoveEvents();
}

// Remove item from cart
function attachRemoveEvents() {
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Checkout
document.addEventListener("click", function (e) {
  if (e.target.id === "checkoutBtn") {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    alert("Order placed successfully!");
    cart = [];
    updateCart();
  }
});

// =====================
// WISHLIST SYSTEM
// =====================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Add to wishlist (event delegation)
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-wishlist");
  if (!btn) return;

  const item = {
    name: btn.dataset.name,
    price: Number(btn.dataset.price)
  };

  const exists = wishlist.some(w => w.name === item.name);

  if (!exists) {
    wishlist.push(item);
    updateWishlist();

    // ❤️ turn red
    btn.classList.add("text-danger");
  } else {
    alert("Already in wishlist ❤️");
  }
});

// Update wishlist UI
function updateWishlist() {
  const wishlistList = document.getElementById("wishlist-items");
  if (!wishlistList) return;

  wishlistList.innerHTML = "";

  wishlist.forEach((item, index) => {
    wishlistList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small>$${item.price}</small>
        </div>

        <button class="btn btn-sm btn-danger remove-wishlist" data-index="${index}">
          Remove
        </button>
      </li>
    `;
  });

  const wishlistCount = document.querySelector(".wishlist-count");
  if (wishlistCount) wishlistCount.innerText = `(${wishlist.length})`;

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  attachWishlistRemove();
}

// Remove wishlist item
function attachWishlistRemove() {
  document.querySelectorAll(".remove-wishlist").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      wishlist.splice(index, 1);
      updateWishlist();
    });
  });
}

// =====================
// INIT
// =====================
updateCart();
updateWishlist();
document.querySelectorAll(".add-to-wishlist").forEach(btn => {
  const name = btn.dataset.name;

  const exists = wishlist.some(w => w.name === name);

  if (exists) {
    btn.classList.add("text-danger");
  } else {
    btn.classList.remove("text-danger");
  }
});
// =====================
// SEARCH + FILTER
// =====================
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function filterProducts() {
  const search = searchInput?.value.toLowerCase() || "";
  const category = categoryFilter?.value || "all";

  // ALL sections
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    const sectionId = section.id; // men, women, kids

    // category filter
    const matchCategory = category === "all" || sectionId === category;

    // search inside section
    const text = section.innerText.toLowerCase();
    const matchSearch = text.includes(search);

    section.style.display = (matchCategory && matchSearch) ? "block" : "none";
  });
}

if (searchInput) searchInput.addEventListener("input", filterProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);

// =====================
// FORM VALIDATION
// =====================
const form = document.querySelector(".needs-validation");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const modal = document.getElementById("successModal");
    if (modal && window.bootstrap) {
      new bootstrap.Modal(modal).show();
    }

    form.reset();
    form.classList.remove("was-validated");
  });
}