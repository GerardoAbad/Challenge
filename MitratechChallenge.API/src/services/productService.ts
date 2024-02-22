import { Product, ProductServiceResult, Status } from "../models";
import { productRepository } from "../repositories";

export const queryAll = () => {
  // additional business logic goes here
  const result = productRepository.queryProducts();
  return {
    status: Status.Ok,
    result,
  } satisfies ProductServiceResult<Product[]>;
};

export const create = (newProduct: Product) => {
  let product = productRepository.queryProductByName(newProduct.name);
  if (product > 0) {
    return {
      status: Status.Duplicate,
    } satisfies ProductServiceResult<undefined>;
  }

  const result = productRepository.createProduct(newProduct);

  return {
    status: Status.Ok,
    result,
  } satisfies ProductServiceResult<Product>;
};

export const update = (updatedProduct: Product) => {
  let product = productRepository.queryProductById(updatedProduct.id!);

  if (product === undefined) {
    return {
      status: Status.NotFound,
    } satisfies ProductServiceResult<undefined>;
  }

  const result = productRepository.updateProduct(updatedProduct);

  return {
    status: Status.Ok,
    result,
  } satisfies ProductServiceResult<Product>;
};

export const deleteById = (id: number) => {
  console.log(id);
  let product = productRepository.queryProductById(id);
  console.log(product);

  if (product === undefined) {
    return {
      status: Status.NotFound,
    } satisfies ProductServiceResult<undefined>;
  }

  const result = productRepository.deleteProductById(id);

  return {
    status: Status.Ok,
    result,
  } satisfies ProductServiceResult<boolean>;
};
