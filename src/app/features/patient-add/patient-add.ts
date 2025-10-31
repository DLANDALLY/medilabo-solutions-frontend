import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
