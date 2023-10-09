import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
        console.log(error);
        res.status(500).json(error);
    }
};
