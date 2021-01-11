import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private mainData: MainService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
          setHeaders: {
            id: `${this.mainData.uid}`
          }
        });
        
        return next.handle(request);
      }
}