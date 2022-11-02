import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter.js.js';
import mongoose from 'mongoose';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 4000;

app.use("/auth",authRouter)
app.post("*", (req, res) => {
    res.status(200).json({message:"Reached the server"});
});


mongoose.connect(process.env.URI)
.then(()=>{
app.listen(port,()=>console.log("Backend running on port :",port));
})
.catch((err) => console.log(err));