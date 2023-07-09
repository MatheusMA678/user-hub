import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { userController } from "./controllers/userController";
import { checkToken } from "./utils/checkToken";

dotenv.config();

const app = express();
const userRouter = express.Router();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

userRouter
  .get("/users", userController.getAll)
  .get("/users/:id", checkToken, userController.getOne)
  .post("/auth/register", userController.createOne)
  .post("/auth/login", userController.createToken)
  .delete("/users/:id", userController.deleteOne);

app.listen(port, () => {
  console.log(`🚀[server]: Running in http://localhost:${port}`);
});
