//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

const ProductSize = {
    S: 'Small'
    , M: 'Medium +$4.00'
    , L: 'Large +$8.00'
    , E: 'Extra Large +$12.00'
}

const ProductCrust = {
    R: 'Regular'
    , T: 'Thin +$1.00'
    , S: 'Spicy +$2.00'
    , G: 'Garlic +$3.00'
}

const ProductSauce = {
    B: 'BBQ Sauce'
    , G: 'Garlic Sauce'
    , T: 'Tomatoes Sauce'
    , N: 'No Sauce'
}

const ProductCheese = {
    R: 'Regular'
    , E: 'Extra Chesse +$3.00'
    , N: 'No Cheese'
}

function isBooleanValid(val) {
    if (val === true
        || val === false
        || val === 't'
        || val === 'true'
        || val === 'y'
        || val === 'yes'
        || val === 'on'
        || val === '1'
        || val === 'f'
        || val === 'false'
        || val === 'n'
        || val === 'no'
        || val === 'off'
        || val === '0'
        )
        return true
    return false
}

/**
 * @api {post} /orders Add an order into the cart
 * @apiName PostOrdersCart
 * @apiGroup Orders
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParam {Integer} productid ID of the product of order
 * @apiParam {String} size Size option of order
 * @apiParam {String} crust Crust option of order
 * @apiParam {String} sauce Sauce option of order
 * @apiParam {String} cheese cheese option of order
 * @apiParam {String} meats List of meats of order
 * @apiParam {String} veggies List of veggies of order
 * @apiParam {Integer} quantity Quantity of order
 * @apiParam {Number} price Price of 1 item of order
 * @apiParam {Boolean} favorite Favorited order
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      productid: 5,
 *      size: 'Large +$8.00',
 *      crust: 'Spicy +$2.00',
 *      sauce: 'Tomatoes Sauce',
 *      cheese: 'Extra Chesse +$3.00',
 *      meats: 'Sausage,Ground Beef,Seafood',
 *      veggies: 'Mushrooms,Onions',
 *      quantity: 2,
 *      price: 30.99,
 *      favorite: true
 *  }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (400: Parameters Invalid) {String} message "Parameters value is invalid"
 * @apiError (400: Boolean Invalid) {String} message "Boolean value is invalid"
 * @apiError (404: User Not Found) {String} message "User Not Found"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
router.post("/", (request, response, next) => {
    const memberid = isProvided(request.body.memberid) ? request.body.memberid : request.decoded.memberid
    let theQuery = "SELECT Email FROM Members Where memberid=$1"
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'User Not Found'
                })
            } else {
                next()
            }
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
}, (request, response, next) => {

    const memberid = request.decoded.memberid
    const productid = request.body.productid
    const size = request.body.size
    const crust = request.body.crust
    const sauce = request.body.sauce
    const cheese = request.body.cheese
    const meats = request.body.meats
    const veggies = request.body.veggies
    const quantity = request.body.quantity
    const price = request.body.price
    const favorite = request.body.favorite
    if (productid > 0 && isProvided(size) && isProvided(crust) && isProvided(sauce) && isProvided(cheese)
            && meats !== undefined && veggies !== undefined && quantity > 0 && price > 0) {
        if (!Object.values(ProductSize).includes(size) || !Object.values(ProductCrust).includes(crust)
                || !Object.values(ProductSauce).includes(sauce) || !Object.values(ProductCheese).includes(cheese)
                || !isBooleanValid(favorite)) {
            response.status(400).send({
                message: "Parameters value is invalid"
            })
            return
        }
        let theQuery = `INSERT INTO Orders(MemberID, ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies, Quantity, Price, Favorite)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING OrderID`
        let values = [memberid, productid, size, crust, sauce, cheese, meats, veggies, quantity, price, favorite]
        pool.query(theQuery, values)
            .then(result => {
                response.status(201).send({
                    success: true
                })
                if (result.rowCount > 0) {
                    request.body.orderid = result.rows[0].orderid
                    next()
                }
            })
            .catch((error) => {
                response.status(400).send({
                    message: error.detail
                })
            })
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response) => {

    const memberid = request.decoded.memberid
    const orderid = request.body.orderid
    let theQuery = "INSERT INTO Carts_Orders(MemberID, OrderID) VALUES ($1, $2) RETURNING *"
    let values = [memberid, orderid]
    pool.query(theQuery, values)
        .then(result => {
            // console.log('added to cart')
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
})

/**
 * @api {post} /orders Add an order into the DB
 * @apiName PostOrdersSingnedIn
 * @apiGroup Orders
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders/signedin
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParam {String} first users first name
 * @apiParam {String} last users last name
 * @apiParam {String} email users email *unique
 * @apiParam {String} address users address
 * @apiParam {String} city users city
 * @apiParam {String} state users state
 * @apiParam {String} zip users zip
 * @apiParam {String} nameoncard name on card
 * @apiParam {String} expmonth cards expmonth
 * @apiParam {String} expyear cards expyear
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (404: User not found) {String} message "User not found"
 * @apiError (404: Orders not found) {String} message "Orders not found"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
 router.post("/signedin", (request, response, next) => {
    const memberid = isProvided(request.body.memberid) ? request.body.memberid : request.decoded.memberid
    let theQuery = "SELECT Email FROM Members Where memberid=$1"
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'User not found' 
                })
            } else {
                next()
            }
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
}, (request, response, next) => {

    const memberid = request.decoded.memberid
    const first = request.body.first
    const last = request.body.last
    const email = request.body.email
    const address = request.body.address
    const city = request.body.city
    const state = request.body.state
    const zip = request.body.zip
    const nameoncard = request.body.nameoncard
    const cardnumber = request.body.cardnumber
    const expmonth = request.body.expmonth
    const expyear = request.body.expyear
    if (isProvided(first) && isProvided(last) && isProvided(email) && isProvided(address)
            && isProvided(city) && isProvided(state) && isProvided(zip) && isProvided(nameoncard)
            && isProvided(cardnumber) && expmonth > 0 && expyear > 0) {
        let theQuery = `UPDATE Members SET
                            StreetAddress=$1
                            , City=$2
                            , State=$3
                            , ZipCode=$4
                            , NameOnCard=$5
                            , CardNumber=$6
                            , ExpMonth=$7
                            , ExpYear=$8
                        WHERE MemberID=$9`
        let values = [address, city, state, zip, nameoncard, cardnumber, expmonth, expyear, memberid]
        pool.query(theQuery, values)
            .then(result => {
                next()
            })
            .catch((error) => {
                response.status(400).send({
                    message: error.detail
                })
            })
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response, next) => {
    const memberid = request.decoded.memberid
    let theQuery = `SELECT OrderID
                        FROM Carts_Orders
                        WHERE memberid=$1`
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'Orders not found'
                })
            } else {
                request.orders = result.rows
                next()
            }
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
}, (request, response, next) => {

    const memberid = request.decoded.memberid
    const first = request.body.first
    const last = request.body.last
    const email = request.body.email
    const address = request.body.address
    const city = request.body.city
    const state = request.body.state
    const zip = request.body.zip

    for (var i = 0; i < request.orders.length; i++) {
        const orderid = request.orders[i].orderid
        let theQuery = `INSERT INTO Members_Orders
            (MemberID
            , Email
            , OrderID
            , FirstName
            , LastName
            , StreetAddress
            , City
            , State
            , ZipCode)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        let values = [memberid, email, orderid, first, last, address, city, state, zip]
        pool.query(theQuery, values)
            .then(result => {
                if (i >= request.orders.length) {
                    next()
                }
            })
            .catch((error) => {
                response.status(400).send({
                    message: error.detail
                })
            })
    }
}, (request, response) => {
    const memberid = request.decoded.memberid
    let theQuery = `DELETE FROM Carts_Orders
                        WHERE MemberID=$1`
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            response.status(201).send({
                success: true
            })
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
})

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /orders Request to get all Orders entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} Order List in the database
 * 
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {
    const theQuery = `SELECT P.ProductID, P.Name, P.ImagePath, O.OrderID, O.Size, O.Crust, O.Sauce, O.Cheese
                            , O.Meats, O.Veggies, O.Quantity, O.Price, O.Favorite
                            FROM Members_Orders as MO
                                INNER JOIN Orders as O
                                ON MO.OrderID = O.OrderID
                                INNER JOIN Products as P
                                ON O.ProductID = P.ProductID
                            WHERE MO.MemberID=$1
                            ORDER BY O.OrderID DESC`

    let values = [request.decoded.memberid]

    pool.query(theQuery, values)
        .then(result => {
            // if (result.rowCount > 0) {
                // console.log(result.rows)
                response.status(200).send({
                    orders: result.rows
                })
            // }
            // else {
            //     response.status(404).send({
            //         message: "No Product"
            //     })
            // }
        })
        .catch(err => {
            response.status(400).send({
                message: err.detail
            })
        })
})

/**
 * @api {delete} /orders Request to remove an order in DB
 * @apiName DeleteOrder
 * @apiGroup Orders
 * 
 * @apiSuccess {boolean} success true when successfully remove order
 * @apiSuccess {String} message "Authentication successful!""
 * @apiSuccess {String} token JSON Web Token
 * 
 * @apiError (400: Missing Authorization Header) {String} message "Missing Authorization Header"
 * 
 * @apiError (400: Malformed Authorization Header) {String} message "Malformed Authorization Header"
 * 
 * @apiError (404: User Not Found) {String} message "User not found"
 * 
 * @apiError (400: Invalid Credentials) {String} message "Credentials did not match"
 * 
 */ 
 router.delete("/", (request, response, next) => { 
    const memberid = isProvided(request.body.memberid) ? request.body.memberid : request.decoded.memberid
    let theQuery = "SELECT Email FROM Members Where memberid=$1"
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'User not found'
                })
            } else {
                next()
            }
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
}, (request, response, next) => {
    const memberid = request.decoded.memberid
    const orderid = request.body.orderid
    let theQuery = `DELETE FROM Members_Orders
                        WHERE MemberID=$1 AND OrderID=$2`
    let values = [memberid, orderid]
    pool.query(theQuery, values)
        .then(result => {
            next()
        })
        .catch((error) => {
            response.status(400).send({
                message: error.detail
            })
        })
}, (request, response) => {
    const orderid = request.body.orderid
    if (orderid > 0) {
        let theQuery = `DELETE FROM Orders
                            WHERE OrderID=$1
                            RETURNING Favorite`
        let values = [orderid]
        pool.query(theQuery, values)
            .then(result => {
                if (result.rowCount > 0) {
                    response.status(201).send({
                        success: true
                        , favorite: result.rows[0].favorite
                    })
                }
            })
            .catch((error) => {
                response.status(400).send({
                    message: error.detail
                })
            })
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

module.exports = router