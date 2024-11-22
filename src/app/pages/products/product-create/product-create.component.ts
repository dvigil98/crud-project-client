import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  product?: Product;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.getCategories();
  }

  initForm(): FormGroup {
    return this.fb.group({
      category_id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      purchase_price: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (r) => {
        this.categories = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  saveProduct(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.product = {
        id: 0,
        category_id: this.form.value.category_id,
        code: this.form.value.code,
        name: this.form.value.name,
        description: this.form.value.description,
        purchase_price: this.form.value.purchase_price,
        sale_price: this.form.value.sale_price,
      };

      this.productService.saveProduct(this.product).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();
          this.form.get('category_id')?.setValue("");

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos guardados',
            icon: 'success'
          });

        },
        error: (e) => {
          console.log(e);

          Swal.fire({
            title: '¡Oops!',
            text: 'Datos no guardados',
            icon: 'error'
          });

        }
      });

    } else {

      Swal.fire({
        title: "¡Oops!",
        text: "Llene los campos requeridos",
        icon: "error"
      });

    }
  }

  //
  get requiredCategoryId(): boolean {
    return (this.form.get('category_id')?.errors?.['required'] && this.submitted) || (this.form.get('category_id')?.errors?.['required'] && this.form.get('category_id')?.dirty);
  }

  get requiredCode(): boolean {
    return (this.form.get('code')?.errors?.['required'] && this.submitted) || (this.form.get('code')?.errors?.['required'] && this.form.get('code')?.dirty);
  }

  get requiredName(): boolean {
    return (this.form.get('name')?.errors?.['required'] && this.submitted) || (this.form.get('name')?.errors?.['required'] && this.form.get('name')?.dirty);
  }

  get requiredDescription(): boolean {
    return (this.form.get('description')?.errors?.['required'] && this.submitted) || (this.form.get('description')?.errors?.['required'] && this.form.get('description')?.dirty);
  }

  get requiredPurchasePrice(): boolean {
    return (this.form.get('purchase_price')?.errors?.['required'] && this.submitted) || (this.form.get('purchase_price')?.errors?.['required'] && this.form.get('purchase_price')?.dirty);
  }

  get requiredSalePrice(): boolean {
    return (this.form.get('sale_price')?.errors?.['required'] && this.submitted) || (this.form.get('sale_price')?.errors?.['required'] && this.form.get('sale_price')?.dirty);
  }
}
