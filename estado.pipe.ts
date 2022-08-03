import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: any): any {
    if(value == 1){
      return "ACTIVO"
    }else{
      return "INACTIVO"
    }
  }

}
