
var price
var total

var quantity
var total
var selectedSize
var selectedCrust
var selectedSauce
var selectedCheese
var selectedMeats = []
var selectedVeggies = []
var listSelectedMeats = ''
var listSelectedVeggies = ''

function getTotal(basePrice) {
	$("#msg").html("")
	text1 = "";
	text2 = "";
	
	total = basePrice;
	var sizeTotal = basePrice;

	var sizeArray = document.getElementsByClassName("size");
	for (var i = 0; i < sizeArray.length; i++) {
		if (sizeArray[i].checked) {
			selectedSize = sizeArray[i].value;
			text1 = text1+selectedSize+"<br>";
		}
	}
	// if (selectedSize === "Small") {
	// 	sizeTotal = 8;
	// 	text2 = text2+sizeTotal+"<br>";
	// } else if (selectedSize === "Medium") {
	if (selectedSize === "Medium +$4.00") {
		sizeTotal += 4;
	} else if (selectedSize === "Large +$8.00") {
		sizeTotal += 8;
	} else if (selectedSize === "Extra Large +$12.00") {
		sizeTotal += 12;
	}
	total = sizeTotal
	sizeTotal = sizeTotal.toFixed(2);
	text2 = text2 + sizeTotal+"<br>";
// countTotal = sizeTotal;
	// count++;
	// text3 += count;
	getCrust(text1,text2);
};

function getCrust(text1,text2) {
	var crustTotal = 0;
	var crustArray = document.getElementsByClassName("crust");
	for (var j = 0; j < crustArray.length; j++) {
		if (crustArray[j].checked) {
			selectedCrust = crustArray[j].value;
			text1 = text1 + selectedCrust + "<br>";
		}
        if (selectedCrust === "Regular") {
			crustTotal = 0;
		} else if (selectedCrust === "Thin +$1.00") {
			crustTotal = 1;
		} else if (selectedCrust === "Spicy +$2.00") {
			crustTotal = 2;
		} else {
            crustTotal = 3;
        }
        
	}
	total = (total + crustTotal);
	text2 = text2 + '$' + crustTotal + ".00<br>";
	getSauce(text1,text2);
};

function getSauce(text1,text2) {
	var sauceArray = document.getElementsByClassName("sauce");
	for (var j = 0; j < sauceArray.length; j++) {
		if (sauceArray[j].checked) {
			selectedSauce = sauceArray[j].value;
			text1 = text1 + selectedSauce + "<br>";
		}
	}
	text2 = text2 + '$0' + ".00<br>";
	getCheese(text1,text2);
};

function getCheese(text1,text2) {
	var cheeseTotal = 0;
	var cheeseArray = document.getElementsByClassName("cheese");
	for (var j = 0; j < cheeseArray.length; j++) {
		if (cheeseArray[j].checked) {
			selectedCheese = cheeseArray[j].value;
			text1 = text1 + selectedCheese + "<br>";
		}
		if (selectedCheese === "Extra Chesse +$3.00") {
			cheeseTotal = 3;
		}
	}
	total = (total + cheeseTotal);
	text2 = text2 + '$' + cheeseTotal + ".00<br>";
	getMeat(text1,text2);
};

function getMeat(text1,text2) {
	listSelectedMeats = ''
	selectedMeats = []
	var meatTotal = 0;
	var meatArray = document.getElementsByClassName("meat");
	for (var j = 0; j < meatArray.length; j++) {
		if (meatArray[j].checked) {
			selectedMeats.push(meatArray[j].value);
			if (listSelectedMeats === '') {
				listSelectedMeats += meatArray[j].value
			} else {
				listSelectedMeats += ',' + meatArray[j].value
			}
		}
	}
	var meatCount = selectedMeats.length;
	if (meatCount > 1) {
		meatTotal = (meatCount - 1);
	} else {
		meatTotal = 0;
	}
	total = (total + meatTotal);
	for (var j = 0; j < selectedMeats.length; j++) {
		text1 = text1+selectedMeats[j]+"<br>";
		if (meatCount <= 1) {
				text2 = text2 + '$0.00' + "<br>";
				meatCount = meatCount - 1;
			} else if (meatCount == 2) {
				text2 = text2 + '$1.00' + "<br>";
				meatCount = meatCount - 1;
			} else {
				text2 = text2 + '$1.00' + "<br>";
				meatCount = meatCount - 1;
			}
	}
	getVeggie(text1,text2);
};

function getVeggie(text1,text2) {
	listSelectedVeggies = ''
	selectedVeggies = []
	var veggieTotal = 0;
	var veggieArray = document.getElementsByClassName("veggies")
	for (var j = 0; j < veggieArray.length; j++) {
		if (veggieArray[j].checked) {
			selectedVeggies.push(veggieArray[j].value);
			if (listSelectedVeggies === '') {
				listSelectedVeggies += veggieArray[j].value
			} else {
				listSelectedVeggies += ',' + veggieArray[j].value
			}
		}
	}
	var veggieCount = selectedVeggies.length;
	if (veggieCount > 1) {
		veggieTotal = (veggieCount - 1);
	} else {
		veggieTotal = 0;
	}
	total = (total + veggieTotal);
	price = total
	quantity = parseInteger($("#quantity").val())
	// $("#quantity").val(quantity)
	total *= quantity
	for (var j = 0; j < selectedVeggies.length; j++) {
		text1 = text1+selectedVeggies[j]+"<br>";
		if (veggieCount <= 1) {
			text2 = text2 + '$0.00' + "<br>";
			veggieCount = veggieCount - 1;
		} else if (veggieCount == 2) {
			text2 = text2 + '$1.00' + "<br>";
			veggieCount = veggieCount - 1;
		} else {
			text2 = text2 + '$1.00' + "<br>";
			veggieCount = veggieCount - 1;
		}
	}

	$('.empty-text').css('display', 'none');
	$('.cart-detail').css('display', 'block');
	// document.getElementById("cart").style.opacity=1;
	document.getElementById("showText1").innerHTML=text1;
	document.getElementById("showText2").innerHTML=text2;
	document.getElementById("totalPrice2").innerHTML = "</h3>$" + total.toFixed(2) + "</h3>";
};

function clearAll() {
	document.getElementById("form").reset();
	// document.getElementById("cart").style.opacity=0;
};

function addProductToCart() {

	if (checkAuthCookie()) {
		addToDB()
	} else {
		addToStorage()
	}
	// collectInfo()
}

async function addToDB() {

	let response = await fetch("/orders",  {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			"productid": productID
			, "size": selectedSize
			, "crust": selectedCrust
			, "sauce": selectedSauce
			, "cheese": selectedCheese
			, "meats": listSelectedMeats
			, "veggies": listSelectedVeggies
			, "quantity": quantity
			, "price": price
			, "favorite": false
		})
	})
	if (response.ok) { // if HTTP-status is 200-299
		// get the response body (the method explained below)
		let json = await response.json()

		if (json.success) {
			$("#msg").html("Added to cart!")
			countItemsInCart()
		}
	} else {
		failResponse(response)
	}
}

function addToStorage() {
	var jsonData = {}
	jsonData['productid'] = productID
	jsonData['size'] = selectedSize
	jsonData['crust'] = selectedCrust
	jsonData['sauce'] = selectedSauce
	jsonData['cheese'] = selectedCheese
	jsonData['meats'] = listSelectedMeats
	jsonData['veggies'] = listSelectedVeggies
	jsonData['quantity'] = quantity
	jsonData['price'] = price
	jsonData['favorite'] = false

	jsonData['imagepath'] = imagePath
	jsonData['name'] = productName

	var count = 0
	if (typeof(Storage) !== "undefined") {
		var listOrders = sessionStorage.getItem("order_list")
		if (listOrders !== null && listOrders.length > 0) {
			listOrders = JSON.parse(listOrders);
		}

		if (listOrders === null || listOrders.length === 0) {
			var jsonOrderList = {}
			var orderList = []
			count++
			jsonData['orderid'] = count
			orderList.push(jsonData)
			jsonOrderList['count'] = count
			jsonOrderList['order_list'] = orderList
			var result = JSON.stringify(jsonOrderList)
			sessionStorage.setItem("order_list", result)
		} else {
			if (listOrders.hasOwnProperty('order_list') && listOrders.hasOwnProperty('count')) {
				count = listOrders['count'] + 1
				jsonData['orderid'] = count
				listOrders['count'] = count
				listOrders['order_list'].push(jsonData)
				var result = JSON.stringify(listOrders)
				sessionStorage.setItem("order_list", result)
			} else {
				var jsonOrderList = {}
				var orderList = []
				count++
				jsonData['orderid'] = count
				orderList.push(jsonData)
				jsonOrderList['count'] = count
				jsonOrderList['order_list'] = orderList
				var result = JSON.stringify(jsonOrderList)
				sessionStorage.setItem("order_list", result)
			}
		}
		$("#msg").html("Added to cart!")
		countItemsInCart()
	}
}

// function collectInfo() {
// 	quantity = parseInteger($("#quantity").val())
// 	total = quantity * price

// 	var sizeArray = document.getElementsByClassName("size");
// 	for (var i = 0; i < sizeArray.length; i++) {
// 		if (sizeArray[i].checked) {
// 			selectedSize = sizeArray[i].value;
// 			break
// 		}
// 	}
// 	var crustArray = document.getElementsByClassName("crust");
// 	for (var j = 0; j < crustArray.length; j++) {
// 		if (crustArray[j].checked) {
// 			selectedCrust = crustArray[j].value;
// 			break
// 		}
// 	}
// 	var sauceArray = document.getElementsByClassName("sauce");
// 	for (var j = 0; j < sauceArray.length; j++) {
// 		if (sauceArray[j].checked) {
// 			selectedSauce = sauceArray[j].value;
// 			break
// 		}
// 	}
// 	var cheeseArray = document.getElementsByClassName("cheese");
// 	for (var j = 0; j < cheeseArray.length; j++) {
// 		if (cheeseArray[j].checked) {
// 			selectedCheese = cheeseArray[j].value;
// 			break
// 		}
// 	}
// 	var meatArray = document.getElementsByClassName("meat");
// 	for (var j = 0; j < meatArray.length; j++) {
// 		if (meatArray[j].checked) {
// 			selectedMeats.push(meatArray[j].value);
// 		}
// 	}
// 	var veggieArray = document.getElementsByClassName("veggies")
// 	for (var j = 0; j < veggieArray.length; j++) {
// 		if (veggieArray[j].checked) {
// 			selectedVeggies.push(veggieArray[j].value);
// 		}
// 	}
// }

// function addToCart() {

// 	// collectInfo()

// 	var jsonData = {}
// 	jsonData['id'] = productID
// 	// jsonData['name'] = itemName
// 	// jsonData['image'] = itemImage
// 	// jsonData['description'] = itemDes
// 	jsonData['price'] = price
// 	// quantity = parseInteger($("#quantity").val())
// 	// $("#quantity").val(quantity)
// 	jsonData['quantity'] = quantity
// 	// total = quantity * price
// 	jsonData['total'] = total

// 	// var sizeArray = document.getElementsByClassName("size");
// 	// for (var i = 0; i < sizeArray.length; i++) {
// 	// 	if (sizeArray[i].checked) {
// 	// 		selectedSize = sizeArray[i].value;
// 	// // 		jsonData['size'] = selectedSize;
// 	// // 		break
// 	// // 	}
// 	// // }
// 	// var crustArray = document.getElementsByClassName("crust");
// 	// for (var j = 0; j < crustArray.length; j++) {
// 	// 	if (crustArray[j].checked) {
// 	// 		selectedCrust = crustArray[j].value;
// 			jsonData['crust'] = selectedCrust;
// 	// 		break
// 	// 	}
// 	// }
// 	// var sauceArray = document.getElementsByClassName("sauce");
// 	// for (var j = 0; j < sauceArray.length; j++) {
// 	// 	if (sauceArray[j].checked) {
// 	// 		selectedSauce = sauceArray[j].value;
// 			jsonData['sauce'] = selectedSauce;
// 	// 		break
// 	// 	}
// 	// }
// 	// var cheeseArray = document.getElementsByClassName("cheese");
// 	// for (var j = 0; j < cheeseArray.length; j++) {
// 	// 	if (cheeseArray[j].checked) {
// 	// 		selectedCheese = cheeseArray[j].value;
// 			jsonData['cheese'] = selectedCheese;
// 	// 		break
// 	// 	}
// 	// }
// 	// var meatArray = document.getElementsByClassName("meat");
// 	// for (var j = 0; j < meatArray.length; j++) {
// 	// 	if (meatArray[j].checked) {
// 	// 		selectedMeats.push(meatArray[j].value);
// 	// 	}
// 	// }
// 	jsonData['meat'] = selectedMeats;
// 	// var veggieArray = document.getElementsByClassName("veggies")
// 	// for (var j = 0; j < veggieArray.length; j++) {
// 	// 	if (veggieArray[j].checked) {
// 	// 		selectedVeggies.push(veggieArray[j].value);
// 	// 	}
// 	// }
// 	jsonData['vegie'] = selectedVeggies;

// 	console.log(jsonData);

// 	if (typeof(Storage) !== "undefined") {
// 		var listOrders = sessionStorage.getItem("order_list")
// 		if (listOrders !== null && listOrders.length > 0) {
// 			listOrders = JSON.parse(listOrders);
// 		}

// 		if (listOrders === null || listOrders.length === 0) {
// 			var jsonOrderList = {}
// 			var jsonOrder = []
// 			jsonOrder.push(jsonData)
// 			jsonOrderList['order_list'] = jsonOrder
// 			var result = JSON.stringify(jsonOrderList)
// 			sessionStorage.setItem("order_list", result)
// 		} else {
// 			if (listOrders.hasOwnProperty('order_list')) {
// 				listOrders['order_list'].push(jsonData)
// 				var result = JSON.stringify(listOrders)
// 				sessionStorage.setItem("order_list", result)
// 			} else {
// 				var jsonOrderList = {}
// 				var jsonOrder = []
// 				jsonOrder.push(jsonData)
// 				jsonOrderList['order_list'] = jsonOrder
// 				var result = JSON.stringify(jsonOrderList)
// 				sessionStorage.setItem("order_list", result)
// 			}
// 		}
// 		$("#msg").html("Added to cart!")
// 	}

// 	// renderCart();
// };

// function loadCart() {
// 	const _data = sessionStorage.getItem('order_list');
// 	let _orderList = _data && _data.length > 0 ? JSON.parse(_data)['order_list'] : [];
// 	console.log(_orderList);
// 	return _orderList;
// }

// function renderCart() {
// 	console.log('renderCart')
// 	const orderList = loadCart();

// 	if(orderList && orderList.length > 0) {
// 		// Hide empty text of cart
// 		$('.empty-text').css('display', 'none');

// 		// let orderListHtml = [];

// 		// orderList.forEach((item, index) => {
// 		// 	orderListHtml.push(`<li> ${index + 1}. ${item['name'] ? item['name'] : 'Khong ten'} - price: ${item.total ? item.total : 0} </liv>`);
// 		// });


// 		// $('#cartItem').html(orderListHtml);
// 		$('.cart-detail').css('display', 'block');

// 	} else {
// 		// Show empty text of cart
// 		$('.empty-text').css('display', 'block');
// 		$('.cart-detail').css('display', 'none');
// 		$('#cartItem').html('');
// 	}

// }

// function emptyCart() {
// 	sessionStorage.removeItem('order_list');
// 	renderCart();
// }
