import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Product mame must be provided']},
    price:{type:Number,required:[true,'Product Price must be provided']},
    featured:{type:Boolean,default:false},
    rating:{type:Number,default:4.5},
    dateProductCreated:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
          },
    }
},{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);

export default Product;