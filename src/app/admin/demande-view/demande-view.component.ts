import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from 'src/app/services/demande.service';
import { Subscription } from 'rxjs';
import { Demande } from 'src/app/modals/demande';

@Component({
  selector: 'app-demande-view',
  templateUrl: './demande-view.component.html',
  styleUrls: ['./demande-view.component.css']
})
export class DemandeViewComponent implements OnInit {

  errorMessage = '';
  demande: Demande;

  constructor(private router: Router, private route: ActivatedRoute, private service: DemandeService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getDemande(id);
    }
}

getDemande(id: number) {
  this.service.getDemande(id).subscribe({
    next: demande => this.demande = demande,
    error: err => this.errorMessage = err
  });
}

onBack(): void {
  this.router.navigate(['/liste-des-demandes']);
}

}
