//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

/**
 * @api {post} /orders Add an order of the guest into the DB
 * @apiName PostOrdersNotSingnedIn
 * @apiGroup Orders
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/ordersguest
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
 * @apiParam {Object[]} orders order list
 * 
 * @apiSuccess (Success 201) {boolean} success true when the order is inserted
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (404: Orders not found) {String} message "Orders not found"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 */ 
 router.post("/", (request, response) => {

    const first = request.body.first
    const last = request.body.last
    const email = request.body.email
    const address = request.body.address
    const city = request.body.city
    const state = request.body.state
    const zip = request.body.zip
    const orders = request.body.orders

    if (isProvided(first) && isProvided(last) && isProvided(email) && isProvided(address)
            && isProvided(city) && isProvided(state) && isProvided(zip) && orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
            let theQuery = `INSERT INTO Orders(ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies
                                , Quantity, Price, Favorite)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
            let values = [orders[i].productid, orders[i].size, orders[i].crust, orders[i].sauce, orders[i].cheese
                            , orders[i].meats, orders[i].veggies, orders[i].quantity, orders[i].price, orders[i].favorite]
            pool.query(theQuery, values)
                .then(result => {
                    if (i >= orders.length) {
                        response.status(201).send({
                            success: true
                        })
                    }
                })
                .catch((error) => {
                    response.status(400).send({
                        message: error.detail
                    })
                })
        }
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
})

module.exports = router