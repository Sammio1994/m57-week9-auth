const {Router} = require("express");
const userRouter = Router();

const {addUser, login, findAll, } = require("./controllers");
const {hashPass, comparePass} = require("../middleware/auth");

// user signup
userRouter.post("/users/signup", hashPass, addUser);

// user login
userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/getallusers", findAll);

module.exports = userRouter;

