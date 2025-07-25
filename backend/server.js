import express from "express"
import { connectDB } from "./config/mondoDB.js";
import dotenv from "dotenv"
import router from "./routes/noteRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
}));
app.use(rateLimiter);

app.use("/app/routes", router)



connectDB().then(()=>{
    app.listen(3000, ()=>{
        console.log("Hi there hello");
    })
});

app.get('/api/status', (req, res)=>{
    res.send("Hi person");
})