import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        // return res
        //     .status(400)
        //     .json({ message: "All fields must be provided!" });
        next(errorHandler(490, "All fields must be provided!"));
    }
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error) {
        next(errorHandler(590, "error in signup function!", error));
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "Invalid credentials!"));
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials!"));
        }
        const { password: pass, ...userInfo } = user._doc;
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            {}
        );
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(userInfo);
    } catch (error) {
        next(errorHandler(590, "error in signin function!", error));
    }
};
