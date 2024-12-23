import { NgFor } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  public orders: any;

  constructor(private http: HttpClient,private route:Router) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8088/api/orders").subscribe({
      next: (data: any) => {
        this.orders = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }

  getOrderDetails(id:number) {
    this.route.navigateByUrl(`/order-details/${id}`);
}}
