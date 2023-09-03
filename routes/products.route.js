import express from 'express';
import { getAllProducts,getAllProductStatic } from '../controllers/products.controllers.js';


const ProductRouter=express.Router();


ProductRouter.route('/').get(getAllProducts);
ProductRouter.route('/static').get(getAllProductStatic);

export default ProductRouter;