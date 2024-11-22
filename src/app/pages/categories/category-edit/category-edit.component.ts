import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  category: Category = {};

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getCategory(Number(id));
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe({
      next: (r) => {
        this.category = r.data;
        this.form.patchValue(this.category);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updateCategory(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.category = {
        id: this.category.id,
        name: this.form.value.name,
        description: this.form.value.description
      };

      this.categoryService.updateCategory(this.category, Number(this.category.id)).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

          Swal.fire({
            title: '¡Exito!',
            text: 'Datos actualizados',
            icon: 'success'
          });

          this.router.navigate(['/admin/categories']);
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
  get requiredName(): boolean {
    return (this.form.get('name')?.errors?.['required'] && this.submitted) || (this.form.get('name')?.errors?.['required'] && this.form.get('name')?.dirty);
  }

  get requiredDescription(): boolean {
    return (this.form.get('description')?.errors?.['required'] && this.submitted) || (this.form.get('description')?.errors?.['required'] && this.form.get('description')?.dirty);
  }
}
