import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  category?: Category;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  saveCategory(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.category = {
        id: 0,
        name: this.form.value.name,
        description: this.form.value.description
      };

      this.categoryService.saveCategory(this.category).subscribe({
        next: (r) => {

          this.submitted = false;
          this.form.reset();

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
  get requiredName(): boolean {
    return (this.form.get('name')?.errors?.['required'] && this.submitted) || (this.form.get('name')?.errors?.['required'] && this.form.get('name')?.dirty);
  }

  get requiredDescription(): boolean {
    return (this.form.get('description')?.errors?.['required'] && this.submitted) || (this.form.get('description')?.errors?.['required'] && this.form.get('description')?.dirty);
  }
}
