const express = require("express");
const router = express.Router();
const path = require("path");



const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.resolve(__dirname, "../../public/productImages"))
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now();
        cb(null, "IMG-" + uniqueSuffix + file.fieldname + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})


const controller = require("../controllers/mainControllers");

router.get("/", controller.browse);

router.get("/create", controller.create);
router.post("/", upload.fields([
    {name:"pdt"},
    {name: "pdt2"},
    {name: "pdt3"},
    {name: "pdt4"}
]), controller.add)

router.get("/edit/:id", controller.edit);
router.put("/:id", upload.fields([
    {name:"img"},
    {name:"img2"},
    {name:"img3"},
    {name:"img4"}
]), controller.update);

router.get("/delete/:id",controller.deleteProduct)
router.delete("/:id",controller.delete)



























module.exports = router;