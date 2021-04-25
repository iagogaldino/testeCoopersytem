import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceAppService {


  private url = 'https://api.github.com/'; // api rest // users/iagogaldino/repos
  // Headers
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  dirApi(dir: string) {
    return this.url + dir;
  }

  // Obtem todos os repositórios publicos
  getRepoUser(userName: string): Observable<any> {
    return this.httpClient.get<any>(this.dirApi('users/'+userName+'/repos'))
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  // Obtem todo o perfil do usuário
  getUser(userNameRepo: string): Observable<any> {
    return this.httpClient.get<any>(this.dirApi('users/' + userNameRepo))
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action);
  }



  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }
}



