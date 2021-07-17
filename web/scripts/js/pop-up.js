
// When the user clicks on <div>, open the popup
function placeOrder() {

  if ($("#firstname").val() === '') {
    $("#errorMessage").html("*First Name is empty!")
  } else if ($("#firstname").val().length > 30) {
    $("#errorMessage").html("*First Name is invalid!")
  } else if ($("#lastname").val() === '') {
    $("#errorMessage").html("*Last Name is empty!")
  } else if ($("#lastname").val().length > 30) {
    $("#errorMessage").html("*Last Name is invalid!")
  } else if ($("#email").val() === '') {
    $("#errorMessage").html("*Email is empty!")
  } else if (!$("#email").val().includes('@') || !$("#email").val().includes('.')) {
    $("#errorMessage").html("*Email is invalid!")
  } else if ($("#adr").val() === '') {
    $("#errorMessage").html("*Address is empty!")
  } else if ($("#city").val() === '') {
      $("#errorMessage").html("*City is empty!")
  } else if ($("#city").val().length > 50) {
    $("#errorMessage").html("*City is invalid!")
  } else if ($("#state").val() === '') {
    $("#errorMessage").html("*State is empty!")
  } else if ($("#state").val().length !== 2) {
    $("#errorMessage").html("*State is invalid!")
  } else if ($("#zip").val() === '') {
    $("#errorMessage").html("*Zipcode is empty!")
  } else if ($("#zip").val().length != 5) {
    $("#errorMessage").html("*Zipcode is invalid!")
  } else if ($("#cname").val() === '') {
    $("#errorMessage").html("*Name on Card is empty!")
  } else if ($("#ccnum").val() === '') {
    $("#errorMessage").html("*Credit Card Number is empty!")
  } else if ($("#ccnum").val().length !== 16) {
    $("#errorMessage").html("*Credit Card Number is invalid!")
  } else if ($("#expmonth").val() === '') {
    $("#errorMessage").html("*Expiration Month is empty!")
  } else if (isNaN($("#expmonth").val()) || Number($("#expmonth").val()) < 1 || Number($("#expmonth").val()) > 12) {
    $("#errorMessage").html("*Expiration Month is invalid!")
  } else if ($("#expyear").val() === '') {
    $("#errorMessage").html("*Expiration Year is empty!")
  } else if (isNaN($("#expyear").val()) || Number($("#expyear").val()) < 2021) {
    $("#errorMessage").html("*Expiration Year is invalid!")
  } else if ($("#cvv").val() === '') {
    $("#errorMessage").html("*Security Code is empty!")
  } else if (isNaN($("#cvv").val()) || $("#cvv").val().length != 3) {
    $("#errorMessage").html("*Security Code is invalid!")
  } else {
    $("#errorMessage").html("")
    disableElement("#place-order")
    if (checkAuthCookie()) {
      orderSignedIn()
    } else {
      orderGuest()
    }
  }
}

async function orderSignedIn() {
  let response = await fetch("/orders/signedin",  {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "first": $("#firstname").val()
        , "last": $("#lastname").val()
        , "email": $("#email").val()
        , "address": $("#adr").val()
        , "city": $("#city").val()
        , "state": $("#state").val()
        , "zip": $("#zip").val()
        , "nameoncard": $("#cname").val()
        , "cardnumber": $("#ccnum").val().substring(12)
        , "expmonth": $("#expmonth").val()
        , "expyear": $("#expyear").val()
    })
  })
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json()
    console.log(json)

    if (json.success) {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      setTimeout(() => {
        window.location.href = 'history.html'
      }, 1000);
    }
  } else {
		failResponse(response)
    $("#place-order").prop("disabled",false)
  }
}

function orderGuest() {
  if (typeof(Storage) !== "undefined") {
    var listOrders = sessionStorage.getItem("order_list")
    if (listOrders !== null) {
      var listOrders = JSON.parse(listOrders)
      if (listOrders !== null && listOrders.hasOwnProperty('order_list')) {
        listItems = listOrders.order_list
        orderNotSignedIn(listItems)
      }
    }
  }
}

async function orderNotSignedIn(listItems) {
  console.log(listItems)
  let response = await fetch("/ordersguest",  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "first": $("#firstname").val()
        , "last": $("#lastname").val()
        , "email": $("#email").val()
        , "address": $("#adr").val()
        , "city": $("#city").val()
        , "state": $("#state").val()
        , "zip": $("#zip").val()
        , "nameoncard": $("#cname").val()
        , "cardnumber": $("#ccnum").val().substring(12)
        , "expmonth": $("#expmonth").val()
        , "expyear": $("#expyear").val()
        , "orders": listItems
    })
  })
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json()
    console.log(json)

    if (json.success) {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      sessionStorage.removeItem('order_list')
      setTimeout(() => {
        // window.location.href = 'menu.html'
        window.location.href='confirmation.html'
      }, 1000);
    }
  } else {
		failResponse(response)
    $("#place-order").prop("disabled",false)
  }
}
