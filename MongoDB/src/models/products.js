import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:  {
        type:String, 
        required:true
    }, // String is shorthand for {type: String}
    description: {
        type:String, 
        required:true
    },
    price:   {
        type:Number, 
        required:true
    },
    image: {
        type:String, 
    },
    discount: {
        type:Number, 
        required:true
    },
    /* isDeleted:{
        type:Boolean,
        default:false
    }, */
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date},
    deletedAt:{type:Date, default:null},
},{
    versionKey:false
});

const productModel = mongoose.model("Product",schema);

export default productModel;