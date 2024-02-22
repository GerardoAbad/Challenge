import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from './products.service';
import { Product } from './product';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Product[]>();

  selectedProduct: Product = {
    name: '',
    description: '',
    price: '' as unknown as number,
  };
  addProduct = false;
  loading = false;
  succeeded = false;
  errorMessage = '';

  constructor(
    public productService: ProductsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.refresh();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  preventDecimal(event: KeyboardEvent) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (digits.includes(event.key)) {
      // 0-9 only
      const values = (event.target as HTMLInputElement).value.split('.');
      if (values[1]) {
        if (values[1].length > 1) {
          return false;
        }
      }
    }
    return true;
  }

  handleOnPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedValue = Number(clipboardData?.getData('text'));
    const formattedValue = Math.trunc(pastedValue * 100) / 100;
    this.selectedProduct.price = formattedValue;
  }

  async refresh() {
    this.loading = true;
    const data = await this.productService.getProducts();
    this.dataSource.data = data;
    this.loading = false;
  }

  showAddProduct() {
    this.addProduct = true;
  }

  async updateProduct() {
    try {
      if (this.selectedProduct.id !== undefined) {
        const result = await this.productService.updateProduct(
          this.selectedProduct
        );
        console.log(result);
      } else {
        const result = await this.productService.createProduct(
          this.selectedProduct
        );
        console.log(result);
        this.addProduct = false;
      }
      this.openSnackBar(
        `Product ${
          this.selectedProduct.id !== undefined ? 'updated' : 'created'
        }!`
      );
      this.selectedProduct = {
        name: '',
        description: '',
        price: '' as unknown as number,
      };

      await this.refresh();
    } catch (ex) {
      this.openSnackBar((ex as HttpErrorResponse).error.message);
    }
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
  }

  clearProduct() {
    this.selectedProduct = {
      name: '',
      description: '',
      price: '' as unknown as number,
    };
    this.addProduct = false;
  }

  async deleteProduct(product: Product) {
    this.loading = true;
    if (
      confirm(
        `Are you sure you want to delete the product ${product.name}. This cannot be undone.`
      )
    ) {
      await this.productService.deleteProduct(product.id!);
    }
    await this.refresh();
  }
}
