import express from 'express';
import * as dotenv from 'dotenv';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js';
import ProductRouter from './routes/products.route.js';
import  'express-async-errors'

const app=express();
dotenv.config();


app.use(express()); //Json parsing as body 


app.get('/',(req,res)=>{
    res.send("hello");
});

app.use('/api/v1/products',ProductRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const startServer=async()=>{

    await connectDB(process.env.MONGODB_URL);
    app.listen(4000,()=>console.log("Server Starter on Port 4000"));
}

 
startServer();


