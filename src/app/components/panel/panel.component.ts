import { Component,ViewChild } from '@angular/core';
import { IEjemplar } from 'src/app/models/IEjemplar';
import { IEjemplarForm } from 'src/app/models/IEjemplarForm';
import { FileUpload } from 'primeng/fileupload';
import { CatalogoService } from '../services/catalogo.service';
import { urlBlobStorage } from 'src/environments/environment';
import { IUserForm } from 'src/app/models/IUserForm';
import { UserService } from '../services/user.service';
import { IUser } from 'src/app/models/IUser';
import { RolesEnum } from 'src/app/models/Rol';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  users:IUser[] = [];
  user = {} as IUserForm;
  displayDialogUser:boolean = false;
  disableVisible:boolean = false;
  userId:number = 0;
  tabAdmin:boolean = false;

  ejemplar = {} as IEjemplarForm;
  ejemplares:IEjemplar[] = [];
  displayDialog:boolean = false;
  azureStorageUrl:string = urlBlobStorage;
  loadingTable:boolean = false;
  ejemplarId:number = 0;

  @ViewChild('imageFileUpload', { static: false }) imageFileUpload?: FileUpload;
  constructor(private catalogoService:CatalogoService, private userService:UserService){
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
    });
    
    if (this.userService.IsRolAdmin(RolesEnum.Admin)) {
      this.tabAdmin = true;
      this.userService.getUsers().subscribe({
        next: data =>{
          this.users = data;
        },
        error:()=>{
          alert('error al cargar usuarios');
        }
      });
    }
    

  }

  onSubmit():void{

    if (this.imageFileUpload?.files.length) {
      this.ejemplar.imagen = this.imageFileUpload.files[0];
    }

    if (this.ejemplarId) {
      this.catalogoService.updateEjemplat(this.ejemplarId,this.ejemplar).subscribe({
        next: data =>{
          var index = this.ejemplares.findIndex(e => e.id == this.ejemplarId);
          if (index != -1) {
            this.ejemplares[index] = data;
          }
          this.ejemplarId = 0;
          this.resetVariables();
          location.reload();
        },
        error: ()=>{
          alert('Error actualizando usuario')
        }
      })
    } else {

      this.catalogoService.addEjemplar(this.ejemplar).subscribe({
        next: data =>{
          this.ejemplares.push(data);
          this.resetVariables();
        },
        error:()=>{
          alert('Error creando usuario');
        }
      });
    }
  }
  displayAdd():void{
    this.resetVariables();
    this.displayDialog = true;
  }
  displayUpdate(ejemplarIn:IEjemplar){
    this.resetVariables();
    this.ejemplarId = ejemplarIn.id;
    this.ejemplar.titulo = ejemplarIn.titulo;
    this.ejemplar.tipoMaterial = ejemplarIn.tipoMaterial;
    this.ejemplar.signatura = ejemplarIn.signatura;
    this.ejemplar.autor = ejemplarIn.autor;
    this.ejemplar.isbn = ejemplarIn.isbn;
    this.ejemplar.linkBusqueda = ejemplarIn.linkBusqueda;
    this.ejemplar.fechaPublicado = ejemplarIn.fechaPublicado.split('T')[0];
    this.displayDialog = true;
  }
  displayDelete(id:number){
    
    this.catalogoService.deleteEjemplar(id).subscribe({
      next: () =>{
        var index = this.ejemplares.findIndex(e => e.id == id);
        if (index != -1) {
          this.ejemplares.splice(index,1);
        }
      },
      error:()=>{
        alert('error al eliminar ejemplar');
      }
    });
  }
  private resetVariables(){
    this.displayDialog = false;
    this.ejemplarId = 0;
    this.ejemplar = {} as IEjemplarForm;
    this.imageFileUpload?.clear();
  }

  onSubmitUser(){
    if (this.userId) {
      this.userService.updateUser(this.userId,this.user).subscribe({
        next: data=>{
          var index = this.users.findIndex(u =>u.id == this.userId);
          if (index != -1) {
            this.users[index] = data;
            console.log(data)
          }
          this.userId = 0;
          this.restUserVariables();
        },
        error:()=>{
          alert('Error actualizando usuario');
        }
      })
    } else {
      this.user.email = this.user.userName + '@unimagdalena.edu.co'
      this.userService.addUser(this.user).subscribe({
        next: data=>{
          this.users.push(data);
          console.log(data)
          this.restUserVariables();
        },
        error:e=>{
          console.log(e)
          alert('Error creando usuario')
        }
      });
    }
  }

  addUser(){
    this.restUserVariables();
    this.displayDialogUser = true;
  }

  updateUser(user:IUser){
    this.userId = user.id;
    this.user.userName = user.userName;
    this.user.email = user.email;
    this.user.state = user.state;
    this.disableVisible = true;
    this.displayDialogUser = true;
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe({
      next:()=>{
        var index = this.users.findIndex(u => u.id == id);
        if (index != -1) {
          this.users.splice(index,1);
        }
      },
      error:()=>{
        alert('Error al eliminar usuario');
      }
    });
  }

  private restUserVariables(){
    this.displayDialogUser = false;
    this.disableVisible = false;
    this.userId = 0;
    this.user = {} as IUser;
  }
  
}
