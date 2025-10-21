import { Component, Input } from '@angular/core';
import { IReporting } from '../interfaces/IReporting';
import { ReportingService } from '../../services/reporting/reporting';

@Component({
  selector: 'app-reporting',
  imports: [],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss'
})
export class Reporting {
  @Input() reporting!: IReporting;
  
  
}
