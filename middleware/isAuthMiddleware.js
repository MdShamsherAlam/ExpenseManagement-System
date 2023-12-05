import jwt from 'jsonwebtoken';
import User from '../Models/userModels.js';
import errorResponse from '../utils/errorResponse.js';

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('authHeader', authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).send({ status: false, message: "Auth failed" });
    }

    const token = authHeader.slice(7);
    console.log("token", token);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (err) {
        return res.status(500).send({ status: false, message: "something Went On server" })
    }
};

export default isAuth;
