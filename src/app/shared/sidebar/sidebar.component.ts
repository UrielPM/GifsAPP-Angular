import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  //para inyectar el servicio  del historial en el sidebar 
get historial(){

  return this.gifsService.historial;
}

  constructor(private gifsService: GifsService) { }
//para mostar las imagnes cuando das click en el sidebar
  buscar (termino: string){
    this.gifsService.buscarGifs(termino );
  }

}
