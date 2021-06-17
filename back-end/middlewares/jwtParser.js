require('dotenv').config();
const jwt = require('jsonwebtoken');


const { env: { JWT_SECRET } } = process;

const jwtParser = (req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        console.log(req.headers)
        const token = authorization.replace('Bearer ', '');
        const { sub: userId } = jwt.verify(token, JWT_SECRET);
        //console.log(req)
        req.userId = userId;
        console.log(req.userId)
        //res.status(200).json({message: "Token is valid"})
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
}
module.exports = jwtParser;
