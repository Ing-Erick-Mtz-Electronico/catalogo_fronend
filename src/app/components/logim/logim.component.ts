import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ILogin';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-logim',
  templateUrl: './logim.component.html',
  styleUrls: ['./logim.component.css']
})
export class LogimComponent {
  user = {} as ILogin
  error: string = "";
  constructor(private userService:UserService, private routeaux:Router){}

  login(loginForm:any) : void{
    this.error = "";
    if(loginForm.valid){
      this.userService.login(this.user).subscribe({
        next: data=>{
          this.userService.setToken(data);
          this.routeaux.navigate(['panel']);
        },
        error: error=>{
          if (error.error.errorDetail) {
            this.error = error.error.errorDetail;
          }
        }
      })
    }
  }
}
