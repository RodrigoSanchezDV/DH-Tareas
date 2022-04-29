import Product from "../models/products.js"

const controllers ={
    index : async (req,res)=>{
        const products = await Product.find({});
        res.render("../views/show.ejs",{data:products})
    },
    one: async(req,res)=>{
        const oneProduct = await Product.findOne({price:req.params.price})
        return res.render("../views/detail",{data:oneProduct})
    },
    showCreate: async(req,res)=>{
        res.render("../views/create")
    },
    create: async (req,res)=>{
        await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount
        })
        res.redirect("/")
    },
    showEdit: async (req,res)=>{
        const oneProduct = await Product.findOne({_id:req.params.id})
        return res.render("../views/edit",{data:oneProduct})
    },
    edit: async(req,res)=>{
        await Product.findOneAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true}
            )
            res.redirect("/")
    }
}

export default controllers;