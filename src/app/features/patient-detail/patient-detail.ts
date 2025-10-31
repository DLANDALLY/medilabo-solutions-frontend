import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../interfaces/IPatient';
import { PatientService } from '../../services/patient/patient';
import { MedicalRecord } from "../medical-record/medical-record";
import { Reporting } from "../reporting/reporting";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PatientEdit } from '../patient-edit/patient-edit';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicalRecordService } from '../../services/medical-record/medical-record';
import { IMedicalRecord } from '../interfaces/IMedicalRecord';
import { ReportingService } from '../../services/reporting/reporting';
import { IReporting } from '../interfaces/IReporting';
import { AddMedicalRecord } from '../add-medical-record/add-medical-record';
import { MedicalHistoricalDtos } from '../interfaces/MedicalHistoricalDtos';

@Component({
  selector: 'app-patient-detail',
  imports: [
    MedicalRecord, 
    Reporting, 
    MatCardModule, 
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.scss'
})
export class PatientDetail {
  patient: IPatient | null = null;
  patientId: number | null = null;
  medicalRecord: IMedicalRecord | null = null;
  reporting: IReporting | null = null;
  medicalHistorique: MedicalHistoricalDtos | null = null;

  constructor(
    private router: Router, 
    private patientService: PatientService, 
    private medicalRecordService: MedicalRecordService,
    private reportingService: ReportingService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.loadPatient();
    this.loadMedicalRecord();
    this.loadReporting();
  }

  loadPatient(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.patientId = idParam ? +idParam : null;
    
    const navigation = this.router.getCurrentNavigation();
    const statePatient = navigation?.extras?.state?.['patient'];
    //const statePatient = history.state?.patient;

    if (statePatient) {
      this.patient = statePatient;
    } else if (this.patientId) {
      this.patientService.getPatientById(this.patientId).subscribe({
        next: (data) => { this.patient = data },
        error: (err) => console.error('Erreur chargement patient', err),
      });
    } else {
      console.error('Aucun ID patient trouvé');
    }
  }

  loadMedicalRecord(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.patientId = idParam ? +idParam : null;
    if(!this.patientId) return ;

    this.medicalRecordService.getMedicalRecordById(this.patientId).subscribe({
      next: (data) => {
        console.log('Medical fetched:', data);
        this.medicalRecord = data;
      },
      error: (err) => console.error('Error fetching patients:', err)
    });
  }

  loadReporting(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.patientId = idParam ? +idParam : null;
    if(!this.patientId) return ;

    this.reportingService.getReportingById(this.patientId).subscribe({
      next: (data) => {
        console.log('Reporting fetched:', data);
        this.reporting = data;
      },
      error: (err) => console.error('Error fetching Reporting:', err)
    });
  }

  openEditDialog(): void {
    if (!this.patient) return;
    const dialogRef = this.dialog.open(PatientEdit, {
      width: '750px',
      data: this.patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.patient = result; 
    });
  }

  onAddMedicalRecord(): void {
    const dialogRef = this.dialog.open(AddMedicalRecord, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.patientId) {
        console.log('✅ OnAddMedicalRecord déclenché');
        console.log('🆔 ID patient :', this.patientId);
        console.log('📝 Nouvelle note :', result);

        const medicalHistorique: MedicalHistoricalDtos = result;

        this.medicalRecordService.addNoteHistorique(this.patientId, medicalHistorique).subscribe({
          next: (response) => {
            console.log('✅ Note ajoutée avec succès', response);
            this.loadMedicalRecord(); // recharger les données après succès
            this.loadReporting();
          },
          error: (err) => {
            console.error('❌ Erreur lors de l’ajout de la note :', err);
          }
        });
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/patients']);
  }

  calculateAge(dateOfBirth?: Date | string): number {
  if (!dateOfBirth) return 99;

  const dob = new Date(dateOfBirth); // ✅ conversion string → Date
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasBirthdayPassed) age--;

  return age;
}


}
