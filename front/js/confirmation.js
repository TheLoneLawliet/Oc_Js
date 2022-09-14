const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//console.log(urlParams.get("firstName"));

function cartIds(){
	const ls = JSON.parse(localStorage.getItem("cart"));
	let ids = [];
	for(let i = 0; i < ls.length; i++){
		ids.push(ls[i].id)
	}
	return ids;
	
}

let orderInfo = {
	"contact": {
	  "firstName": urlParams.get("firstName"),
	  "lastName": urlParams.get("lastName"),
	  "address": urlParams.get("address"),
	  "city": urlParams.get("city"),
	  "email": urlParams.get("email")
	},
	"products": cartIds() 
}

let getOrderId = async ()=>{
	let response = await fetch("http://localhost:3000/api/products/order",{
		method: 'POST',
		headers: {
			'Accept': 'Application/json',
			'Content-Type': 'Application/json'
		},
		body: JSON.stringify(orderInfo)
	})
	//console.log(response.json())	
	return response.json();
}


let displayOrderId = async ()=>{
	let ordId = await getOrderId();
	
	let orderIdElem = document.getElementById("orderId");
	orderIdElem.innerText = ordId.orderId;
	//console.log(ordId.orderId);
}

displayOrderId();