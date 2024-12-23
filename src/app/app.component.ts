import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public profile!: any;
  constructor(public kc:KeycloakService) {}
  
  ngOnInit(): void {
    console.log("logged");
    console.log(this.kc.isLoggedIn());
    
    if(this.kc.isLoggedIn()) {
      console.log("logged in");
      
      this.kc.loadUserProfile().then((profile:KeycloakProfile) => {
        this.profile = profile;
      });
    }}
  
  

handleLogout() {
   this.kc.logout(window.location.origin);
}
async handleLogin() {
 await this.kc.login({
    redirectUri: window.location.origin
 });
}
  title = 'ecom-app-angular';
}
