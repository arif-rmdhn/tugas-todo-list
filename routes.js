const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

const _routes = [
   // http://localhost:800/api/users/----
   ["users", UserController],

   // http://localhost:8000/api/todos/---
   ["todos", TodoController],

   // http://localhost:8000/api/
   ["", AuthController],
];

const routes = (app) => {
   _routes.forEach((route) => {
      const [url, controller] = route;
      app.use(`/api/${url}`, controller);
   });
};

module.exports = routes;
