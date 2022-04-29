const fs = require("fs");
const path = require("path");
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs");

const fileUsers = path.resolve(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(fileUsers, "utf-8"))



const controllers = {

    crearCuenta: (req, res)=>{
        return res.render("crearCuenta")
    },


    subirCuenta: (req, res)=>{
        const generateID = () => {
            if(users.length != 0){       
                const lastProduct =  users[Number(users.length) - Number(1)];	         
                const lastID = Number(lastProduct.id) + Number(1);	
                return lastID;
            }else{
                const lastID = 1
                return lastID;
            }
        }

        const userEmail = users.find(users=> users.email == req.body.email);

        let userDoublepass = undefined;
        if(req.body.password == req.body.password2){
            userDoublepass = true;
        }else{
            userDoublepass = false;
        }
        

        let error = validationResult(req);
        
                if(error.isEmpty()){
                    if(userEmail == undefined){
                        if(userDoublepass == true){
                            users.push({
                                id:generateID(),            
                                name:req.body.nombreUsuario,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: bcrypt.hashSync(req.body.password, 5),
                                img: req.file && req.file.filename? req.file.filename : "default-IMG.png"    
                                });
                            fs.writeFileSync(fileUsers, JSON.stringify(users, null, " "));
                            return res.redirect("/users/createAccount")
                        }else{
                            res.render("crearCuenta",{error:{twinPasswords:"Las contraseñas no coinciden"}, old: req.body})
                        }
                    }else{
                        res.render("crearCuenta",{error:{correo:"Correo existente"}, old: req.body})
                    }
                }else{
                    return res.render("crearCuenta",{error: error.mapped(), old: req.body})
                }
},
    
    
    
    
    
    
    login: (req,res)=>{
        res.render("login")
    },
    
    upDataLogin: (req,res)=>{
        const userToLoggin = users.find(user => req.body.email == user.email)
        
        let error = validationResult(req);
        if(error.isEmpty()){
            if(userToLoggin !== undefined){
                const okPassword = bcrypt.compareSync(req.body.password, userToLoggin.password)
                if(okPassword){
                    req.session.dataUser = userToLoggin
                    res.redirect("/users/profile")
                }else{
                    res.render("login",{error:{msg:"Datos incorrectos jajajaj"}},)
                }
            }else{
                res.render("login",{error:{msg:"Datos incorrectos"}},)
            }
        }else{
            res.render("login",{error: error.mapped(), old: req.body})
        }
    },
    profile:(req,res)=>{
        res.render("profile", {dataUser:req.session.dataUser})
    },
    logout:(req,res)=>{
        req.session.destroy();
        res.redirect("/products")
    }
}

module.exports = controllers;


/*        
        if(req.body.password == req.body.password2){
            users.forEach(user => {if(req.body.email !== user.email){
                if(error.isEmpty()){
                    users.push({
                        id:generateID(),            
                        name:req.body.nombreUsuario,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 5),
                        img: req.file && req.file.filename? req.file.filename : "default-IMG.png"
                    });
                    fs.writeFileSync(fileUsers, JSON.stringify(users, null, " "));
                    res.redirect("/users/login")
                }else{
                    res.render("crearCuenta",{error: error.mapped(), old: req.body})
                }
            }else{
                res.render("crearCuenta",{errorCorreo:{correoExistente:"Correo existente"}, old:req.body,error: error.mapped()})
            }})
        }else{
            res.render("crearCuenta",{errorPassword:{passwords:"Password no coincidentes"}, old:req.body,error: error.mapped()})
        }
        ----------------------------------------------------------------
                if(error.isEmpty()){
            users.forEach(user => {if(user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)){
                
                let userLogged = user;
                req.session.dataUser = userLogged
                console.log(req.session.dataUser)
                res.send("Inicio de sesion completo")
            }else{
                res.render("login",{error:{msg:"Credenciales incorrectas"}},)
            }
        })
        }else{
            res.render("login",{error: error.mapped(), old: req.body})
        }
        
        */