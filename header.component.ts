import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../../../login/login.service';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header_.components.css']
})
export class HeaderComponent implements OnInit {

    public pushRightClass: string;
    accesos;
    nombreUsuario;
    perfilAdmi;
    img = "assets/img/";

    constructor(private LoginService_: LoginService, public router: Router) {
        this.getUser();
        this.accesos = this.LoginService_.loadSessionData();
        if(this.accesos.usuarioInfo != null){
            this.nombreUsuario = this.accesos.usuarioInfo.name;
        }

        this.img = this.img +  this.accesos.codigo + ".png";
    }

    //OBTENER USUARIO
    user;
    getUser() {
        let accesos = this.LoginService_.loadSessionData();
        this.perfilAdmi = accesos.admin;
        this.perfilAdmi = true;
        this.nombreUsuario = "Usuario"
    }


    ngOnInit() {

    }

    logout() {
        this.LoginService_.removeCurrentSession();
        this.router.navigate(['/login']);
    }

    tamano = false;
    cerrarMenu() {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        this.tamano = false;

        if ($(".sidebar").hasClass("toggled")) {
            this.tamano = true;
        };

    }



}
