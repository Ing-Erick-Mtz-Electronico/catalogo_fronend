import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { baseUrl, urls } from 'src/environments/environment';
import { IEjemplares } from 'src/app/models/IEjemplares';
import { IEjemplarForm } from 'src/app/models/IEjemplarForm';

@Injectable({
    providedIn:'root'
})

export class CatalogoService{

    constructor(private http: HttpClient) { }

    public getEjemplares():Observable<IEjemplar[]>{
        return this.http.get<IEjemplar[]>(`${baseUrl}${urls.GetEjemplares}`);
    }

    public addEjemplar(request:IEjemplarForm):Observable<IEjemplar>{
        const formData = this.builFormData(request);
        return this.http.post<IEjemplar>(`${baseUrl}${urls.CreateEjemplar}`,formData);
    }

    public updateEjemplat(id:number,request:IEjemplarForm):Observable<IEjemplar>{
        const formData = this.builFormData(request);
        return this.http.post<IEjemplar>(`${baseUrl}${urls.UdateEjemplar}${id}`,formData);
    }

    public deleteEjemplar(id:number):Observable<object>{
        return this.http.delete(`${baseUrl}${urls.DeleteEjemplar}${id}`);
    }

    private builFormData(request:any){
        const formData = new FormData();
        
        for (const key in request) {
            if (request.hasOwnProperty(key)) {
                formData.append(key,request[key])
                console.log(formData.get(key))
            }
        }
        return formData;
    }
}