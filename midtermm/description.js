const apiUrl = 'https://dummyjson.com/products?limit=100&skip=0';

fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {
    // Handle the data from the response
    console.log(data);
    showDetail(data); // Pass the data object to the showDetail function
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Custom error message:', error);
  });
  let carts = [];
function addToCart(productid) {
  let positionThisProductInCart = carts.findIndex(value => value.productid == productid);
  if (carts.length <= 0) {
    carts = [{
      productid: productid,
      quantity: 1
    }];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      productid: productid,
      quantity: 1
    });
  } else {
    carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
  }
  console.log(carts)
  
  // Store the updated cart in sessionStorage
  sessionStorage.setItem('cart', JSON.stringify(carts));
}

function showDetail(data) {
  let productid = new URLSearchParams(window.location.search).get('id');

  let thisProduct = data.products.filter(x => x.id == productid);

  if (!thisProduct.length) {
    window.location.href = "./index.html";
    return;
  }

  const descriptionBox = document.getElementById("description_box");

  const productsImage = document.createElement("img");
  productsImage.classList.add("products_image");
  productsImage.setAttribute("src", thisProduct[0].thumbnail);

  const textBox = document.createElement("div");
  textBox.classList.add("text_box");

  const productsTitle = document.createElement("h1");
  productsTitle.classList.add("products_title");
  productsTitle.textContent = thisProduct[0].title;
  textBox.appendChild(productsTitle);

  const brand = document.createElement("h4");
  brand.classList.add("brand");
  brand.textContent = `brand : ${thisProduct[0].brand}`;
  textBox.appendChild(brand);

  const ratingBox = document.createElement("div");
  ratingBox.classList.add("rating-box");

  const fivestar = document.createElement("img");
  fivestar.classList.add("fivestar");
  fivestar.setAttribute("src", "./Logos/5-star-icon.svg");
  ratingBox.appendChild(fivestar);

  const productStars = document.createElement("p");
  productStars.classList.add("product-stars");
  productStars.textContent = `${thisProduct[0].rating}/5`;
  ratingBox.appendChild(productStars);
  textBox.appendChild(ratingBox);

  const productsPrice = document.createElement("h4");
  productsPrice.classList.add("products_price");
  productsPrice.textContent = `$ ${thisProduct[0].price}`;
  textBox.appendChild(productsPrice);

  const d = document.createElement("h4");
  d.classList.add("d");
  d.textContent = "Description:";
  textBox.appendChild(d);

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = thisProduct[0].description;
  textBox.appendChild(description);

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("addToCart");
  addToCartButton.textContent = "Add to Cart";

  addToCartButton.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addToCart")) {
      addToCart(thisProduct[0].id);
    }
  });

  textBox.appendChild(addToCartButton);
  descriptionBox.appendChild(productsImage);
  descriptionBox.appendChild(textBox);
}
