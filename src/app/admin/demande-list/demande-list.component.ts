import { Component, OnInit, ViewChild, QueryList, ViewChildren, Input, OnDestroy, PipeTransform } from '@angular/core';
import {Observable, from, Subscription} from 'rxjs';
import { Demande } from 'src/app/modals/demande';
import { DemandeService } from 'src/app/services/demande.service';
import { SortEvent } from 'src/app/interfaces/sort-event';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Demandes } from 'src/app/modals/demandes';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/modals/user';


@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit, OnDestroy {

  demandes: any[];
  demande: Demande;
  errorMessage = '';
  mylistFilter: string;
  currentUser: User;

  filteredDemandes: any[];
  get listFilter(): string {
    return this.mylistFilter;
  }

  set listFilter(value: string) {
    this.mylistFilter = value;
    this.filteredDemandes = this.listFilter ? this.performFilter(this.listFilter) : this.demandes$;
  }

  private sub: Subscription;

  // tslint:disable-next-line: max-line-length
  constructor(public service: DemandeService, private authService: AuthenticationService,
              private route: ActivatedRoute) { }

  page = 1;
  pageSize = 6;
  collectionSize: number;

  isValidator(): boolean {
    if (this.authService.getProfil() === 'VALIDATEUR') {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.authService.getProfil() === 'ADMIN_ARS') {
      return true;
    }
    return false;
  }
  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.demandes.filter((demande: Demande) =>
    demande.type.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.author.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.author.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.status.name.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    if ( this.authService.getProfil() === 'DEMANDEUR') {
      this.service.getMyDemande()
      .subscribe({
        next: data => {
          this.demandes = data;
          this.collectionSize = this.demandes.length;
          this.filteredDemandes = this.demandes;
        },
        error: err => this.errorMessage = err
      });
    } else if (this.authService.getProfil() === 'VALIDATEUR') {
      this.service.getMyDepartmentDemande()
      .subscribe({
        next: data => {
          this.demandes = data;
          this.collectionSize = this.demandes.length;
          this.filteredDemandes = this.demandes;
        },
        error: err => this.errorMessage = err
      });
    } else {
      this.service.getAll()
      .subscribe({
        next: data => {
          this.demandes = data;
          this.collectionSize = this.demandes.length;
          this.filteredDemandes = this.demandes;
        },
        error: err => this.errorMessage = err
      });
    }

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.service.getDemande(id);
      }
    );
  }

  get demandes$(): any[] {
    return this.filteredDemandes
      .map((demande, i) => ({id: i + 1, ...demande}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  submitStatus(status: string, id: number) {
    this.service.putStatus(status, id)
    .subscribe({
      next: data => {
        console.log(data);
        if (this.authService.getProfil() === 'ADMIN_ARS') {
          this.service.getAll().subscribe(
            {
              next: liste => {
                this.filteredDemandes = liste;
              },
              error: err => this.errorMessage = err
            }
          );
        } else if (this.authService.getProfil() === 'VALIDATEUR') {
          this.service.getMyDepartmentDemande().subscribe(
            {
              next: liste => {
                this.filteredDemandes = liste;
              },
              error: err => this.errorMessage = err
            }
          );
          }
        },
        error: err => this.errorMessage = err

    });
  }

  deleteDemande(id: number) {
    if (confirm(`Etes vous sûrs de vouloir supprimer la demande`)) {
      this.service.delete(id)
      .subscribe({
        next: data => {
          console.log(data);
          this.service.getMyDemande().subscribe(
            {
              next: liste => {
                this.filteredDemandes = liste;
              },
              error: err => this.errorMessage = err
            }
          );
        },
        error: err => this.errorMessage = err
      });
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



}
