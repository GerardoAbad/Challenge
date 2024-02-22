import { Product } from "../models";

let products: Product[] = [{ id: 1, name: "Test Product", description: "Product description", price: 25.5 }];

export const queryProducts = () => {
  return products;
};

export const queryProductByName = (productName: string) => {
  return products.findIndex((product) => product.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase()));
};

export const queryProductById = (id: number) => {
  return products.find((product) => product.id == id);
};

export const createProduct = (newProduct: Product) => {
  const maxId = Math.max(...products.map((product) => product.id!));
  newProduct.id = maxId + 1;
  products.push(newProduct);
  return products.find((product) => product.id == maxId)!;
};

export const updateProduct = (updatedProduct: Product) => {
  const objectIndex = products.findIndex((product) => product.id == updatedProduct.id);
  products[objectIndex] = updatedProduct;
  return products[objectIndex];
};

export const deleteProductById = (id: number) => {
  const objectIndex = products.findIndex((product) => product.id == id);
  const removed = products.splice(objectIndex, 1);
  return removed[0]?.id === id;
};
