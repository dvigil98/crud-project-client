import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  product: Product = {};
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getProduct(Number(id));
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

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (r) => {
        this.product = r.data;
        this.product.category_id = this.product.category?.id;
        this.form.patchValue(this.product);
      },
      error: (e) => {
        console.log(e);
      }
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

  updateProduct(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.product = {
        id: this.product.id,
        category_id: this.form.value.category_id,
        code: this.form.value.code,
        name: this.form.value.name,
        description: this.form.value.description,
        purchase_price: this.form.value.purchase_price,
        sale_price: this.form.value.sale_price,
      };

      this.productService.updateProduct(this.product, Number(this.product.id)).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();
          this.form.get('category_id')?.setValue("");

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos actualizados',
            icon: 'success'
          });

          this.router.navigate(['/admin/products']);

        },
        error: (e) => {
          console.log(e);

          Swal.fire({
            title: '¡Oops!',
            text: 'Datos no actualizados',
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
