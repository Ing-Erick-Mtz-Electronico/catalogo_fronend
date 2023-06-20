import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl,urls } from 'src/environments/environment';
import { ILogin } from 'src/app/models/ILogin';
import { IToken } from 'src/app/models/IToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/models/IUser';
import { IEjemplar } from 'src/app/models/IEjemplar';

@Injectable({
    providedIn:'root'
})

export class UserService{
    constructor(private http:HttpClient, private jwtHelper:JwtHelperService){}

    public login(user:ILogin):Observable<IToken>{
        return this.http.post<IToken>(`${baseUrl}${urls.Login}`,user)
    }

    public setToken(token:IToken):void{
        localStorage.setItem("token", token.token);
    }

    public RemoveToken(): void {
        localStorage.removeItem("token");
    }

    public IsLogged(){
        return (this.getInfoToken()) ? true : false;
    }

    private getInfoToken(){
        if(this.jwtHelper.isTokenExpired()){
            return null;
        }    
        return this.jwtHelper.decodeToken();
    }
}