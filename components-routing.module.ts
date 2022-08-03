import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SedeComponent } from './sede/sede.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      { path: 'cliente', component: ClienteComponent,canActivate: [] },
      { path: 'sede', component: SedeComponent,canActivate: [] },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
