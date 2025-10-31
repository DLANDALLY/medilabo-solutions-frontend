import { Component, Input } from '@angular/core';
import { IReporting } from '../interfaces/IReporting';
import { ReportingService } from '../../services/reporting/reporting';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporting',
  imports: [CommonModule, MatIconModule],
  templateUrl: './reporting.html',
  styleUrl: './reporting.scss'
})
export class Reporting {
  @Input() reporting!: IReporting;
  
}
