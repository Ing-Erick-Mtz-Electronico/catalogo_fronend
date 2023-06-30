import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl, urlAnonymous } from 'src/environments/environment';
import { UserService } from "../services/user.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
    constructor(private jwtHelper: JwtHelperService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = this.getUrl(req.url);
        if(urlAnonymous.indexOf(url) != -1){
            return next.handle(req); 
        }
        
        const request = req.clone({
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${this.jwtHelper.tokenGetter()}`
              })
        });
        
        return next.handle(request); 
            
    }

    private getUrl(url: string) : string {
        const realName = url.replace(`${baseUrl}`,'');
        return realName; 
    }
}