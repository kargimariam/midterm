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

    // Retrieve the cart from sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const cartElements = document.getElementById("cart-elements");

    // Iterate over each item in the cart
    cart.forEach(cartItem => {
      const productId = cartItem.productid;
      const quantity = cartItem.quantity;

      // Find the product in the data
      const product = data.products.find(x => x.id === productId);

      if (product) {
        // Create elements for the product in the cart
        for (let i = 0; i < quantity; i++) {
          const ellWrapper = document.createElement("div");
          ellWrapper.classList.add("el-wrapper");

          const element = document.createElement("div");
          element.classList.add("element");

          const elImage = document.createElement("img");
          elImage.classList.add("el-img");
          elImage.setAttribute("src", product.thumbnail);

          const elBody = document.createElement("div");
          elBody.classList.add("el-body");

          const elName = document.createElement("h3");
          elName.classList.add("el-name");
          elName.textContent = product.title;

          const elPrice = document.createElement("h4");
          elPrice.classList.add("el-price");
          elPrice.textContent = `$ ${product.price}`;

          elBody.appendChild(elName);
          elBody.appendChild(elPrice);

          const delAdd = document.createElement("div");
          delAdd.classList.add("del-add");

          const binImg = document.createElement("img");
          binImg.classList.add("bin-img");
          binImg.setAttribute("src", "./Logos/bin.svg");

          binImg.addEventListener('click', (event) => {
            // Remove the product from the cart
            const updatedCart = cart.filter(item => item.productid !== productId);
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            // Remove the element from the DOM
            event.target.closest('.el-wrapper').remove();
          });

        const minusPlus = document.createElement("div");
        minusPlus.classList.add("minus-plus"); 
        
        const justImage = document.createElement("img"); 
        justImage.setAttribute("src","./Logos/minussign.svg" ); 
        
        const justP = document.createElement("p"); 
        justP.textContent = "1"; 
        
        const justImage1 = document.createElement("img"); 
        justImage1.setAttribute("src","./Logos/plussign.svg" ); 
        
        
        minusPlus.appendChild(justImage); 
        minusPlus.appendChild(justP); 
        minusPlus.appendChild(justImage1); 
        
        delAdd.appendChild(binImg); 
        delAdd.appendChild(minusPlus); 
        
        
        element.appendChild(elImage); 
        element.appendChild(elBody); 
        element.appendChild(delAdd); 
        
        ellWrapper.appendChild(element); 
        cartElements.appendChild(ellWrapper);
        }
      }
    });

    const toCheckout = document.getElementById("toCheckout");
    toCheckout.addEventListener('click', () => {
      sessionStorage.removeItem('cart');
      cartElements.innerHTML = "";
      window.location.href = "checkout.html";
    });

  })
  .catch(error => {
    console.error('Custom error message:', error);
  });
