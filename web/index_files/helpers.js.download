
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function parseInteger(val) {
	var quantity = val
	quantity = Number.parseInt(quantity, 10)
	if (Number.isNaN(quantity)) {
		quantity = 1
	}
    return quantity
}

function checkAuthCookie() {
    var auth = getCookie("authorized")
    var usn = sessionStorage.getItem("usn")
    if (auth !== null && auth === 'true' && usn && usn !== null) {
        return true
    }
    return false
}

function checkAuth() {
    countItemsInCart()

    if (typeof(Storage) !== "undefined") {

        if (checkAuthCookie()) {
            var auth = document.getElementsByClassName('placehd')

            if (auth !== null) {
                var div = document.getElementsByClassName('topnav')

                for (var i = auth.length - 1; i >= 0; i--) {
                    var item = auth[i];
                    div[0].removeChild(item);
                }
    
                var usn = sessionStorage.getItem("usn")
    
                var label = document.createElement('label')
                label.style.color = 'Yellow'
                label.setAttribute('id', 'a1')
                label.innerHTML = "Welcome, " + usn
    
                var a = document.createElement('a')
                a.setAttribute('id', 'a1')
                a.setAttribute('href', 'history.html')
                a.innerHTML = "History"
    
                div[0].appendChild(a)
                div[0].appendChild(label)
    
                a = document.createElement('a')
                a.setAttribute('id', 'a1')
                a.setAttribute('onclick', 'signout()')
                a.innerHTML = "Sign out"
    
                divCart = document.getElementById("a1")
                div[0].insertBefore(a, divCart)
            }

            return true
        }
    }
    return false
}

async function countItemsInCart() {
    var count = 0
    if (checkAuthCookie()) {
        let response = await fetch("/carts/count",  {
            method: 'GET'
        })
        if (response.ok) {
            let json = await response.json()
    
            count = json.count
    
        } else {
            failResponse(response)
        }
    } else {
        if (typeof(Storage) !== "undefined") {
            var listOrders = sessionStorage.getItem("order_list")
            if (listOrders !== null && listOrders.length > 0) {
                listOrders = JSON.parse(listOrders);
                count = listOrders.order_list.length
            }
        }
    }

    var cart = document.getElementById('cart')

    if (cart && cart !== null) {
        if (count > 0) {
            cart.innerHTML = ' (' + count + ')'
        } else {
            cart.innerHTML = ''
        }
    }
}

function signout() {
    deleteCookie()
}

async function deleteCookie() {
    let response = await fetch("/auth",  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        // sessionStorage.setItem("usn", '')
        // sessionStorage.setItem("email", '')
        // sessionStorage.setItem("password", '')
        sessionStorage.removeItem('usn')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('password')
        window.location.href = "index.html"
    } else {
        failResponse(response)
    }
}

async function failResponse(response) {
    // alert("HTTP-Error: " + response.status)
    console.log(response.status)
    console.log(response)
    let json = await response.json()
    console.log(json.message)
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function disableElement(name){
    $(name).prop("disabled",true).css('opacity',0.5)
}

function backtoHomePage() {
    console.log('backtoHomePage')
    window.location.href = "index.html"
}
