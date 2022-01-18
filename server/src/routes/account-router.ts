import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';
import { hash, compare } from 'bcryptjs'; // for Encode, Decode
import jwt from 'jsonwebtoken';

import { verifyToken } from '../authorization';
import { UserService } from '../services/user-service';
import { User } from '../model/user';

// Enables the use of asynchronous functions on the router
const router = asyncify(express.Router());

// Get profile
router.use('/profile', verifyToken);
router.get('/profile', async (request: Request, response: Response) => {
    const userService = new UserService();

    try {
        let email: string = response.locals['email'];

        const user: User | null = await userService.read(email);
        if (!user) {
            // User not exist
            response.status(400).send('User not exist');
            return;
        }

        response.status(200).send({ name: user.name });
    } catch (err) {
        response.status(400).send('user error');
    }
});

// Login
router.post('/login', async (request: Request, response: Response) => {
    const userService = new UserService();

    try {
        let email: string = request.body.email;
        let password: string = request.body.password;

        const user: User | null = await userService.read(email);
        if (!user) {
            // email not exist
            response.status(400).send({ msg: 'Email not exist' });
            return;
        }

        const result = await compare(password, user.password);
        if (!result) {
            // password incorrect
            response.status(400).send({ msg: 'Password incorrect' });
            return;
        }

        // Tokens are created with user information
        const token = jwt.sign(
            {
                email: email
            },
            process.env.SECRET_KEY || 'secret_key',
            {
                expiresIn: '600m'
            }
        );
        response.json({
            name: user.name,
            token: token,
        });
    } catch (err) {
        response.status(400).send('login error');
    }
});

// Register
router.post('/register', async (request: Request, response: Response) => {
    const userService = new UserService();

    let user: User = request.body;

    // Hash the user's password
    user.password = await hash(user.password, 5);

    try {
        const data = await userService.create(user);

        if (data) {
            response.status(201).send('success');
        } else {
            response.status(400).send('register error');
        }
    } catch (err) {
        response.status(400).send('register error');
    }
});

export = router;