function toggleMenu() {
  const menu = document.getElementById("menu");
  const isExpanded = menu.classList.toggle("open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", isExpanded);
}


// Placeholder function for filtering products
function filterProducts() {
  const filterValue = document.getElementById("product-filter").value;
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    if (filterValue === "all" || product.dataset.category === filterValue) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// Placeholder function for searching products
function searchProducts() {
  const searchValue = document.getElementById("product-search").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
