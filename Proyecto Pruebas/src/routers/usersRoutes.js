const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const path = require("path");
const multer = require("multer");

const usercontroller = require("../controllers/usuariosControllers");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.resolve(__dirname, "../../public/userImages"))
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now();
        cb(null, "IMG-" + uniqueSuffix + file.fieldname + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})


const guest = require("../middlewares/guestMiddleware")
const auth = require("../middlewares/authMiddleware")

const validateCreateForm = require("../middlewares/validationRegister")
router.get("/createAccount",auth ,usercontroller.crearCuenta);
router.post("/create",upload.single("userImage"),validateCreateForm, usercontroller.subirCuenta)

router.get("/profile",guest,usercontroller.profile)
router.get("/logout", usercontroller.logout)

const validationLogin = require("../middlewares/loginAccountMiddleware")
router.get("/login",auth ,usercontroller.login)
router.post("/login",validationLogin,usercontroller.upDataLogin)

module.exports = router;
