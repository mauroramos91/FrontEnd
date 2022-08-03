import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aprobacionEstado'
})
export class AprobacionEstadoPipe implements PipeTransform {

  transform(value: any): any {
    if(value == 1){
      return "APROBADO"
    }else if(value == 0 && value != ''){
      return "RECHAZADO"
    }
  }

}
