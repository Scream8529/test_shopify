import ProductsController from "../controllers/products.controller";

const Router = require("express");
const router = new Router();

router.get("/", ProductsController.getAllProducts);

module.exports = router;
