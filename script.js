  function filterProducts() {
    const filterValue = document.getElementById("product-filter").value;
    const products = document.querySelectorAll(".product-card");
  
    products.forEach((product) => {
      if (filterValue === "all" || product.getAttribute("data-category") === filterValue) {
        product.style.display = "block"; // Show product
      } else {
        product.style.display = "none"; // Hide product
      }
    });
  }
  

  function searchProducts() {
    const query = document.getElementById("product-search").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
  
    products.forEach((product) => {
      // Combine text content from product title and description
      const productText = product.textContent.toLowerCase();
      if (productText.includes(query)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
  
  function redirectToProductPage(productPageUrl) {
    window.location.href = productPageUrl;
  }
  
  function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'flex') {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'flex';
    }
  }
  
