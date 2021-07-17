function myFunction() {
    var x = document.getElementById("past-order");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function myFunction2() {
    var x = document.getElementById("favorite-order");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// function removeAllFavoriteOrders() {
//   removeFavoriteOrders()
// }

// async function removeFavoriteOrders() {

//   let response = await fetch("/orders/removeallfavoriteorders",  {
//       method: 'DELETE'
//   })
//   if (response.ok) {
//       let json = await response.json()

//       if (json.success) {
//         window.location.reload()
//       }
//   } else {
//       // alert("HTTP-Error: " + response.status)
//       console.log(response.status)
//       let json = await response.json()
//       // console.log(json)
//   }
// }

// function removeAllPreviousOrders() {
//   removePreviousOrders()
// }

// async function removePreviousOrders() {

//   let response = await fetch("/orders/removeallpreviousorders",  {
//       method: 'DELETE'
//   })
//   if (response.ok) {
//       let json = await response.json()

//       if (json.success) {
//         window.location.reload()
//       }
//   } else {
//       // alert("HTTP-Error: " + response.status)
//       console.log(response.status)
//       let json = await response.json()
//       // console.log(json)
//   }
// }
