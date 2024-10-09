import {Router } from "express";
import {verifyAccessToken} from "../middleware/verifyAccessToken.js";

import { ProductsController } from "../controllers/products-controllers.js";

const ProductsRouter = Router();

ProductsRouter.get("/", ProductsController.getAllProducts);
ProductsRouter.post("/", verifyAccessToken, ProductsController.createProduct);
ProductsRouter.get("/q", ProductsController.getProductByName);
ProductsRouter.get("/:id", ProductsController.getProductById);
ProductsRouter.put("/:id", verifyAccessToken, ProductsController.updateProduct);
ProductsRouter.delete("/:id",verifyAccessToken, ProductsController.deleteProduct);


export default ProductsRouter;