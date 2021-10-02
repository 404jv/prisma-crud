import express from "express";
import UserController from "./controllers/UserController";

const app = express();
app.use(express.json());

const userController = new UserController();

app.post('/user', userController.create);
app.get('/user', userController.show);

app.listen(3333, () => console.log("🚀 Server is running at: http://localhost:3333"));
