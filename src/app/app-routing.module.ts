import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LogimComponent } from './components/logim/logim.component';
import { PanelComponent } from './components/panel/panel.component';
import { AuthGuard } from './components/services/auth.guard';
import { RolesEnum } from './models/Rol';

const routes: Routes = [
  {path:'',component:CatalogComponent},
  {path:'login',
    component:LogimComponent, 
    },
  {path:'panel',
    component:PanelComponent,
    canActivate: [AuthGuard],
    data: {
      rols: `${RolesEnum.Admin},${RolesEnum.Operador}`
    }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
