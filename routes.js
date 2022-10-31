const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController")

const _routes = [
    // http://localhost:800/api/users/----
    ['users', UserController],

    // http://localhost:8000/api/todos/---
    ['todos', TodoController]
]

const routes = (app) => {
    _routes.forEach( route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    });
}

module.exports = routes