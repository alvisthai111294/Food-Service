//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /carts Request to get all Items entries in the carts
 * @apiName GetCarts
 * @apiGroup Carts
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/carts
 * 
 * @apiSuccess {Object[]} Cart Item List in the database
 * 
 * @apiError (404: No Item Found) {String} message "No Item"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    const theQuery = `SELECT P.ProductID, P.Name, P.ImagePath, O.OrderID, O.Size, O.Crust, O.Sauce, O.Cheese
                            , O.Meats, O.Veggies, O.Quantity, O.Price, O.Favorite
                            FROM Carts_Orders as CO
                                INNER JOIN Orders as O
                                ON CO.OrderID = O.OrderID
                                INNER JOIN Products as P
                                ON O.ProductID = P.ProductID
                            WHERE CO.MemberID=$1
                            ORDER BY O.OrderID ASC`

    let values = [request.decoded.memberid]

    pool.query(theQuery, values)
        .then(result => {
            response.send({
                items: result.rows
            })
            // if (result.rowCount > 0) {
            //     response.send({
            //         items: result.rows
            //     })
            // } else {
            //     response.status(404).send({
            //         message: "No Item"
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
 * @api {get} /carts Request to count entries in the cart
 * @apiName GetCartItemCount
 * @apiGroup Carts
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/carts/count
 * 
 * @apiSuccess {Integer} Item Count in Cart
 * 
 * @apiError (404: No Item Found) {String} message "No Item"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
 router.get("/count", (request, response) => {

    const theQuery = 
        `SELECT COUNT(*)
        FROM Carts_Orders
        WHERE MemberID=$1`

    let values = [request.decoded.memberid]

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    count: result.rows[0].count
                })
            } else {
                response.status(404).send({
                    message: "No Item"
                })
            }
        })
        .catch(err => {
            response.status(400).send({
                message: err.detail
            })
        })
})

/**
 * @api {post} /carts/updatequantity update quantity of an order in the DB
 * @apiName PostCarts
 * @apiGroup Carts
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/carts/updatequantity
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParam {Integer} orderid ID of the order
 * @apiParam {Integer} quantity Quantity of order
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (404: MemberID Not Exist) {String} message "MemberID not exist"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
 router.post("/updatequantity", (request, response, next) => {
    const memberid = isProvided(request.body.memberid) ? request.body.memberid : request.decoded.memberid
    let theQuery = "SELECT Email FROM Members Where memberid=$1"
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'MemberID not exist' 
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
}, (request, response) => {

    const orderid = request.body.orderid
    const quantity = request.body.quantity
    if (orderid > 0 && quantity > 0) {
        let theQuery = `UPDATE Orders
                            SET Quantity=$1
                            WHERE OrderID=$2`
        let values = [quantity, orderid]
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
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

/**
 * @api {post} /carts/updatefavorite update favorite of an order in the DB
 * @apiName PostCarts
 * @apiGroup Carts
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/carts/updatefavorite
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParam {Integer} orderid ID of the order
 * @apiParam {Boolean} favorite Favorited order
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (404: MemberID Not Exist) {String} message "MemberID not exist"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
 router.post("/updatefavorite", (request, response, next) => {
    const memberid = isProvided(request.body.memberid) ? request.body.memberid : request.decoded.memberid
    let theQuery = "SELECT Email FROM Members Where memberid=$1"
    let values = [memberid]
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount == 0) {
                response.status(404).send({
                    message: 'MemberID not exist' 
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
}, (request, response) => {

    const orderid = request.body.orderid
    const favorite = request.body.favorite
    if (orderid > 0) {
        let theQuery = `UPDATE Orders
                            SET Favorite=$1
                            WHERE OrderID=$2`
        let values = [favorite, orderid]
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
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

/**
 * @api {delete} /carts Request to remove an item in cart
 * @apiName DeleteItemInCart
 * @apiGroup Carts
 * 
 * @apiSuccess {boolean} success true when successfully remove item
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
    let theQuery = `DELETE FROM Carts_Orders
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
                            WHERE OrderID=$1`
        let values = [orderid]
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
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

module.exports = router