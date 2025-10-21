import { Component } from '@angular/core';
import { PatientList } from "../patient-list/patient-list";

@Component({
  selector: 'app-home',
  imports: [PatientList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
