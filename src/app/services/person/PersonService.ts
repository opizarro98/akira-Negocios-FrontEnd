import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { environment } from "src/ environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    api: string;
    constructor(private http: HttpClient) {
        this.api = environment.SERVICE +
            "personRest/";
    }

    // Busca una persona por su identificacion: BOOLEAN
    personExist(identification: string): Observable<any> {
        return this.http.get<any>(`${this.api}personExistByIdentification/${identification}`).pipe(
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