import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { baseUrl, urlAlma, urls } from 'src/environments/environment';
import { IEjemplares } from 'src/app/models/IEjemplares';
import { IEjemplarForm } from 'src/app/models/IEjemplarForm';

@Injectable({
    providedIn:'root'
})
/*
headers?: HttpHeaders | {
        [header: string]: string | string[];
    } | undefined;
    context?: HttpContext | undefined;
    observe?: "body" | undefined;
    params?: HttpParams | ... 1 more ... | undefined;
    reportProgress?: boolean | undefined;
    responseType?: "json" | undefined; */
export class CatalogoService{

    constructor(private http: HttpClient) { }

    public getEjemplar(id:string){
        let httpOptions = {
            headers: new HttpHeaders({
                'Accept':  '*/*',
                'response-Type': 'text'
            })
        }
        return this.http.get(`${urlAlma.base}${id}${urlAlma.key}`,httpOptions);
    }

    public getEjemplares():Observable<IEjemplar[]>{
        return this.http.get<IEjemplar[]>(`${baseUrl}${urls.GetEjemplares}`);
    }

    public addEjemplar(request:IEjemplarForm):Observable<IEjemplar>{
        const formData:FormData = this.builFormData(request);
        return this.http.post<IEjemplar>(`${baseUrl}${urls.CreateEjemplar}`,formData);
    }

    public updateEjemplat(id:number,request:IEjemplarForm):Observable<IEjemplar>{
        const formData = this.builFormData(request);
        return this.http.put<IEjemplar>(`${baseUrl}${urls.UdateEjemplar}${id}`,formData);
    }

    public deleteEjemplar(id:number){
        return this.http.delete(`${baseUrl}${urls.DeleteEjemplar}${id}`);
    }

    private builFormData(request:any){
        const formData:FormData = new FormData();
        
        for (const key in request) {
            if (request.hasOwnProperty(key)) {
                formData.append(key,request[key])
                console.log(formData.get(key))
            }
        }
        return formData;
    }

    public getRecient(data:IEjemplar[]){
        let day = 1000*24*3600;
        let dataResponse:IEjemplar[] = [];
        let fechaDate = new Date(data[0].fechaPublicado);
        let mayorFecha = fechaDate.getTime();
        let mayorIndex =0;
        for (let index = 0; index < data.length; index++) {
            let fecha = new Date(data[index].fechaPublicado);
            let numberFecha = fecha.getTime();
            if (numberFecha>mayorFecha) {
                mayorFecha = numberFecha;
                mayorIndex = index;
            }
        }
        data.forEach(d=>{
            let fecha = new Date(d.fechaPublicado);
            let numberFecha = fecha.getTime();
            let restaFecha = (mayorFecha-numberFecha)/day;
            if (restaFecha<=30) {
                dataResponse.push(d);
            }
        })
        return dataResponse;
    }
}