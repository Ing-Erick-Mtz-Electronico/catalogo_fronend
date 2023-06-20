import { Component, OnInit } from '@angular/core';
import { IEjemplares } from 'src/app/models/IEjemplares';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  ejemplares:IEjemplares[] = [];
  items:any[] = [];
  ngOnInit(){
    for (let index = 0; index < 50; index++) {
      this.items.push(index);
    }
  }
}
