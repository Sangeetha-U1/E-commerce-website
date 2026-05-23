document.addEventListener("DOMContentLoaded", function () {

  let searchInput = document.getElementById("searchInput");
  let categoryFilter = document.getElementById("categoryFilter");
  let items = document.querySelectorAll(".product-item");

  function filterProducts() {
    let searchValue = searchInput.value.toLowerCase();
    let categoryValue = categoryFilter.value;

    items.forEach(item => {
      let text = item.textContent.toLowerCase();
      let categoryMatch = categoryValue === "all" || item.classList.contains(categoryValue);
      let searchMatch = text.includes(searchValue);

      if (categoryMatch && searchMatch) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

});