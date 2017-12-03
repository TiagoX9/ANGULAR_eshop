import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$; // $ indicates it´s an Observable
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, // private doesn´t allow to use this outside this component
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => this.product = p); // gets the item from data base to edit
    }
  }

  save(product) {  // saves for to Firebase
    if(this.id) {
      this.productService.update(this.id, product); // edit and update the product
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);  // after save or edit navigates the user to products page
  }

  delete() {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']); // after delete navigates the user to products page
    }
  }

  ngOnInit() {
  }

}
