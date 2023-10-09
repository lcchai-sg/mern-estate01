import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();
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
