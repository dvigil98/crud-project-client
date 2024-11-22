import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrl: './category-show.component.css'
})
export class CategoryShowComponent implements OnInit {

  category: Category = {};

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getCategory(Number(id));
  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe({
      next: (r) => {
        this.category = r.data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
