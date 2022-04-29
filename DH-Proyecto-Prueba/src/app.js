const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
app.use(methodOverride("_method"))

app.set("view engine", "ejs");

app.listen(3000, ()=>{console.log("Servidor corriendo")});

const routerProducts = require("./routers/productsRoutes");
const routerUsers = require("./routers/usersRoutes");
const userLogged = require("./middlewares/userLoggedMiddleware")



const historial = require("./middlewares/historialMiddleware")

app.use(express.static(__dirname + "../../public"));
app.use(historial);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(session({ secret: 'Secreto', resave: false, saveUninitialized: true }));

app.use(userLogged);




app.use("/products", routerProducts);
app.use("/users", routerUsers);




app.use((req,res,next)=>{
    res.status(404).render("sharingan")
});
