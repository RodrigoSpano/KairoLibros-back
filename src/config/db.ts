import mongoose from "mongoose";

mongoose.set('strictQuery', false)
mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log('db connected'))