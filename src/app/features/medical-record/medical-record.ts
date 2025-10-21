import { Component, Input } from '@angular/core';
import { IMedicalRecord } from '../interfaces/IMedicalRecord';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-medical-record',
  imports: [CommonModule, MatCardModule],
  templateUrl: './medical-record.html',
  styleUrl: './medical-record.scss'
})
export class MedicalRecord {
  @Input() medicalRecord?: IMedicalRecord

}
