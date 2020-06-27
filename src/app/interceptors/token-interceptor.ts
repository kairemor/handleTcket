import { Injectable } from '@angular/core';
import {
   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
 } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   constructor(private authService: AuthenticationService) {}
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const userToken = this.authService.getToken();
      if (userToken) {
         console.log(userToken);
         const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + userToken)
         });
         return next.handle(cloned);
      } else {
         return next.handle(req);
      }
   }

}
