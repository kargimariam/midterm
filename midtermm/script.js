const apiUrl ='https://dummyjson.com/products?limit=100&skip=0';

fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error('HTTP error! Status: ${response.status}');
    }
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {
   
      console.log(data)
    const productsList = document.getElementById("products-list");
    

    function filterProductsByCategory(products){
        return products.filter(product => (product.category === "mens-shirts" || 
                                          product.category === "tops" ||
                                          product.category === "womens-dresses"||
                                          product.category === "womens-shoes"||
                                          product.category === "mens-shoes"||
                                          product.category === "mens-watches"||
                                          product.category === "womens-watches"||
                                          product.category === "womens-bags"||
                                          product.category === "womens-jewellery"||
                                          product.category === "sunglasses") );
    }
    function topProducts(products){
        return filterProductsByCategory(products).filter(products => (products.rating > 4.9));
    }
    topProducts(data.products).forEach(x => {
        let newanchor = document.createElement("a")
        newanchor.setAttribute("href", './description.html?id=' + x.id)
        newanchor.classList.add("anchor")


        const productsBox = document.createElement("div")
        productsBox.classList.add("products-box")

        const productsImage = document.createElement("img")
        productsImage.classList.add("products-image")
        productsImage.setAttribute("src", x.thumbnail);
        productsBox.appendChild(productsImage)

        const productsTitle = document.createElement("h3")
        productsTitle.classList.add("products-title")
        productsTitle.textContent=x.title
        productsBox.appendChild(productsTitle)

        const ratingBox  = document.createElement("div")
        ratingBox.classList.add("rating-box")

        const fivestar = document.createElement("img")
        fivestar.classList.add("fivestar")
        fivestar.setAttribute("src","./Logos/5-star-icon.svg")
        ratingBox.appendChild(fivestar)

        const productStars = document.createElement("p")
        productStars.classList.add("product-stars")
        productStars.textContent = `${x.rating}/5`
        ratingBox.appendChild(productStars)
        productsBox.appendChild(ratingBox)

        const productsPrice = document.createElement("p")
        productsPrice.classList.add("products-price")
        productsPrice.textContent = `$ ${x.price}`
        productsBox.appendChild(productsPrice)

        

        newanchor.appendChild(productsBox)
        productsList.appendChild(newanchor)

        
    });


  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Custom error message:', error);
  });

