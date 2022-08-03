import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Url } from '../class/url';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private localStorageService:any;
  private currentSession = null;
  baseURL: string;


  constructor(private router: Router,private http: HttpClient) { 
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.baseURL = Url.baseURL;
  }

  login(usuario,pass){  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${this.token}`
    });

    return this.http.post(this.baseURL + `iniciarSesion?usuario=${usuario}&password=${pass}`, { headers });
  }

  getCajasCompensacion(){  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseURL + `parametros/cajas`,  { headers });
  }
  
  //guardar el usuario en el localStorage
  setCurrentSession(session: any): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

//saber si hay registrado un usuario en el localStorage
  loadSessionData(): any{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <any> JSON.parse(sessionStr) : null;
  }

//obtener el usuario dell localStorage
  getCurrentSession(): any {
    return this.currentSession;
  }

//borrar el usuario del localStorage
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

//obtener el usuario
  getCurrentUser(): any {
    var session: any = this.getCurrentSession();
    return (session && session.usuarioInfo) ? session.usuarioInfo : null;
  };

  getCurrentToken(): string {
   var session = this.getCurrentSession();
   return (session && session.token) ? session.token : null;
 };

 //saber si se esta autenticado
  isAuthenticated(): boolean {
     return (this.getCurrentUser() != null) ? true : false;
  };

//cerrar sesion
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  //true si es perfil admin 
  getCurrentPerfil(){
    var session = this.getCurrentSession();
    return (session && session.admin) ? session.admin : null;
  }

  getCurrentCaja(){
    var session = this.getCurrentSession();
    return (session && session.idCaja) ? session.idCaja : null;
  }

  recuperarPass(dominio,username) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(this.baseURL + `seguridad/restaurarPass/${dominio}/${username}`, { headers });
  }

}
