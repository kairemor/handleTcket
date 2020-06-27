import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/services/demande.service';
import { Demande } from 'src/app/modals/demande';
import { error } from 'util';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-demande',
  templateUrl: './edit-demande.component.html',
  styleUrls: ['./edit-demande.component.css']
})
export class EditDemandeComponent implements OnInit, OnDestroy {

  expression = true;
  demandeForm: FormGroup;
  errorMessage = '';
  demande: any;
  private sub: Subscription;
  displayMessage: { [key: string]: string } = {};

  get infos(): FormArray {
    return this.demandeForm.get('infos') as FormArray;
  }



  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private demandeService: DemandeService, private authService: AuthenticationService) { }

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

  isDemandeur(): boolean {
    if (this.authService.getProfil() === 'DEMANDEUR') {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.demandeForm = this.fb.group({
      description: '',
      validator: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
      }),
      endOfValidity: ['', Validators.required],
      infos: this.fb.array([this.createFlux()]),
    });

    // Read the product id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDemande(id);
      }
    );
  }

  addInfos() {
    this.infos.push(this.createFlux());
  }

  createFlux(): FormGroup {
    return this.fb.group({
      ipSource: ['', Validators.required],
      ipDestination: ['', Validators.required],
      protocole: ['', Validators.required],
      port: ['', Validators.required],
    });
  }

  delete(index: number): void {
    this.infos.removeAt(index);
  }

  getDemande(id: number): void {
    this.demandeService.getDemande(id)
      .subscribe({
        next: (demande: Demande) => this.displayDemande(demande),
        error: err => this.errorMessage = err
      });
  }
  displayDemande(demande: Demande): void {
    if (this.demandeForm) {
      this.demandeForm.reset();
    }
    this.demande = demande;
    // Update the data
    this.demandeForm.patchValue({
      description: this.demande.description,
      endOfValidity: this.demande.endOfValidity,
      validator: {
        firstName: this.demande.validator.firstName,
        lastName: this.demande.validator.lastName, email: this.demande.validator.email, phone: this.demande.validator.phone
      },
    });
    // tslint:disable-next-line: max-line-length
    this.demandeForm.setControl('infos', this.setInfoFlux(this.demande.flux.infoFlux));
  }

  setInfoFlux(infos: any[]): FormArray {
    const formArray = new FormArray([]);
    infos.forEach(info => {
      formArray.push(this.fb.group({
        ipSource: info.ipSource,
        ipDestination: info.ipDestination,
        protocole: info.protocole,
        port: info.port,
      }));
    });
    return formArray;
  }

  deleteDemande(): void {
    if (confirm(`Etes vous sûrs de vouloir supprimer la demande: ${this.demande.description}?`)) {
      this.demandeService.delete(this.demande.id)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: err => this.errorMessage = err
        });
    }
  }
  saveForm() {
    if (this.demandeForm.valid) {
      if (this.demandeForm.dirty) {
        const d = { ...this.demande, ...this.demandeForm.value };
        this.demandeService.updateDemande(d)
          .subscribe({
            next: () => this.onSave(),
            error: err => this.errorMessage = err
          });
      } else {
        this.onSave();
      }
    } else {
      this.errorMessage = 'Corriger les erreurs de validation';
    }
  }

  onSave(): void {
    this.demandeForm.reset();
    this.router.navigate(['/liste-des-demandes']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
