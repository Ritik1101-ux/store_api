import mongoose from "mongoose";

const connectDB=async (uri)=>{
  mongoose.set('strictQuery',true); //To Insert only whatever is mongoose Schema

 await mongoose.connect(uri)
  .then(()=>console.log("Database Connected"))
  .catch((error)=>console.log(error));

}

export default connectDB;