import { Component } from '@angular/core';
import { IPatient } from '../interfaces/IPatient';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient/patient';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientAdd } from '../patient-add/patient-add';
import { PatientEdit } from '../patient-edit/patient-edit';
import { MatButtonModule } from '@angular/material/button';
import { LottieFactory } from '../../shared/lottie-factory';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-patient-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    LottieComponent
],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientList {
  patients: IPatient[] = [];
  filteredPatients: IPatient[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'postalAddress', 'phoneNumber', 'action'];
  searchControl = new FormControl('');
  patientState: IPatient | null = null;
  patient: IPatient | null = null;
  checkData: boolean = false;
  
  constructor(
    private patientService: PatientService, 
    private router: Router,
    private dialog: MatDialog,
    public lottie: LottieFactory
  ){}

  ngOnInit() {
    console.log('Component initialized');
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        console.log('Patients fetched:', data);
        this.patients = data;
        this.checkData = true
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.checkData = false;
      }
    });

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.applyFilter(value ?? '');
    });
  }

  applyFilter(filterValue: string) {
    const value = filterValue.trim().toLowerCase();
    this.filteredPatients = this.patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(value) ||
        p.lastName.toLowerCase().includes(value) ||
        p.gender.toLowerCase().includes(value)
    );
  }

  viewPatient(id: number, patient: IPatient) {
    if (id && id > 0) {
      this.router.navigate(['/patients', id], { state: { patient } });
    } else { 
      console.warn('ID patient invalide:', id);   
    }
  }

  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(PatientEdit, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.patients.push(result);
    });
  }

 
}
