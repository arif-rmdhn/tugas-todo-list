const m$user = require('../modules/user.module')
const { Router } = require('express')
const response = require('../helpers/response')

const UserController = Router()

/**
 * List User
 * 
 * http://localhost:8000/api/users/userList
 */
UserController.get('/userList', async (req, res) => {
    const list = await m$user.listUser()

    response.sendResponse(res, list)
})



/** 
 * Creat User
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * 
 * http://localhost:8000/api/users/addUser
 * 
 */


UserController.post('/addUser', async (req,res) => {
    // req.body input dari client yang berupa json
    const add = await m$user.createUser(req.body)

    // respon helper
    response.sendResponse(res,add)
})


/** 
 * Update User
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * 
 * http://localhost:8000/api/users/updateUser
 * 
 */


UserController.put('/updateUser', async (req,res) => {
    // req.body input dari client yang berupa json
    const add = await m$user.updateUser(req.body)

    // respon helper
    response.sendResponse(res,add)
})


/**
 * Delete User
 * 
 * @param {number} id
 * 
 * http://localhost:8000/api/users/delete/:id
 */
UserController.delete('/delete/:id', async (req, res) => {
    const del = await m$user.deleteUser(Number(req.params.id))

    response.sendResponse(res, del)
})

module.exports = UserController