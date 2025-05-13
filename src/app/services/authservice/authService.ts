import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterDto } from "./registerdto";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Logindto } from "./logindto";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    api: string;
    constructor(private http: HttpClient) {
        this.api = environment.SERVICE +
            "auth/";
    }

    registreClient(cita: RegisterDto): Observable<any> {

        return this.http.post<any>(`${this.api}register`, cita).pipe(
            tap((response) => {
            }),
            catchError(this.handleError)
        );
    }

    login(credentials: Logindto): Observable<any> {
        return this.http.post<any>(`${this.api}login`, credentials).pipe(
            tap((userData) => {
                //console.log('Login successful:', userData);
            }),
            map((userData) => userData),
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            switch (error.status) {
                case 404:
                    errorMessage = 'Error: Recurso no encontrado';
                    break;
                case 500:
                    errorMessage = 'Error en el servidor, inténtelo más tarde';
                    break;
                default:
                    errorMessage = `Error: ${error.message}`;
            }
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }

}