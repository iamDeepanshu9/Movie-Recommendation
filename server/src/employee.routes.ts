import * as express from "express";
import { collections } from "./database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

export const userRouter = express.Router();
userRouter.use(express.json());

// POST /signup
userRouter.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, email, password: hashedPassword };
        const result = await collections.users?.insertOne(newUser);

        if (result?.acknowledged) {
            res.status(201).send(`User created with ID: ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create new user.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// POST /login
userRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await collections.users?.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, 'YourSecretKeyHere', { expiresIn: '24h' });
            res.status(200).json({ message: "Login successful!", token });
        } else {
            res.status(401).send("Username or password is incorrect");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
