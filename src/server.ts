import express from "express";
import TodoController from "./controllers/TodoController";
import UserController from "./controllers/UserController";
import checksExistsUserAccount from "./middleware/checksExistsUserAccount";

const app = express();
app.use(express.json());

const userController = new UserController();
const todoController = new TodoController();

app.post('/user', userController.create);
app.get('/user', userController.show);

app.post('/todo', checksExistsUserAccount, todoController.create);

app.listen(3333, () => console.log("🚀 Server is running at: http://localhost:3333"));
