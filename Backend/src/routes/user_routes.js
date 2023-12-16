import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { findUserByUsername } from '../db/db_queries.js';
import { sendEmail, authorization } from '../utils/authUtils.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

// Login in post method generating JWT and returning it with additionnal user data
router.post('/login', async (req, res, next) => {
    const username = req.body.username;
    let user, token;

    try {
        user = await findUserByUsername(username);
        // if (!existingUser || existingUser.password != password) {
        if (!user) {
            const error = new Error("Wrong details, please check again.");
            return next(error);
        }

        // Creating jwt token
        const userData = {
            username: user.username,
            isAdmin: user.isAdmin,
            time: Date()
        };
        token = jwt.sign(userData, process.env.JWT_SECRET_KEY);

        sendEmail("User Login", user.username);

        // Set cookie and send response
        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true in production if using HTTPS
            })
            .status(200)
            .send({ message: "Logged in successfully!" });
    } catch (err) {
        console.error(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
});

// Getting protected info by token
router.get('/get_protected_info', authorization, async (req, res, next) => {
    try {
        let data = {
            "username": req.username,
            "isAdmin": req.isAdmin,
            "time": req.time
        };
        let response = {
            "success": true,
            "data": data,
            "message": req.isAdmin ? "You are authorized!" : "You are not authorized!"
        };
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
        const error = new Error("Error getting protected info.");
        return next(error);
    }
});

// Logout: removing cookie.
router.post("/logout", authorization, async (req, res, next) => {
    try {
        // Assuming req.username is available from your authorization middleware
        sendEmail("User Logout", req.username);

        // Clear the token cookie and send a success response
        return res
            .clearCookie("token")
            .status(200)
            .send({ message: "Successfully logged out!" });
    } catch (err) {
        console.error(err);
        const error = new Error("Error during logout.");
        return next(error);
    }
});

export default router;