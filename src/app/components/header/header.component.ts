import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  constructor(public userService: UserService, private routeaux: Router) { }

  ngOnInit(): void {
    this.isLogged = this.userService.IsLogged();
  }

  CloseSession() :void {
    this.userService.RemoveToken();
    this.routeaux.navigate(['/login']);
  }

}
