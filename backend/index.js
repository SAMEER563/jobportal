import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.routes.js'


dotenv.config({});
const app = express()
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())



const coresOption = {
    origin: 'http//localhost:5173',
    credentials: true
}

app.use(cors(coresOption));

const PORT = process.env.PORT || 3000;

// api
app.use("/api/user", userRoute);

// server


app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on the ${PORT}`);
})

