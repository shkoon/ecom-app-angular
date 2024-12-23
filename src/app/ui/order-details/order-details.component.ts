import { CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor,DatePipe,CurrencyPipe,NgIf],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  private id:any;
  public order:any;

  constructor(private http:HttpClient,private route:ActivatedRoute) {
      this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:8088/api/orders/${this.id}`).subscribe({
      next: (data: any) => {
        this.order = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
  }

});}

getTotal(order: any): number {
  let totale:number=0;
  order.productItems.forEach((item: any) => {
    totale += item.price * item.quantity;
  });
  return totale;
}}
