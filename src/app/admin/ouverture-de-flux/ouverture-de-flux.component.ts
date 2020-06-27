import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Demande } from 'src/app/modals/demande';
import { DemandeService } from 'src/app/services/demande.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ouverture-de-flux',
  templateUrl: './ouverture-de-flux.component.html',
  styleUrls: ['./ouverture-de-flux.component.css']
})
export class OuvertureDeFluxComponent implements OnInit {

  demandeForm: FormGroup;
  errorMessage: string;
  constructor( private fb: FormBuilder, private demandeService: DemandeService, private router: Router) { }

  ngOnInit() {
    this.demandeForm = this.fb.group({
      description: '',
      validator: this.fb.group({
        firstName: ['' , Validators.required],
        lastName: ['' , Validators.required],
        phone: ['' , Validators.required],
        email: ['' , Validators.required],
      }),
      endOfValidity: ['' , Validators.required],
      infos: this.fb.array([this.createFlux()]),

    });
  }

  get infos(): FormArray {
    return this.demandeForm.get('infos') as FormArray;
  }

  addInfos() {
    this.infos.push(this.createFlux());
  }

  createFlux(): FormGroup {
    return this.fb.group({
        ipSource: ['' , Validators.required],
        ipDestination: ['' , Validators.required],
        protocole: ['' , Validators.required],
        port: ['' , Validators.required],
      });
    }

  delete(index: number): void {
      this.infos.removeAt(index);
    }

  saveForm() {
    if (this.demandeForm.valid) {
      // if (this.demandeForm.dirty) {
        // console.log(this.demandeForm.value);
        const d = {type: 'Ouverture de Flux' , ...this.demandeForm.value};
        console.log(d);
        this.demandeService.createDemande(d)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.onSave();
          },
          error: err => {
            console.log(err);
            this.errorMessage = err;
          }
        });
      // } else {
      //   this.onSave();
      // }
    } else {
      this.errorMessage = 'Corriger les erreurs de validation';
    }
  }

  onSave(): void {
    this.demandeForm.reset();
    this.router.navigate(['/liste-des-demandes']);
  }
}
