import Product from "../models/products.js"

const controllers ={
    insertData: async (req,res)=>{
        await Product.create([{
                name: "C200 glass",
                description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
                price: 15.000,
                discount: 0,
                createdAt: new Date()
        }]),
        res.redirect("/")

    },
    index : async (req,res)=>{
        const products = await Product.find({});
        res.json(products)
    }


}

export default controllers;