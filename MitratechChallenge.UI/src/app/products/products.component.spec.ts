import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show add product form state', () => {
    const elements: HTMLElement = fixture.nativeElement;
    const addButton = elements.querySelector('#addProduct');
    let addProductForm = elements.querySelector('#addProductForm');
    expect(addProductForm).toBeNull();
    addButton?.dispatchEvent(new Event('click'));
    expect(component.addProduct).toBeTrue();
    addProductForm = elements.querySelector('#addProductForm');
    expect(addProductForm).toBeDefined();
  });
});
