const products = fetch("http://localhost:3000/api/products")
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.catch(function (error) {
		console.log(error);
	});

products.then(function (result) {
	const items = document.getElementById("items");
	for (let i = 0; i < result.length; i++) {
		items.innerHTML += productDisplay(result[i]);
	}
});

function productDisplay(product) {
	let display = `
	<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a> 
	`;
	return display;
}


