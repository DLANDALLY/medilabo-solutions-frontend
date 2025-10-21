import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientService } from '../../services/patient/patient';
import { IPatient } from '../interfaces/IPatient';

@Component({
  selector: 'app-patient-add',
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
  templateUrl: './patient-add.html',
  styleUrl: './patient-add.scss'
})
export class PatientAdd {
  patientForm!: FormGroup;
  fieldErrors: { [key: string]: string } = {};

}
