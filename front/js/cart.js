let localStoreCart = []; // gets the cart items saved  in localStore
let cartConent = []; // gets the json data matching the local stored cart

const itemSection = document.getElementById("cart__items");

async function getCart(){
	//console.log("get cart invoked")
	localStoreCart = JSON.parse(localStorage.getItem("cart"));
	for(let i = 0; i< localStoreCart.length; i++){

		const itemInfo = await fetch(`http://localhost:3000/api/products/${localStoreCart[i].id}`
		).then(function(res){
			if(res.ok){
				return res.json();					
			}
		}).catch(function(err){
			console.error("error")
		}).then(function(res){
			cartConent.push(res)
		})
	}
	return true;
}

////

async function drawCart(){

	let done = await getCart();
	
	if(done){
		itemSection.innerHTML = '';
		for(let i = 0; i < localStoreCart.length; i++){
			drawCartItem(cartConent[i], localStoreCart[i])
		}
		//console.log("done drawing cart")
		countPrice(cartConent)
		//return true;
	}	
}

/// Draws HTML




function drawCartItem(cartCont, lsCart){
	let template = `
	<article class="cart__item" data-id="${cartCont._id}" data-color="${lsCart.color}">
                <div class="cart__item__img">
                  <img src="${cartCont.imageUrl}" alt="${cartCont.description}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartCont.name}</h2>
                    <p>${lsCart.color}</p>
                    <p>${cartCont.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${lsCart.quantity}" onchange="countPrice(cartConent)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItemFromCart('${lsCart.orId}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
	`
	itemSection.innerHTML += template
}




////
const quantityElement  = document.getElementById("totalQuantity");
const priceElement = document.getElementById("totalPrice");

const quantityCount = document.getElementsByClassName("itemQuantity");

async function countPrice(result){
	let count = 0;
	let priceCount = 0;

	for(let x = 0; x < quantityCount.length; x++){
		count += parseInt(quantityCount[x].value);
		priceCount += parseInt(quantityCount[x].value) * result[x].price;
		
		//console.log(quantityCount[x].value);
	}
	quantityElement.innerHTML = count;
	priceElement.innerHTML = priceCount;
	
	//console.log(count)
}

///
function deleteItemFromCart(itemId){
	
	
	let index = localStoreCart.findIndex(el =>{
		if(el.orId === itemId) return true;
	})
	localStoreCart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(localStoreCart));
	localStoreCart = [];
	cartConent = [];
	drawCart();

	return true;
	
};

function getForm(){
	let clientInfo = new FormData();
	clientInfo.append("firstName", document.getElementById("firstName").value);
	clientInfo.append("lastName", document.getElementById("lastName").value);
	clientInfo.append("address", document.getElementById("address").value);
	clientInfo.append("city", document.getElementById("city").value);
	clientInfo.append("email", document.getElementById("email").value);
	
	let params = '?'
	for (let [i, x] of clientInfo.entries()) { 
		params += `${i}=${x}&`
	 }
	 window.open("./confirmation.html"+ params);
  	
}

drawCart()