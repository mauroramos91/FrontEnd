import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { EntidadesService } from '../services/entidades.service';
import { CitasService } from '../services/citas.service';
import { ServicioService } from '../services/servicio.service';
import { TerapeutaService } from '../services/terapeuta.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { zipAll } from 'rxjs-compat/operator/zipAll';

declare var $: any;
@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  //opcionTable
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<number>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  //variables 
  listServicios;
  listEntidades;
  listTerapeutas;
  listCitas;
  listTipoEntidades;
  form: FormGroup;
  nuevaEntidad = false;

  mi_fecha = new Date();
  dia = (this.mi_fecha.getDate()<10) ? "0" + this.mi_fecha.getDate() : this.mi_fecha.getDate();
  mes = (this.mi_fecha.getMonth()<10) ? "0" + this.mi_fecha.getMonth() : this.mi_fecha.getMonth();

  fechaActual = + this.mi_fecha.getFullYear() + "-" + this.mes + "-" + this.dia;
  

  listEstado = [
    { nombre: "Inactivo", id: '0' },
    { nombre: "Activo", id: '1' }
  ];
  horas = [
    { nombre: "06:00 A.M.", id: '06:00'},
{ nombre: "06:15 A.M.", id: '06:15'},
{ nombre: "06:30 A.M.", id: '06:30'},
{ nombre: "06:45 A.M.", id: '06:45'},
{ nombre: "07:00 A.M.", id: '07:00'},
{ nombre: "07:15 A.M.", id: '07:15'},
{ nombre: "07:30 A.M.", id: '07:30'},
{ nombre: "07:45 A.M.", id: '07:45'},
{ nombre: "08:00 A.M.", id: '08:00'},
{ nombre: "08:15 A.M.", id: '08:15'},
{ nombre: "08:30 A.M.", id: '08:30'},
{ nombre: "08:45 A.M.", id: '08:45'},
{ nombre: "09:00 A.M.", id: '09:00'},
{ nombre: "09:15 A.M.", id: '09:15'},
{ nombre: "09:30 A.M.", id: '09:30'},
{ nombre: "09:45 A.M.", id: '09:45'},
{ nombre: "10:00 A.M.", id: '10:00'},
{ nombre: "10:15 A.M.", id: '10:15'},
{ nombre: "10:30 A.M.", id: '10:30'},
{ nombre: "10:45 A.M.", id: '10:45'},
{ nombre: "11:00 A.M.", id: '11:00'},
{ nombre: "11:15 A.M.", id: '11:15'},
{ nombre: "11:30 A.M.", id: '11:30'},
{ nombre: "11:45 A.M.", id: '11:45'},
{ nombre: "12:00 P.M.", id: '12:00'},
{ nombre: "12:15 P.M.", id: '12:15'},
{ nombre: "12:30 P.M.", id: '12:30'},
{ nombre: "12:45 P.M.", id: '12:45'},
{ nombre: "01:00 P.M.", id: '01:00'},
{ nombre: "01:15 P.M.", id: '01:15'},
{ nombre: "01:30 P.M.", id: '01:30'},
{ nombre: "01:45 P.M.", id: '01:45'},
{ nombre: "02:00 P.M.", id: '02:00'},
{ nombre: "02:15 P.M.", id: '02:15'},
{ nombre: "02:30 P.M.", id: '02:30'},
{ nombre: "02:45 P.M.", id: '02:45'},
{ nombre: "03:00 P.M.", id: '03:00'},
{ nombre: "03:15 P.M.", id: '03:15'},
{ nombre: "03:30 P.M.", id: '03:30'},
{ nombre: "03:45 P.M.", id: '03:45'},
{ nombre: "04:00 P.M.", id: '04:00'},
{ nombre: "04:15 P.M.", id: '04:15'},
{ nombre: "04:30 P.M.", id: '04:30'},
{ nombre: "04:45 P.M.", id: '04:45'},
{ nombre: "05:00 P.M.", id: '05:00'},
{ nombre: "05:15 P.M.", id: '05:15'},
{ nombre: "05:30 P.M.", id: '05:30'},
{ nombre: "05:45 P.M.", id: '05:45'},
{ nombre: "06:00 P.M.", id: '06:00'},
{ nombre: "06:15 P.M.", id: '06:15'},
{ nombre: "06:30 P.M.", id: '06:30'},
{ nombre: "06:45 P.M.", id: '06:4.'}
  ];
  seleccion = [
    {nombre: "No", id:"0"},
    {nombre: "Si", id: "1"}
  ];
  listBancosDestinos;

  constructor(
    private spinner: NgxSpinnerService,
    private EntidadesService_: EntidadesService,
    private CitasService_: CitasService,
    private ServiciosService_: ServicioService,
    private TerapeutasService_: TerapeutaService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.opctionTable();
    this.get();
    this.getServicios();
    this.getTerapeutas();
    //this.getTipoEntidades();
    this.buildForm();
    //this.getBancosDestinos();
  }

  buildForm() {
    this.form = this.fb.group({
      USUA_ID: new FormControl(''),
      SERV_ID: new FormControl(''),
      terapeuta: new FormControl(''),
      FECHA: new FormControl(''),
      HORA: new FormControl('')
    });
  }

  guardar(form) {
    /*
    this.spinner.show();
    if(form.tipoEntidad.idTipoEntidad != '1'){ form.bancosDestinos = []};
    let bancosTemporalArray = [];
    let bancosTemporal = {};

    for (let i in form.bancosDestinos) {
      bancosTemporal = {"idEntidad":form.bancosDestinos[i]}
      bancosTemporalArray.push(bancosTemporal);
    }
    form.bancosDestinos = bancosTemporalArray;
    */
    form.USUA_ID = "1022";
    console.log("form; ", form)
    if (this.nuevaEntidad) {
        this.save(form);
    } else {
        this.update(form);
    }
  }


  abrirModal(tipoModal, entidad) {
    if (tipoModal == 'edicion') {
      this.cargarDatosForm(entidad);
    } else {
      this.nuevaEntidad = true;
    }
  }

  cerrarModal() {
    this.form.reset({});
    this.nuevaEntidad = false;
    this.habilitarBancosDestinos = false;
  }

  cargarDatosForm(datos) {
    //se iguala al arreglo de bancos seleccionados para la entidad + los disponibles.
    let listBancos = this.transformarArreglo(datos.bancosDestinos); // se transforma el arreglo en un formato compatible con el select

    this.form.get('idEntidad').setValue(datos.idEntidad);
    this.form.get('codigo').setValue(datos.codigo);
    this.form.get('nombre').setValue(datos.nombre);
    this.form.get('estado').setValue(datos.estado);
    this.form.get('tipoEntidad').setValue(datos.tipoEntidad);
    this.form.get('bancosDestinos').setValue(listBancos); 
    this.form.get('judicial').setValue(datos.judicial);
    this.change();
  }

  transformarArreglo(listaBancosDentino){
    let arreglo = [];
    listaBancosDentino.forEach(element => {
      arreglo.push(element.idEntidad)
      this.listBancosDestinos.push(element);
    });

    return arreglo;
  }

  habilitarBancosDestinos: boolean = false;
  change() {
    if (this.form.value.tipoEntidad != null || this.form.value.tipoEntidad != undefined) {
      if (this.form.value.tipoEntidad.idTipoEntidad == '1') {
        this.habilitarBancosDestinos = true;
      } else {
        this.habilitarBancosDestinos = false;
      }
    }

  }

  //opciones  tabla
  opctionTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      language: {
        paginate: {
          first: '«',
          previous: '‹',
          next: '›',
          last: '»'
        },
        "lengthMenu": "Mostrar _MENU_  registros por pagina",
        "zeroRecords": "Lo sentimos, no se encontraron registros",
        "info": "Mostrando _PAGE_ pagina de _PAGES_",
        "infoEmpty": "No se encontraron registros",
        "infoFiltered": "(se filtraron _MAX_ registros)",
        "search": "Buscar:",
        "processing": "Cargando...",
      }
    }
  }

  //actualizacion de tabla
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.get();
    });
  }

  statusOK() {
    $('#exampleModal').modal('hide');
    this.form.reset({});
    this.nuevaEntidad = false;
  }

  //servicios

  get() {
    this.spinner.show();
    this.CitasService_.get().subscribe(data => {
      this.listCitas = data;
      //this.dtTrigger.next();
      this.spinner.hide();
    }, error => {
      console.log(error)
      this.listCitas = [];
      setTimeout(() => this.toastr.error('Ocurrio un error, contacte al administrador'));
      this.spinner.hide();
    })
  }

  getServicios() {
    this.spinner.show();
    this.ServiciosService_.get().subscribe(data => {
      this.listServicios = data;
      //this.dtTrigger.next();
      this.spinner.hide();
    }, error => {
      console.log(error)
      this.listServicios = [];
      setTimeout(() => this.toastr.error('Ocurrio un error, contacte al administrador'));
      this.spinner.hide();
    })
  }

  getTerapeutas() {
    this.spinner.show();
    this.TerapeutasService_.get().subscribe(data => {
      this.listTerapeutas = data;
      console.log (this.listTerapeutas);
      //this.dtTrigger.next();
      this.spinner.hide();
    }, error => {
      console.log(error)
      this.listTerapeutas = [];
      setTimeout(() => this.toastr.error('Ocurrio un error, contacte al administrador'));
      this.spinner.hide();
    })
    
  }

  getTipoEntidades() {
    this.EntidadesService_.getTipoEntidades().subscribe(data => {
      this.listTipoEntidades = data;
    }, error => {
      console.log(error)
      this.listTipoEntidades = [];
      setTimeout(() => this.toastr.error('Ocurrio un error, contacte al administrador'));
    })
  }

  save(cita) {
    let res;
    this.CitasService_.create(cita).subscribe(data => {
      res = data;
      if (res.resultado == "exitoso") {
        setTimeout(() => this.toastr.success('Se ha guardado exitosamente'));
        this.statusOK();
        this.rerender();
      }
      this.spinner.hide();
    }, error => {
      console.log(error);
      this.spinner.hide();
      setTimeout(() => this.toastr.error('Ocurrio un error al guardar, contacte al administrador'));
    })
  }

  update(entidad) {
    let res;
    this.EntidadesService_.update(entidad).subscribe(data => {
      this.spinner.hide();
      res = data;
      if (res.status == "OK") {
        setTimeout(() => this.toastr.success('Se ha actualizado exitosamente'));
        this.statusOK();
        this.rerender();
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
      setTimeout(() => this.toastr.error('Ocurrio un error al actualizar, contacte al administrador'));
    })
  }


  getBancosDestinos() {
    this.EntidadesService_.getBancosDestinos().subscribe(data => {
      this.listBancosDestinos = data;
    }, error => {
      console.log(error)
      this.listBancosDestinos = [];
      setTimeout(() => this.toastr.error('Ocurrio un error obteniendo los bancos, contacte al administrador'));
    })
  }

}
