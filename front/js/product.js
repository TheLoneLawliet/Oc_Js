
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//console.log(urlParams.get("id"));

//let loaded = false;

const productId = fetch(
	`http://localhost:3000/api/products/${urlParams.get("id")}`
)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.catch(function (err) {
		console.error(err);
	});

productId.then(function (result) {
	let prodId = document.getElementsByClassName("item");
	prodId[0].innerHTML = productDisplay(result);
});

function productDisplay(product) {
	let colors = "";
	for (let i = 0; i < product.colors.length; i++) {
		colors += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
	}

	let display = `
		<article>
            <div class="item__img">
              	<img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>Prix : <span id="price">${product.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${product.description}</p>
              </div>

              <form id="order-form">
                <div class="item__content__settings">
                  <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors" required="required">
                        <option value="">--SVP, choisissez une couleur --</option>
					    ${colors}
                    </select>
                  </div>

                  <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity" required>
                  </div>
                </div>

                <div class="item__content__addButton">
                  <button type="submit" id="addToCart">Ajouter au panier</button>
                </div>
              </form>
            </div>
          </article>
		`;
	return display;
}

productId.then(function(result){

  //console.log("everythig loaded ");
  //loaded = true;

  const orderForm = document.getElementById("order-form")
  orderForm.addEventListener("submit", function(evt){
    evt.preventDefault();
      cartSave(result)
  })

});



function orderId(){
  let ls = JSON.parse(localStorage.getItem("cart"));
  if (ls && (ls.length > 0)){
    return (ls.length)
  }else{
    return 0;
  }
}

function cartSave(result){
  
  const getQuantity = document.getElementById("quantity")
  const getColor = document.getElementById("colors");

  let itemInfo = {
    orId: orderId(),
    id: result._id,
    color: getColor.value,
    quantity: getQuantity.value
  }
  saveToLocal("cart", itemInfo)

};



function saveToLocal(item, valToAdd){
  let orderArr = []  
  let ls = JSON.parse(localStorage.getItem(item))

  console.log(ls)

  if(ls){
    //console.log("got stuff from ls")
    orderArr = ls;
    orderArr.push(valToAdd);
    localStorage.setItem(item, JSON.stringify(orderArr));

  }else{
    //console.log("ls was emp now adding")
    orderArr.push(valToAdd)
    localStorage.setItem(item, JSON.stringify(orderArr));
  }

  //console.log( JSON.parse(localStorage.getItem(item)) )
}