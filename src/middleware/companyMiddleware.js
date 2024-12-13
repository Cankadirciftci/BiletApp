import { secret_key_2 } from "../config/env/index.js";
import jwt from 'jsonwebtoken';

const verifyToken_2 = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res
        .status(403)
        .json({message: 'No token provided'});
    }
    try{
        const decoded = jwt.verify(token, secret_key_2);
        req.firmaId = decoded.firmaId;
        next();
    }
    catch(error){
        return res.status(403).json({message: "Unauthorized"});
    }
}

export default verifyToken_2;
