import { Router } from "express";
import { createProductAsync, deleteProductByIdAsync, getProductsAsync, updateProductByIdAsync } from "../controllers";

export const productRoutes: Router = Router();

productRoutes.get("/products", getProductsAsync);

productRoutes.post("/products", createProductAsync);

productRoutes.put("/products/:id", updateProductByIdAsync);

productRoutes.delete("/products/:id", deleteProductByIdAsync);
