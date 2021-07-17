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
 * @api {get} /member Request to get member's information
 * @apiName GetMemberInfo
 * @apiGroup Member
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/member
 * 
 * @apiSuccess {Object} Member information in the database
 * 
 * @apiError (404: User Not Found) {String} message "User not found"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    const theQuery = `SELECT FirstName, LastName, Email, StreetAddress, City, State, ZipCode, NameOnCard
                            , ExpMonth, ExpYear, CardNumber
                            FROM Members
                            WHERE MemberID=$1`

    let values = [request.decoded.memberid]

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    info: result.rows
                })
            } else {
                response.status(404).send({
                    message: "User not found"
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