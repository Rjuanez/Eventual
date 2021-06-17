const express = require("express");
const User = require('../../../models/user');
const userRouter = express.Router();
const jwtParser = require('../../../middlewares/jwtParser');


userRouter.use(jwtParser);

userRouter.use(async (req, res) => {
    console.log(req.userId)
    console.log("xd")
    const user = await User.findById(req.userId);
    
    if (!user) {
        return res.status(404).send({
            success: false,
            message: "User not found"
        });
    }
    return res.send({
        succss: true,
        user
    });
});


module.exports = userRouter;