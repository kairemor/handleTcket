import { Injectable, PipeTransform, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, from } from 'rxjs';
import { Demande } from 'src/app/modals/demande';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, catchError, sample } from 'rxjs/operators';
import { SortDirection } from 'src/app/directives/demande.directive';
import { State } from 'src/app/interfaces/state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private demandesUrl = 'http://6430f35f.ngrok.io/demande';

  constructor(private pipe: DecimalPipe, private http: HttpClient, private authService: AuthenticationService) {
  }

  // Create, Read, Update and Delete
  // getDemandes() {
  //   this.http.get(this.demandesUrl).subscribe(
  //     (demande: Demande[]) => {
  //       if (demande) {
  //         this.demande = demande;
  //       }
  //     }
  //   );
  // }

  getDemande(id: number): Observable<Demande> {
    const url = `${this.demandesUrl}/${id}`;
    return this.http.get<Demande>(url)
      .pipe(
        tap(data => console.log('getDemande: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  handleError(handleError: any): import('rxjs').OperatorFunction<Demande, any> {
    throw new Error('Method not implemented.');
  }

  getMyDemande(): Observable<any[]> {
    const url = `${this.demandesUrl}/my-demande`;
    return this.http.get<any[]>(url);
  }

  getMyDepartmentDemande(): Observable<any[]> {
    const url = `${this.demandesUrl}/my-department`;
    return this.http.get<any[]>(url);
  }
  getAll(): Observable<any[]> {
    const url = `${this.demandesUrl}/all`;
    return this.http.get<any[]>(url);
  }

  createDemande(demande: Demande): Observable<Demande> {
    const url = `${this.demandesUrl}/Flux`;
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    // demande.id = null;
    // console.log(demande);
    return this.http.post<Demande>(url, demande, { headers });
  }

  delete(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const url = `${this.demandesUrl}/${id}`;
    return this.http.delete<Demande>(url, { headers });
  }

  updateDemande(demande: Demande): Observable<Demande> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const url = `${this.demandesUrl}/${demande.id}`;
    return this.http.put<Demande>(url, demande, { headers });
  }

  putStatus(status: string, id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const url = `${this.demandesUrl}/${id}`;
    console.log(status, id);
    return this.http.put<Demande>(url, { status }, { headers });
  }
}
