import { RequestHandler } from "express";
import { productService } from "../services";
import { Product, Status } from "../models";

export const getProductsAsync: RequestHandler = async (_, res, next) => {
  try {
    const response = productService.queryAll();
    res.status(200).json(response.result);
  } catch (err) {
    return next(err);
  }
};

export const createProductAsync: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Product name is required" });
    } else if (!req.body.description) {
      return res.status(400).json({ message: "Product description is required" });
    } else if (!req.body.price) {
      return res.status(400).json({ message: "Product price is required" });
    }

    const product = {
      name: req.body.name,
      description: req.body.description,
      price: Number.parseFloat(req.body.price),
    } satisfies Product;

    const response = productService.create(product);

    if (response.status === Status.Duplicate) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    res.status(200).json({ message: "Product created successfully", product: response.result });
  } catch (err) {
    return next(err);
  }
};

export const updateProductByIdAsync: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.description && !req.body.price) {
      return res.status(400).json({ message: "Product description or price required" });
    }

    console.log(req.params.id);
    const product = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
      price: Number.parseFloat(req.body.price),
    } satisfies Product;

    const response = productService.update(product);

    if (response.status === Status.NotFound) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: response.result });
  } catch (err) {
    return next(err);
  }
};

export const deleteProductByIdAsync: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = productService.deleteById(Number(id));

    if (response.status === Status.NotFound) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return next(err);
  }
};
