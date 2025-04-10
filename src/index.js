import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config(); // Will load .env

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is running on port 8000");
    })
})
.catch((err) => {
    console.log("DB CONNECTION FAILED",err);
})
app
















/*
import express from "express";
const app=express()


( async ()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR",error)
        throw err
    }
})()
    */