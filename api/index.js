import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`connected to mongo DB`);
    })
    .catch((err) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
