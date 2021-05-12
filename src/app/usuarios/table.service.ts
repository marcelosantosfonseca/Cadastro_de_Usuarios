import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from './user';



@Injectable({
    providedIn: 'root'
})

export class TableService { 

    private usuariosUrl: string = 'http://localhost:600/usuarios/';

    constructor(private httpClient: HttpClient) { }

    // Headers
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }


    // Buscar todos os usuarios 
    getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.usuariosUrl)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
    }
   

    // Buscar um user pelo id
    getById(id: number): Observable<User> { 
        return this.httpClient.get<User>(this.usuariosUrl + id)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
    }


    // Autualiza um user pelo id
    updateById(user: User): Observable<User> {
        return this.httpClient.put<User>(this.usuariosUrl + user.id, JSON.stringify(user), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }


    // Salva um novo user
    saveNewUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.usuariosUrl, JSON.stringify(user), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
    }


    // Deletar um user pelo id
    deleteById(id: number): Observable<any> {
        //return this.httpClient.delete<any>(`${this.usuariosUrl}/${'id'}`);
        return this.httpClient.delete<any>(this.usuariosUrl + id)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
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
}    