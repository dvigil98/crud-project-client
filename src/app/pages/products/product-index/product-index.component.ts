import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrl: './product-index.component.css'
})
export class ProductIndexComponent implements OnInit {

  p: number = 1;
  products: Product[] = [];

  searchBy: any[] = [
    { value: 'products.code', text: 'Código' },
    { value: 'products.name', text: 'Nombre' },
    { value: 'categories.name', text: 'Categoría' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (r) => {
        this.products = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deleteProduct(id?: number): void {
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
        this.productService.deleteProduct(Number(id)).subscribe({
          next: (r) => {

            this.getProducts();

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

  searchProducts(searchData: any): void {
    this.productService.searchProducts(searchData.critery, searchData.value).subscribe({
      next: (r) => {
        this.products = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  clear(): void {
    this.getProducts();
  }
}
