import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.ts';
import {Request, Response, NextFunction} from 'express';


export const createJWT = (user: User) => {

    const token = jwt.sign(
        { 
            id: user.id, 
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
    );
    return token;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; //in actual header it's capitalized
    if (!authHeader) {
        res.status(401);
        res.send({ message: "not authorized"});
        return;
    }

    const [, bearerToken] = authHeader?.split(' '); //for string "Bearer xyz"

    if (!bearerToken) {
        res.status(401);
        res.send({ message: "not authorized"});
        return;
    }

    try {  
        const user = jwt.verify(bearerToken, process.env.JWT_SECRET as string);
        // @ts-ignore
        req.user = user; //added user to request in auth middleware
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ message: "not valid token"});
        return;
    }
}

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const verifyPassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
}