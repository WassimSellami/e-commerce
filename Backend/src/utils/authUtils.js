import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASSWORD
    }
});

const sendEmail = (subject, username) => {
    let mailOptions = {
        from: process.env.SENDER,
        to: process.env.RECEIVER,
        subject: subject,
        text: "User : " + username + "\n\n\nSent from a NodeJS server."
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const authorization = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.username = data.username;
        req.isAdmin = data.isAdmin;
        req.time = data.time;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

export { sendEmail, authorization };
