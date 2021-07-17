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
 * @api {get} /products Request to get all Product entries in the DB
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/products
 * 
 * @apiSuccess {Object[]} Product List in the database
 * 
 * @apiError (404: No Product Found) {String} message "No Product"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {
    const theQuery = 
        `SELECT *
        FROM Products`

    pool.query(theQuery)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    products: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Product"
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
 * @api {get} /products/productid Request to get a Product entries in the DB
 * @apiName GetProductByID
 * @apiGroup Products
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/products/productid
 * 
 * @apiSuccess {Object} Product in the database
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * @apiError (404: No Product Found) {String} message "No Product"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
 router.get("/:id?", (request, response, next) => {
    if (isProvided(request.params.id)) {
        next()
    } else {
        response.status(400).json({ message: 'Missing required information' })
    }
}, (request, response, next) => {

    const theQuery = 
        `SELECT *
        FROM Products
        WHERE ProductID=$1`

    let values = [request.params.id]

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    products: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Product"
                })
            }
        })
        .catch(err => {
            response.status(400).send({
                message: err.detail
            })
        })
})

module.exports = router