document.addEventListener("DOMContentLoaded", () => {
  const menButton = document.getElementById("menBtn");
  const womenButton = document.getElementById("womenBtn");
  const kidsButton = document.getElementById("kidsBtn");

  const buttons = [menButton, womenButton, kidsButton];

  function changeBackground(element) {
    // Reset background color for all items and set text color to black
    buttons.forEach((button) => {
      button.style.backgroundColor = "#f2f2f2";
      button.style.color = "black";
    });

    // Set background color to black for the clicked item and white text color
    element.style.backgroundColor = "black";
    element.style.color = "white";
  }

  function fetchAndDisplayProducts(categoryName) {
    // Fetch and display products based on category
    const apiUrl =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Clear previous products

        data.categories.forEach((category) => {
          if (category.category_name === categoryName) {
            category.category_products.forEach((product) => {
              const discount = Math.round(
                ((product.compare_at_price - product.price) /
                  product.compare_at_price) *
                  100
              );
              const productDiv = document.createElement("div");
              productDiv.className = "frame-parent";

              productDiv.innerHTML = `
                                <div class="product-image-parent">
                                    <img class="product-image-icon" loading="lazy" alt="" src="${product.image}" />
                                    <div class="badgeText-wrapper">
                                        <div class="badgeText">${product.badge_text}</div>
                                    </div>
                                </div>
                                <div class="product-title-parent">
                                    <div class="product-title">${product.title}</div>
                                    <div class="frame-item">. </div>
                                    <div class="vendor">${product.vendor}</div>
                                </div>
                                <div class="amount">
                                    <div class="price">Rs ${product.price}</div>
                                    <div class="offer">Rs ${product.compare_at_price}</div>
                                    <div class="off">${discount}% Off</div>
                                </div>
                                <div class="cart-icon-parent">
                                    <div class="add-to-cart">Add to Cart</div>
                                </div>
                            `;

              // Add click event listener to the "Add to Cart" button
              productDiv
                .querySelector(".add-to-cart")
                .addEventListener("click", () => {
                  alert(`Added ${product.title} to cart!`);
                });

              productContainer.appendChild(productDiv);
            });
          }
        });
      })
      .catch((error) =>
        console.error("Error fetching the product data:", error)
      );
  }

  menButton.addEventListener("click", () => {
    changeBackground(menButton);
    fetchAndDisplayProducts("Men");
  });

  womenButton.addEventListener("click", () => {
    changeBackground(womenButton);
    fetchAndDisplayProducts("Women");
  });

  kidsButton.addEventListener("click", () => {
    changeBackground(kidsButton);
    fetchAndDisplayProducts("Kids");
  });

  // Select the initial item and load its products
  changeBackground(menButton);
  fetchAndDisplayProducts("Men");
});
