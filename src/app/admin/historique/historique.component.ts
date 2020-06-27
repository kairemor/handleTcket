import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as moment from 'moment';
import { DemandeService } from 'src/app/services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/modals/demande';
import { Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit, OnDestroy {

  demandes: any[];
  demande: Demande;
  errorMessage = '';

  mylistFilter: string;

  filteredDemandes: any[];
  get listFilter(): string {
    return this.mylistFilter;
  }

  set listFilter(value: string) {
    this.mylistFilter = value;
    this.filteredDemandes = this.listFilter ? this.performFilter(this.listFilter) : this.demandes$;
  }

  private sub: Subscription;


  constructor(private service: DemandeService, private route: ActivatedRoute) { }

  // @Input() etat: string;

  page = 1;
  pageSize = 6;
  collectionSize: number;


  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.demandes.filter((demande: Demande) =>
    demande.type.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.author.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.author.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1
    || demande.status.name.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.service.getAll()
    .subscribe({
      next: data => {
        this.demandes = data;
        this.collectionSize = this.demandes.length;
        this.filteredDemandes = this.demandes;

      },
      error: err => this.errorMessage = err
    });

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

  deleteDemande(id: number) {
    if (confirm(`Etes vous sûrs de vouloir supprimer la demande`)) {
      this.service.delete(id)
      .subscribe({
        next: data => {
          console.log(data);
          this.service.getAll().subscribe(
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

  submitStatus(status: string, id: number) {
    this.service.putStatus(status, id)
    .subscribe({
      next: data => {
        console.log(data);
        this.service.getAll().subscribe(
          {
            next: liste => {
              this.filteredDemandes = liste;
            },
            error: err => this.errorMessage = err
          }
        );
      } ,
        error: err => this.errorMessage = err

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
