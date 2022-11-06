const m$todo = require("../modules/todo.module");
const { Router } = require("express");
const response = require("../helpers/response");

const TodoController = Router();

/**
 * Creat Todo
 * @param {number} user_id
 * @param {string} description
 *
 * http://localhost:8000/api/todos/addtodo
 */

TodoController.post("/addtodo", async (req, res) => {
   const add = await m$todo.creatTodo(req.body);

   response.sendResponse(res, add);
});

/**
 * List Todo User
 *
 * @param {number} user_id
 *
 * http://localhost:8000/api/todos/todolist/:user_id
 */
TodoController.get("/todolist/:user_id", async (req, res) => {
   const list = await m$todo.listTodo(Number(req.params.user_id));

   response.sendResponse(res, list);
});

/**
 * Update Todo user
 *
 * @param {number} user_id
 * @param {number} todo_id
 * @param {string} description
 *
 * http://localhost:8000/api/todos/updatetodo
 */

TodoController.put("/updatetodo", async (req, res) => {
   const add = await m$todo.updateTodo(req.body);

   response.sendResponse(res, add);
});

/**
 * Delete Todo user
 *
 * @param {number} user_id
 * @param {number} todo_id
 *
 * http://localhost:8000/api/todos/delete
 */

TodoController.delete("/delete", async (req, res) => {
   const del = await m$todo.deleteTodo(req.body);

   response.sendResponse(res, del);
});

module.exports = TodoController;
