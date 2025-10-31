import { Component } from '@angular/core';
import { MedicalHistoricalDtos } from '../interfaces/MedicalHistoricalDtos';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-medical-record',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-medical-record.html',
  styleUrl: './add-medical-record.scss'
})
export class AddMedicalRecord {
  newNote: MedicalHistoricalDtos = { id: 'undefined', note: '' };

  constructor(
    private dialogRef: MatDialogRef<AddMedicalRecord>
  ) { }

  addNote(): void {
    if (this.newNote.note.trim()) {
      console.log('Nouvelle note :', this.newNote);
      this.dialogRef.close(this.newNote); 
      this.newNote = { id: 'undefined', note: '' }; 
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
