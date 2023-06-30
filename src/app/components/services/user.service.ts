import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl,urls } from 'src/environments/environment';
import { ILogin } from 'src/app/models/ILogin';
import { IToken } from 'src/app/models/IToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/models/IUser';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { IUserForm } from 'src/app/models/IUserForm';

@Injectable({
    providedIn:'root'
})

export class UserService{
    constructor(private http:HttpClient, private jwtHelper:JwtHelperService){}

    public login(user:ILogin):Observable<IToken>{
        return this.http.post<IToken>(`${baseUrl}${urls.Login}`,user)
    }

    public getUsers():Observable<IUser[]>{
        return this.http.get<IUser[]>(`${baseUrl}${urls.GetUsers}`)
    }

    public addUser(user:IUserForm):Observable<IUser>{
        return this.http.post<IUser>(`${baseUrl}${urls.CreateUser}`,user);
    }

    public updateUser(id:number,user:IUserForm):Observable<IUser>{
        return this.http.put<IUser>(`${baseUrl}${urls.UpdateUser}${id}`,user);
    }

    public deleteUser(id:number){
        return this.http.delete(`${baseUrl}${urls.DeleteUser}${id}`);
    }

    public setToken(token:IToken):void{
        localStorage.setItem("token", token.token);
    }

    public RemoveToken(): void {
        localStorage.removeItem("token");
    }

    public IsRol(roles: string){
        const rolesArray = roles.split(",");
        const rolesToken = this.getInfoToken()?.State.split(",");
        if(rolesToken){

            const roles = rolesToken.filter((rol: string)=> rolesArray.includes(rol));
            if(roles.length){
                return true;
            }
        }

        return false;
    }

    public IsRolAdmin(rolIn: number){
        
        const rolToken = this.getInfoToken()?.State;
        if(rolToken){
            if (rolToken == rolIn) {
                return true;
            }
          
        }
    
        return false;
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