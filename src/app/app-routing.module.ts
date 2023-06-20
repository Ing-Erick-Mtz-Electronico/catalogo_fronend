import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LogimComponent } from './components/logim/logim.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  {path:'',component:CatalogComponent},
  {path:'login',component:LogimComponent},
  {path:'panel',component:PanelComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
