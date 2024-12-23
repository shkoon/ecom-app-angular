import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8087/api/products").subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }
}