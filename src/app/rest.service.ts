import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'http://localhost:8080/myapp/pacientes/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAllPacientes(): Observable<any> {
    console.log("Service GetAll");
    return this.http.get(this.endpoint).pipe(map(this.extractData));
  }
  getPaciente(id): Observable<any> {
    return this.http.get(this.endpoint+id).pipe(map(this.extractData));
  }
  addPaciente (paciente): Observable<any> {
    console.log(paciente);
    return this.http.post<any>(this.endpoint, JSON.stringify(paciente), this.httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${paciente.fName}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  updatePaciente (id, paciente): Observable<any> {
    return this.http.put(this.endpoint + id,JSON.stringify(paciente), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  deletePaciente (id): Observable<any> {
    return this.http.delete<any>(this.endpoint + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
