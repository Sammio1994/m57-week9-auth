const bcrypt = require("bcrypt")

const User = require("../users/model")

const salt = parseInt(process.env.SALT);

const hashPass = async (req, res, next) => {
    try {
// hash password
const hashedPass = await bcrypt.hash(req.body.password, salt);

// replace password
req.body.password = hashedPass;

// use next()
next();

    } catch (error) {
        res.status(501).json({message: error.message, error: error});
    }
};

const comparePass = async (req, res, next) => {
    try{
        // Step 1: find user using the username (req.body.username?)
const user = await User.findOne ({where: {username: req.body.username}});
        // if (!user) {
        //     return res.status(404).json({message: "noone user", user: req.user.username});
        // };
        //Step 2: compare the plaintext password with the hashed password on the DB
const match = await bcrypt.compare(req.body.password, user.password);
        // Step 3: if false, send response "passwords do not match" - just if
if (!match) {
    return res.status(401).json({message: "password incorrect"});
}
        // Step 4: if true, attach user to body
req.user = user
        // Step 5: next
        next();
    } catch (error) {
        res.status(501).json({message: error.message, error: error});
    }
};
module.exports = {
    hashPass: hashPass,
    comparePass: comparePass,
};