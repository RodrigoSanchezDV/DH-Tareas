import express from "express";
import productsController from "../controllers/products.js"
const router = express.Router();

router.get("/",productsController.index);

router.get("/create",productsController.showCreate);

router.get("/one/:price",productsController.one);

router.get("/edit/:id",productsController.showEdit)

router.post("/",productsController.create);

router.post("/edit/:id",productsController.edit)

export default router;