import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  constructor(private router: Router){}
  
  onLogin() { this.router.navigate(['/login']); }
}
