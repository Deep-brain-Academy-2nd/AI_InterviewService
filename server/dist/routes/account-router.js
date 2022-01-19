"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_asyncify_1 = __importDefault(require("express-asyncify"));
const bcryptjs_1 = require("bcryptjs"); // for Encode, Decode
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = require("../authorization");
const user_service_1 = require("../services/user-service");
// Enables the use of asynchronous functions on the router
const router = (0, express_asyncify_1.default)(express_1.default.Router());
// Get profile
router.use('/profile', authorization_1.verifyToken);
router.get('/profile', async (request, response) => {
    const userService = new user_service_1.UserService();
    try {
        let email = response.locals['email'];
        const user = await userService.read(email);
        if (!user) {
            // User not exist
            response.status(400).send('User not exist');
            return;
        }
        response.status(200).send({ name: user.name });
    }
    catch (err) {
        response.status(400).send('user error');
    }
});
// Login
router.post('/login', async (request, response) => {
    const userService = new user_service_1.UserService();
    try {
        let email = request.body.email;
        let password = request.body.password;
        const user = await userService.read(email);
        if (!user) {
            // email not exist
            response.status(400).send({ msg: 'Email not exist' });
            return;
        }
        const result = await (0, bcryptjs_1.compare)(password, user.password);
        if (!result) {
            // password incorrect
            response.status(400).send({ msg: 'Password incorrect' });
            return;
        }
        // Tokens are created with user information
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, process.env.SECRET_KEY || 'secret_key', {
            expiresIn: '600m'
        });
        response.json({
            name: user.name,
            token: token,
        });
    }
    catch (err) {
        response.status(400).send('login error');
    }
});
// Register
router.post('/register', async (request, response) => {
    const userService = new user_service_1.UserService();
    let user = request.body;
    // Hash the user's password
    user.password = await (0, bcryptjs_1.hash)(user.password, 5);
    try {
        const data = await userService.create(user);
        if (data) {
            response.status(201).send('success');
        }
        else {
            response.status(400).send('register error');
        }
    }
    catch (err) {
        response.status(400).send('register error');
    }
});
module.exports = router;
//# sourceMappingURL=account-router.js.map