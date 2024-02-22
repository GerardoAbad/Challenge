import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from './product';
import { __values } from 'tslib';

describe('ProductsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [ProductsService],
    })
  );

  it('should be created', () => {
    const service: ProductsService = TestBed.inject(ProductsService);
    expect(service).toBeTruthy();
  });

  it('should get products', inject(
    [HttpTestingController, ProductsService],
    async (
      httpMock: HttpTestingController,
      productsService: ProductsService
    ) => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Product 1 description',
          price: 1,
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Product 2 description',
          price: 2,
        },
      ];

      productsService.getProducts().then((products) => {
        expect(products.length).toBe(2);
        expect(products).toEqual(mockProducts);
      });

      const mockReq = httpMock.expectOne(productsService.baseUrl + '/products');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockProducts);
      httpMock.verify();
    }
  ));

  it('should update product', inject(
    [HttpTestingController, ProductsService],
    async (
      httpMock: HttpTestingController,
      productsService: ProductsService
    ) => {
      const mockProduct: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 1,
      };

      productsService.updateProduct(mockProduct).then((product) => {
        expect(product).toEqual(mockProduct);
      });

      const mockReq = httpMock.expectOne(
        productsService.baseUrl + '/products/' + mockProduct.id
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockProduct);

      httpMock.verify();
    }
  ));
});
