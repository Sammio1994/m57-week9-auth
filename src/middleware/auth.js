const bcrypt = require("bcrypt")

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

module.exports = {
    hashPass: hashPass,
};