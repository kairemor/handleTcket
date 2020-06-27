import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  public model: NgbDateStruct;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }
  onSubmit() {

  }

}
