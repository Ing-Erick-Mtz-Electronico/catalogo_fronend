import { Component,ViewChild } from '@angular/core';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { IEjemplarForm } from 'src/app/models/IEjemplarForm';
import { IEjemplares } from 'src/app/models/IEjemplares';
import { FileUpload } from 'primeng/fileupload';
import { CatalogoService } from '../services/catalogo.service';
import { urlBlobStorage } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  ejemplar = {} as IEjemplarForm;
  ejemplares:IEjemplar[] = [];
  displayDialog:boolean = true;
  azureStorageUrl:string = urlBlobStorage;
  loadingTable:boolean = false;

  @ViewChild('imageFileUpload', { static: false }) imageFileUpload?: FileUpload;
  constructor(private catalogoService:CatalogoService){
  }

  ngOnInit():void{
    this.loadingTable = true;
    this.catalogoService.getEjemplares().subscribe({
      next: data =>{
        this.ejemplares = data;
        this.loadingTable = false;
      },
      error: ()=>{
        this.loadingTable = false;
      }
    })
  }

  onSubmit():void{
    
    if (this.imageFileUpload?.files.length) {
      this.ejemplar.imagen = this.imageFileUpload?.files[0];
    }
    this.catalogoService.addEjemplar(this.ejemplar).subscribe({
      next: data =>{
        this.ejemplares.push(data);
        this.resetVariables();
      },
      error:()=>{
        alert('error');
      }
    });
    
  }

  private resetVariables(){
    this.displayDialog = false;
    this.ejemplar = {} as IEjemplarForm;
    this.imageFileUpload?.clear();
  }
  
}
