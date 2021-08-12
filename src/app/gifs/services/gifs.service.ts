import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Nov7K8D98vKGuCrrIiBAnJUPATkQi1Jp';
  private servicioUrl: string = '  https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){

    return [...this._historial];
  }

    //hacer una peticion http a la api
    constructor(private http: HttpClient){

      //para cagar la informacion del localstorage
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    //  if( localStorage.getItem('historial')){
      //  this._historial = JSON.parse( localStorage.getItem('historial')!);
      //}


    }


  buscarGifs(query: string = ''){
//para almacenar todo en minusculas
query = query.trim().toLocaleLowerCase();

    //para no insertar datos repetidos
    if( !this._historial.includes(query) ) {
      this._historial.unshift( query);
          //Validar que solo aparezca los ultimos 10
    this._historial = this._historial.splice(0,10);

    //para grabar en el local storage
    localStorage.setItem('historial', JSON.stringify( this._historial) );

   
    }
  

    //para usar la peticion 

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','10')
    .set('q', query);

   // console.log(params.toString());
    
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, {params})
    .subscribe( (resp ) => {
      //console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      
    });
    
  }
}
