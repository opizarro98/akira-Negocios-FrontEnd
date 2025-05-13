import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RoleDTO } from "./roledto";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    api: string;
    constructor(private http: HttpClient) {
        this.api = environment.SERVICE +
            "roleRest/";
    }

    createRole(role: RoleDTO): Observable<any> {

        return this.http.post<any>(`${this.api}createNewRole`, role).pipe(
            tap((response) => {
            }),
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