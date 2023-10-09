import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "All fields must be provided!" });
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
