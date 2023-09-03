import * as dotenv from 'dotenv'
import connectDB from './db/connect.js'
import Product from './models/product.js';
import ProductsData from './products.json' assert {type: 'json'};;

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductsData);
        console.log('Success Fully Inserted');
        process.exit(0);
    } catch (error) { 
        console.log(error);
        process.exit(1);
    }

}

start();