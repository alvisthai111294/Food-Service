/* Set rates + misc */
var taxRate = 0.1;
// var shippingRate = 5.00; 
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text().substring(1));
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  // var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax// + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html('$' + subtotal.toFixed(2));
    $('#cart-tax').html('$' + tax.toFixed(2));
    // $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html('$' + total.toFixed(2));
    if(total == 0){
      $('.check-out-btn').fadeOut(fadeTime);
    }else{
      $('.check-out-btn').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}

async function showCartItemsDB(editable, removable) {
  let response = await fetch("/carts",  {
      method: 'GET'
  })
  if (response.ok) {
    let json = await response.json()

    var items = json.items

    if (items && items.length > 0) {
      $("#msg").html("")
      generateItems(items, editable, removable)
    } else {
      $("#msg").html("*Cart is empty!")
      disableElement("#checkout")
    }

  } else {
      failResponse(response)
  }
}

var listItems = null

function showCartItemsInStorage(editable, removable) {
  if (typeof(Storage) !== "undefined") {
    var listOrders = sessionStorage.getItem("order_list")
    if (listOrders === null) {
        $("#msg").html("*Cart is empty!")
        disableElement("#checkout")
      } else {
      var listOrders = JSON.parse(listOrders)
      if (listOrders === null || !listOrders.hasOwnProperty('order_list')) {
          $("#msg").html("*Cart is empty!")
          disableElement("#checkout")
      } else {
        listItems = listOrders.order_list
        generateItems(listItems, editable, removable)
      }
    }
  }
}

var countItems = 0

function generateItems(items, editable, removable, subname = '', favorite = false) {
  var subTotal = 0
  divListOrders = document.getElementById('table-order-list' + subname)
  countItems = items.length
  for (const item of items) {
    if (subname !== '' && favorite != item.favorite) {
      continue
    }

    var tr = document.createElement('tr')
    tr.setAttribute('id', 'product-' + item.orderid)
    tr.setAttribute('class', 'product')
    divListOrders.appendChild(tr)

    var td = document.createElement('td')
    tr.appendChild(td)

    var divInfo = document.createElement('div')
    divInfo.setAttribute('class', 'cart-info')
    td.appendChild(divInfo)

    var img = document.createElement('img')
    img.setAttribute('src', `${item.imagepath}`)
    img.setAttribute('alt', `${item.productName}`)
    img.setAttribute('width', '800')
    img.setAttribute('height', '200')
    divInfo.appendChild(img)

    var div = document.createElement('div')
    divInfo.appendChild(div)

    if (editable) {
      var inputFavorite = document.createElement('input')
      inputFavorite.setAttribute('type', 'checkbox')
      inputFavorite.setAttribute('id', 'favorite-' + item.orderid)
      inputFavorite.checked = item.favorite
      inputFavorite.addEventListener("click", inputFavoriteClick)
      div.appendChild(inputFavorite)

      var labelFav = document.createElement('label')
      // labelFav.setAttribute('for', 'checkbox')
      labelFav.innerHTML = ' Favorite'
      div.appendChild(labelFav)

      var br = document.createElement('br')
      div.appendChild(br)
    }

    var p = document.createElement('p')
    p.innerHTML = item.name
    div.appendChild(p)

    var p = document.createElement('p')
    p.innerHTML = 'Size: ' + item.size
    div.appendChild(p)

    p = document.createElement('p')
    p.innerHTML = 'Crust: ' + item.crust
    div.appendChild(p)

    p = document.createElement('p')
    p.innerHTML = 'Sauce: ' + item.sauce
    div.appendChild(p)

    p = document.createElement('p')
    p.innerHTML = 'Cheese: ' + item.cheese
    div.appendChild(p)

    if (item.meats.length > 0) {
      p = document.createElement('p')
      p.innerHTML = 'Meat: ' + item.meats
      div.appendChild(p)
    }

    if (item.veggies.length > 0) {
      p = document.createElement('p')
      p.innerHTML = 'Veggies: ' + item.veggies
      div.appendChild(p)
    }

    var small = document.createElement('small')
    small.setAttribute('id', 'price-' + item.orderid)
    var price = item.price
    if (checkAuthCookie()) {
      price = Number(price.replace(/[^0-9.-]+/g,""));
    }
    small.innerHTML = '$' + price.toFixed(2)
    div.appendChild(small)

    var br = document.createElement('br')
    div.appendChild(br)

    if (removable) {
      var button = document.createElement('button')
      button.setAttribute('id', 'remove-' + item.orderid)
      button.setAttribute('class', 'remove-btn')
      button.innerHTML = 'Remove'
      if (subname === '') {
        button.addEventListener('click', removeClick)
      } else {
        button.addEventListener('click', removePreviousOrderClick)
      }
      div.appendChild(button)

      button = document.createElement('button')
      button.setAttribute('id', 'remove-' + item.orderid)
      button.setAttribute('class', 're-order-btn')
      button.setAttribute('onclick', "location.href='order.html?id=" + item.productid + "'")
      if (subname === '') {
        button.innerHTML = 'Edit'
      } else {
        button.innerHTML = 'Order Again'
      }
      div.appendChild(button)
    }

    td = document.createElement('td')
    tr.appendChild(td)
    
    var quantityElement = null
    if (editable) {
      quantityElement = document.createElement('input')
      quantityElement.addEventListener("keyup", inputQuantityChange)
      quantityElement.addEventListener("change", inputQuantityChange)
      quantityElement.setAttribute('id', 'quanity-' + item.orderid)
      quantityElement.setAttribute('type', 'number')
      quantityElement.setAttribute('value', `${item.quantity}`)
      quantityElement.setAttribute('min', "1")
    } else {
      quantityElement = document.createElement('label')
      quantityElement.innerHTML = item.quantity
    }
    td.appendChild(quantityElement)

    td = document.createElement('td')
    td.setAttribute('id', 'total-' + item.orderid)
    td.setAttribute('class', 'product-line-price')
    var total = item.quantity * price
    td.innerHTML = '$' + total.toFixed(2)
    tr.appendChild(td)

    // divTotal = document.createElement('div')
    // divTotal.setAttribute('id', 'total-' + item.orderid)
    // divTotal.setAttribute('class', 'product-line-price')
    // var total = item.quantity * price
    // divTotal.innerHTML = total.toFixed(2)
    // divProduct.appendChild(divTotal)

    // br = document.createElement('br')
    // divListOrders.appendChild(br)

    subTotal += total
  }

  if (subname === '') {
    var tax = subTotal / 10
    tax = Math.round(tax * 100) / 100
  
    var shipping = 0
  
    var grandTotal = subTotal + tax + shipping
  
    div = document.getElementById('cart-subtotal')
    div.innerHTML = '$' + subTotal.toFixed(2)
  
    div = document.getElementById('cart-tax')
    div.innerHTML = '$' + tax
  
    // div = document.getElementById('cart-shipping')
    // div.innerHTML = shipping
  
    div = document.getElementById('cart-total')
    div.innerHTML = '$' + grandTotal.toFixed(2)
  }
}

// function generateItems(items) {
//   var subTotal = 0
//   divListOrders = document.getElementById('list-orders')
//   countItems = items.length
//   for (const item of items) {
//       divProduct = document.createElement('div')
//       divProduct.setAttribute('id', 'product-' + item.orderid)
//       divProduct.setAttribute('class', 'product')
//       divListOrders.appendChild(divProduct)

//       divImage = document.createElement('div')
//       divImage.setAttribute('class', 'product-image')
//       divProduct.appendChild(divImage)

//       img = document.createElement('img')
//       img.setAttribute('src', `${item.imagepath}`)
//       divImage.appendChild(img)

//       inputFavorite = document.createElement('input')
//       inputFavorite.setAttribute('type', 'checkbox')
//       inputFavorite.setAttribute('id', 'favorite-' + item.orderid)
//       inputFavorite.checked = item.favorite
//       inputFavorite.addEventListener("click", inputFavoriteClick)
//       divProduct.appendChild(inputFavorite)

//       labelFav = document.createElement('label')
//       labelFav.innerHTML = ' Favorite'
//       divProduct.appendChild(labelFav)

//       br = document.createElement('br')
//       divProduct.appendChild(br)

//       divDetails = document.createElement('div')
//       divDetails.setAttribute('class', 'product-details')
//       divProduct.appendChild(divDetails)

//       divTitle = document.createElement('div')
//       divTitle.setAttribute('class', 'product-title')
//       divTitle.innerHTML = item.name
//       divDetails.appendChild(divTitle)

//       pDes = document.createElement('p')
//       pDes.setAttribute('class', 'product-description')
//       pDes.innerHTML = item.description
//       divDetails.appendChild(pDes)

//       pPrice = document.createElement('p')
//       pPrice.setAttribute('class', 'product-description-price')
//       pPrice.innerHTML = 'Price'
//       divDetails.appendChild(pPrice)

//       divPrice = document.createElement('div')
//       divPrice.setAttribute('id', 'price-' + item.orderid)
//       divPrice.setAttribute('class', 'product-price')
//       var price = Number(item.price.replace(/[^0-9.-]+/g,""));
//       divPrice.innerHTML = price.toFixed(2)
//       divProduct.appendChild(divPrice)

    
//       divQuantity = document.createElement('div')
//       divQuantity.setAttribute('class', 'product-quantity')
//       divProduct.appendChild(divQuantity)
      
//       inputQuantity = document.createElement('input')
//       inputQuantity.setAttribute('id', 'quanity-' + item.orderid)
//       inputQuantity.setAttribute('type', 'number')
//       inputQuantity.setAttribute('value', `${item.quantity}`)
//       inputQuantity.setAttribute('min', "1")
//       inputQuantity.addEventListener("keyup", inputQuantityChange)
//       inputQuantity.addEventListener("change", inputQuantityChange)
//       divQuantity.appendChild(inputQuantity)

//       divRemoval = document.createElement('div')
//       divRemoval.setAttribute('class', 'product-removal')
//       divProduct.appendChild(divRemoval)

//       button = document.createElement('button')
//       button.setAttribute('id', 'remove-' + item.orderid)
//       button.setAttribute('class', 'remove-product')
//       button.innerHTML = 'Remove'
//       button.addEventListener('click', removeClick)
//       divRemoval.appendChild(button)

//       divTotal = document.createElement('div')
//       divTotal.setAttribute('id', 'total-' + item.orderid)
//       divTotal.setAttribute('class', 'product-line-price')
//       var total = item.quantity * price
//       divTotal.innerHTML = total.toFixed(2)
//       divProduct.appendChild(divTotal)

//       br = document.createElement('br')
//       divListOrders.appendChild(br)

//       subTotal += total
//   }

//   var tax = subTotal / 10
//   tax = Math.round(tax * 100) / 100

//   var shipping = 5

//   var grandTotal = subTotal + tax + shipping

//   div = document.getElementById('cart-subtotal')
//   div.innerHTML = subTotal.toFixed(2)

//   div = document.getElementById('cart-tax')
//   div.innerHTML = tax

//   div = document.getElementById('cart-shipping')
//   div.innerHTML = shipping

//   div = document.getElementById('cart-total')
//   div.innerHTML = grandTotal.toFixed(2)
// }

function inputQuantityChange(event) {
  var source = event.target || event.srcElement;

  if (source) {
    var quantity = source.value
    var orderid = source.getAttribute('id')
    if (quantity > 1) {
    } else {
      source.value = 1
      quantity = 1
    }
    var val = orderid.split("-")
    if (val.length >= 2) {
      orderid = val[1]
      if (checkAuthCookie()) {
        updateQuantity(orderid, quantity)
      } else if (listItems !== null) {
        if (typeof(Storage) !== "undefined") {
          var listOrders = sessionStorage.getItem("order_list")
          if (listOrders !== null) {
            var orderArray = JSON.parse(listOrders)
            if (orderArray !== null && orderArray.hasOwnProperty('order_list')) {
              for (var i = 0; i < orderArray.order_list.length; i++) {
                if (orderArray.order_list[i].orderid == orderid) {
                  orderArray.order_list[i].quantity = quantity
                  var result = JSON.stringify(orderArray)
                  sessionStorage.setItem("order_list", result)
                  updatePage(orderid, quantity)
                  break
                }
              }
            }
          }
        }
      }
    }
  }
}

async function updateQuantity(orderid, quantity) {

	let response = await fetch("/carts/updatequantity",  {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			"orderid": orderid
			, "quantity": quantity
		})
	})
	if (response.ok) { // if HTTP-status is 200-299
		// get the response body (the method explained below)
		let json = await response.json()

		if (json.success) {
      updatePage(orderid, quantity)
      // console.log('updatequantity orderid: ' + orderid + ' , quantity: ' + quantity + ' , price: ' + price + ' , total: ' + total)
		}
	} else {
		failResponse(response)
	}
}

function updatePage(orderid, quantity) {
  var divPrice = document.getElementById('price-' + orderid)
  price = divPrice.innerHTML
  price = price.substring(1)

  var total = price * quantity
  var divTotal = document.getElementById('total-' + orderid)
  divTotal.innerHTML = '$' + total.toFixed(2)
  recalculateCart()
}

function inputFavoriteClick(event) {
  var source = event.target || event.srcElement;

  if (source) {
    var checked = source.checked
    var orderid = source.getAttribute('id')
    var val = orderid.split("-")
    if (val.length >= 2) {
      orderid = val[1]
      if (checkAuthCookie()) {
        updateFavorite(orderid, checked)
      } else if (listItems !== null) {
        if (typeof(Storage) !== "undefined") {
          var listOrders = sessionStorage.getItem("order_list")
          if (listOrders !== null) {
            var orderArray = JSON.parse(listOrders)
            if (orderArray !== null && orderArray.hasOwnProperty('order_list')) {
              for (var i = 0; i < orderArray.order_list.length; i++) {
                if (orderArray.order_list[i].orderid == orderid) {
                  orderArray.order_list[i].favorite = checked
                  var result = JSON.stringify(orderArray)
                  sessionStorage.setItem("order_list", result)
                  break
                }
              }
            }
          }
        }
      }
    }
  }
}

async function updateFavorite(orderid, checked) {

	let response = await fetch("/carts/updatefavorite",  {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			"orderid": orderid
			, "favorite": checked
		})
	})
	if (response.ok) { // if HTTP-status is 200-299
		// get the response body (the method explained below)
		let json = await response.json()

		if (json.success) {
      // console.log('updatefavorite orderid: ' + orderid + ' , checked: ' + checked)
		}
	} else {
		failResponse(response)
	}
}

function removeClick(event) {
  var source = event.target || event.srcElement;

  if (source) {
    var orderid = source.getAttribute('id')
    var val = orderid.split("-")
    if (val.length >= 2) {
      orderid = val[1]
      if (checkAuthCookie()) {
        removeItem(orderid)
      } else if (listItems !== null) {
        if (typeof(Storage) !== "undefined") {
          var listOrders = sessionStorage.getItem("order_list")
          if (listOrders !== null) {
            var orderArray = JSON.parse(listOrders)
            if (orderArray !== null && orderArray.hasOwnProperty('order_list')) {
              for (var i = 0; i < orderArray.order_list.length; i++) {
                if (orderArray.order_list[i].orderid == orderid) {
                  orderArray.order_list.splice(i, 1);
                  var result = JSON.stringify(orderArray)
                  sessionStorage.setItem("order_list", result)
                  removeInPage(orderid)
                  break
                }
              }
            }
          }
        }
      }
    }
  }
}

async function removeItem(orderid) {
  let response = await fetch("/carts",  {
    method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			"orderid": orderid
		})
  })
  if (response.ok) {
    removeInPage(orderid)
  } else {
		failResponse(response)
  }
}

function removeInPage(orderid) {
  countItemsInCart()
  var con = document.getElementById('table-order-list')
  var product = document.getElementById('product-' + orderid)
  con.removeChild(product)
  countItems--
  if (countItems <= 0) {
    $("#msg").html("*Cart is empty!")
    disableElement("#checkout")
  }
  recalculateCart()
}

function removePreviousOrderClick(event) {
  var source = event.target || event.srcElement;

  if (source) {
    var orderid = source.getAttribute('id')
    var val = orderid.split("-")
    if (val.length >= 2) {
      orderid = val[1]
      removeOrder(orderid)
    }
  }
}

async function removeOrder(orderid) {
  let response = await fetch("/orders",  {
    method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			"orderid": orderid
		})
  })
  if (response.ok) {
    let json = await response.json()
    removeOrderInPage(orderid, json.favorite)
  } else {
		failResponse(response)
  }
}

function removeOrderInPage(orderid, favorite) {
  var subname = '-previous'
  if (favorite) {
    subname = '-favorite'
  }
  var con = document.getElementById('table-order-list' + subname)
  var product = document.getElementById('product-' + orderid)
  con.removeChild(product)
}
