import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';

//componentes
import { ComponentsComponent } from './components.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SedeComponent } from './sede/sede.component';
import { HeaderComponent } from './menu/header/header.component';
import { EstadoPipe } from './pipes/estado.pipe';
import { AprobacionEstadoPipe } from './pipes/aprobacion-estado.pipe';


//servicios
import { LoginService } from 'src/app/login/login.service';
import { ArchivosService } from './services/archivos.service';
import { AuditoriaService } from './services/auditoria.service';
import { ConsultarService } from './services/consultar.service';
import { EntidadesService } from './services/entidades.service';


//librerias 
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ComponentsComponent,
    ClienteComponent, 
    SedeComponent,
    HeaderComponent, 
    EstadoPipe, 
    EstadoPipe,
    AprobacionEstadoPipe,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule
  ],providers: [
    LoginService,
    ArchivosService,
    AuditoriaService,
    ConsultarService,
    EntidadesService
  ]
})
export class ComponentsModule { }
