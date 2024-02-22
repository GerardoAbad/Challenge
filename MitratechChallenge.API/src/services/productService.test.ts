import { productService } from ".";
import { productRepository } from "../repositories";
jest.mock("../repositories");

const mockedFoo = jest.mocked(productRepository);

describe("Product Service", () => {
  it("should fetch products", () => {
    //Arrange
    const values = [
      {
        id: 1,
        name: "Product 1",
        description: "Product 1 description",
        price: 1,
      },
      {
        id: 2,
        name: "Product 2",
        description: "Product 2 description",
        price: 2,
      },
    ];

    mockedFoo.queryProducts.mockReturnValue(values);

    //Act
    const serviceResponse = productService.queryAll();

    //Assert
    expect(serviceResponse.result).toEqual(values);
  });
});
