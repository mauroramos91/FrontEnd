import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mensaje;
  listCajasCompensacion;
  administrador;
  codigo;
  idCaja;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private LoginService_: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildForm();
    //this.getCajasCompensacion();
    //this.loginForm.get('idCaja').valueChanges.subscribe(data=>{
    //  this.codigo = data.codigo;
    //  this.idCaja = data.idCaja;
    //})

  }

  getCajasCompensacion(){
    this.LoginService_.getCajasCompensacion().subscribe(data=>{
      this.listCajasCompensacion = data;
    }, error=>{
      console.log(error);
    })
  }

  //validaciones del formulario
  buildForm() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      idCaja:  ['', Validators.compose([Validators.required])]
    });
  }

  login(form) {
    form.value.idCaja = this.idCaja;
    this.spinner.show();
    let resp;

    this.LoginService_.login(form.value.usuario,form.value.pass).subscribe(data => {
        resp = data;


        if(resp.Estado == 'Ok'){
          this.correctLogin(resp);
        }else{
          this.IncorretLogin(resp);
        }
    }, (error) => {
      console.log(error);
      this.spinner.hide();
      setTimeout(() => this.toastr.error('Ocurrio un error, intente nuevamente'));
    })

  }

  correctLogin(datosLogin) {
    //datosLogin.idCaja = this.idCaja;
    //datosLogin.codigo = this.codigo;
    this.LoginService_.setCurrentSession(datosLogin);
    let perfil = datosLogin.Mensaje;
    this.validarPrimeraPantalla(true);
  }

  IncorretLogin(resp) {
    this.spinner.hide();
    if(resp.token != null && resp.usuarioInfo != null && resp.admin == null){
      setTimeout(() => this.toastr.error('No tiene perfil autorizado para ingresar a la aplicación.'));
    }else if(resp.token == null && resp.usuarioInfo == null && resp.admin == null){
      setTimeout(() => this.toastr.error('Usuario y/o contraseña incorrecta'));
    }
  }

  validarPrimeraPantalla(perfil) {
    if (perfil) {
      this.spinner.hide();
      this.router.navigate(['/CitasApp/cliente']);
    } else {
      this.spinner.hide();
       this.router.navigate(['/CitasApp/consultar']);
    }
  }



}
