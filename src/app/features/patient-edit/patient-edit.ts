import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPatient } from '../interfaces/IPatient';
import { PatientService } from '../../services/patient/patient';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-patient-edit',
  imports: [
    MatDialogModule, 
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule
],
  templateUrl: './patient-edit.html',
  styleUrl: './patient-edit.scss'
})
export class PatientEdit {
  patientForm!: FormGroup;
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PatientEdit>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public patient: IPatient | undefined
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.patientForm = this.formBuilder.group({
      firstName: [this.patient?.firstName ?? '', Validators.required],
      lastName: [this.patient?.lastName ?? '', Validators.required],
      dateOfBirth: [this.patient?.dateOfBirth ?? '', Validators.required],
      gender: [this.patient?.gender ?? '', Validators.required],
      postalAddress: [this.patient?.postalAddress ?? null],
      phoneNumber: [this.patient?.phoneNumber ?? null],
    });
  }

  save(): void {
    if (this.patientForm.valid) {
      const updated = { ...this.patient, ...this.patientForm.value };
      this.patientService.updatePatient(updated.id, updated).subscribe({
        next: () => this.dialogRef.close(updated),
        error: (err) => {
          console.error('Erreur de mise à jour', err);
          console.log('test erreur: ', err.erreur.fieldErrors);
          
          if (err.fieldErrors) {
            this.fieldErrors = err.fieldErrors || {};
          }
        },
      });
    }
  }

  create(){
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      this.patientService.createPatient(patient).subscribe({
        next: () => {
          this.dialogRef.close(patient)
        },
        error: (err) => {
          console.error('Erreur à la creation du patient', err);
          
          if (err.fieldErrors) {
            this.fieldErrors = err.fieldErrors || {};
          }
        },
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
