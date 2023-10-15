import {Request, Response} from 'express';
import { verifyPassword, createJWT, hashPassword} from '../utils/auth.ts';
import DB from '../db/db.ts';
import { User } from '../models/User.ts';

export const login = async (req: Request, res: Response) => {

    const {username, password, email} = req.body;
    const user: User  = await DB.User.get({email});

    if (!user) {
        res.status(401);
        res.send({message: "username not found"});
        return;
    }

    //check password
    if (!verifyPassword(password, user?.password)) {
        res.status(401);
        res.send({message: "incorrect password"});
        return;
    }
    
    const jwt = createJWT(user);
    res.setHeader('Set-Cookie', `jwt=${jwt}; HttpOnly`);
    res.json({
        jwt,
        username,
        email
    });
}

export const createUser = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;
    if (!password || !username) {
        return false;
    }

    try {
        const user: User = await DB.User.create({
            username, 
            email,
            password: hashPassword(password),
        });
        console.log('create user : ', {user})

        const jwt = createJWT(user);
        res.json({jwt});
    }
    catch (err) {
        console.log(err);
        res.status(409);
        res.send({ message: "user with email already exists"});
        return;
    }
}
