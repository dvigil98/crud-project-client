import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrl: './product-show.component.css'
})
export class ProductShowComponent implements OnInit {

  product: Product = {};

  constructor(
    private productServie: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getProduct(Number(id));
  }

  getProduct(id: number): void {
    this.productServie.getProduct(id).subscribe({
      next: (r) => {
        this.product = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
