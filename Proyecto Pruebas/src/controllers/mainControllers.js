
const fs = require("fs");
const path = require("path");


const filePath = path.resolve(__dirname, "../data/products.json");
let productsCategories = JSON.parse(fs.readFileSync(filePath, "utf-8"))


const controller ={
    browse: (req,res)=>{
        return res.render("main", {products: productsCategories})
    },
    create: (req,res)=>{
        res.render("crearProducto")
    },
    add:(req,res)=>{

        const generateID = () => {
            if(productsCategories.length != 0){       
                const lastProduct =  productsCategories[Number(productsCategories.length) - Number(1)];	         
                const lastID = Number(lastProduct.id) + Number(1);	
                return lastID;
            }else{
                const lastID = 1
                return lastID;
            }

        }

        let talles=[]

        if(req.body.talleXS != null){
            talles.push("XS")
        }
        if(req.body.talleS != null){
            talles.push("S")
        }
        if(req.body.talleM != null){
            talles.push("M")
        }
        if(req.body.talleXL != null){
            talles.push("Xl")
        }

        productsCategories.push({
            id:generateID(),            
            name: req.body.productName,
            price: Number(req.body.productPrice),
            img: req.files.pdt? req.files.pdt[0].filename : "default-IMG.png",
            img2: req.files.pdt2? req.files.pdt2[0].filename : "default-IMG.png",
            img3: req.files.pdt3? req.files.pdt3[0].filename : "default-IMG.png",
            img4: req.files.pdt4? req.files.pdt4[0].filename : "default-IMG.png",
            talles: talles
        });
        fs.writeFileSync(filePath, JSON.stringify(productsCategories, null, " "));
        res.redirect("/products")
    },
    edit:(req,res)=>{
        let idProducto = req.params.id;
        if(idProducto==undefined){
            res.render("sharingan")
        }else{
        const product = productsCategories.find(element => element.id == idProducto);
            res.render("editarProducto", {product: product})
        }
    },
    update:(req,res)=>{
        let idProducto = req.params.id;
        productsCategories.forEach(product => {if(product.id == idProducto){
            product.name =  req.body.productName,
            product.price = Number(req.body.productPrice),
            product.img = req.files.img? req.files.img[0].filename : product.img, 
            product.img2 = req.files.img2? req.files.img2[0].filename : product.img2,
            product.img3 =  req.files.img3? req.files.img3[0].filename : product.img3,
            product.img4 =  req.files.img4? req.files.img4[0].filename : product.img4
        }           
        });
        fs.writeFileSync(filePath, JSON.stringify(productsCategories, null, " "));
        console.log(productsCategories)
        res.redirect("/products")
    },
    deleteProduct:(req,res)=>{
        let idProducto = req.params.id;
        if(idProducto==undefined){
            res.render("sharingan")
        }else{
        const product = productsCategories.find(element => element.id == idProducto);
        res.render("deleteProduct", {product: product})
        }
    },
    delete: (req,res)=>{
        let idProducto = req.params.id;
        productsCategories = productsCategories.filter(product => product.id != idProducto);
        fs.writeFileSync(filePath, JSON.stringify(productsCategories, null, " "));
        res.redirect("/products")
    }
}
module.exports = controller;