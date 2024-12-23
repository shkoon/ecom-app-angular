import { ApplicationConfig,APP_INITIALIZER,Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Function to initialize Keycloak with the necessary configurations
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>{
    keycloak.init({
      // Configuration details for Keycloak
      config: {
        url: 'http://localhost:8080', // URL of the Keycloak server
        realm: 'sdia-realm', // Realm to be used in Keycloak
        clientId: 'ecom-client-ang' // Client ID for the application in Keycloak
      },
      loadUserProfileAtStartUp:true,
      // Options for Keycloak initialization
      initOptions: {
        onLoad: 'check-sso', // Action to take on load
        silentCheckSsoRedirectUri:
window.location.origin + '/assets/silent-check-sso.html', // URI for silent SSO checks

      },
      // Enables Bearer interceptor
     //enableBearerInterceptor: true,
     // Prefix for the Bearer token
     //bearerPrefix: 'Bearer',
     // URLs excluded from Bearer token addition (empty by default)
     //bearerExcludedUrls: []
    });}
 }
 
 // Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
 };
// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
 }
 
 // Exported configuration for the application

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi()),provideRouter(routes),KeycloakService,KeycloakInitializerProvider,KeycloakBearerInterceptorProvider]
};
