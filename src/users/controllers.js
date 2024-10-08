const User = require("./model");

const addUser= async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        res.status(201).json({ message:"success", user:user })
    } catch (error) {
        res.status(501).json({message: error.message, error: error})
    }
 };

 const login = async (req, res) => {
    try{
        res.status(201).json({message: "success", user: req.user});
    } catch (error) {
    res.status(501).json({message: error.message, error: error});
 }
};

const findAll = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).json({message: "success", users: users});
    }catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
};


 module.exports = {
    addUser: addUser, 
    login: login,
    findAll: findAll,
 };