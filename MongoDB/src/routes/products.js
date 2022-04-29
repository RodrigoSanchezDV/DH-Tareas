import express from "express";
import productsController from "../controllers/products.js"
const router = express.Router();

router.get("/",productsController.index);

router.get("/insert",productsController.insertData);

export default router;