import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrl: './category-index.component.css'
})
export class CategoryIndexComponent implements OnInit {

  p: number = 1;
  categories: Category[] = [];

  searchBy: any[] = [
    { value: 'name', text: 'Nombre' }
  ];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
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

  deleteCategory(id?: number): void {
    Swal.fire({
      title: "¡Advertencia!",
      text: "¿Está seguro de eliminar este registro?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#343a40",
      confirmButtonText: "Eliminar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(Number(id)).subscribe({
          next: (r) => {

            this.getCategories();

            Swal.fire({
              title: '¡Exito!',
              text: 'Datos eliminados',
              icon: 'success'
            });

          },
          error: (e) => {
            console.log(e);

            Swal.fire({
              title: 'Oops!',
              text: 'Datos no eliminados',
              icon: 'error'
            });

          }
        });
      }
    });
  }

  searchCategories(searchData: any): void {
    this.categoryService.searchCategories(searchData.critery, searchData.value).subscribe({
      next: (r) => {
        this.categories = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  clear(): void {
    this.getCategories();
  }
}
