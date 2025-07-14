import express from "express"
import { connectDB } from "./config/mondoDB.js";
import dotenv from "dotenv"
import router from "./routes/noteRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/app/routes", router)

app.listen(3000, ()=>{
    console.log("Hi there hello");
})

connectDB();

app.get('/api/status', (req, res)=>{
    res.send("Hi person");
})