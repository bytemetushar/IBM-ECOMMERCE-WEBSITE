import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import morgan from 'morgan';
config();
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping', function(req,res){
    res.send('pong')
})

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// app.all('*',(req,res)=>{
//     res.status(400).send("OOPS! 404 Page not found")
// })

export default app;