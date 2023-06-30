import { Component, OnInit } from '@angular/core';
import { IEjemplares } from 'src/app/models/IEjemplares';
import { CatalogoService } from '../services/catalogo.service';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { urlBlobStorage } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  ejemplares:IEjemplar[] = [];
  ejemplaresCarrousel:IEjemplar[] = [];
  azureStorageUrl:string = urlBlobStorage;

  responsiveOptions:any[] =[{breakpoint:'600px',numVisible:1,numScroll:1}]

  constructor(private catalogoService:CatalogoService){}

  ngOnInit(){
    
    // this.catalogoService.getEjemplar('990000354150107076').subscribe({
    //   next:data=>{
    //     console.log(data)
    //   },
    //   error:()=>{

    //   }
    // })
    this.catalogoService.getEjemplares().subscribe({
      next: data=>{
        this.ejemplares = data;
        this.ejemplaresCarrousel = this.catalogoService.getRecient(data);
        
      },
      error:()=>{
        alert('Error al cargar los ejemplares')
      }
    });
  }
}
