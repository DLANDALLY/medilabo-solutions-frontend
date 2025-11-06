import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';
import { AuthService } from '../../services/auth/auth-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LottieFactory } from '../../shared/lottie-factory';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatInputModule,
    MatButtonModule,
    LottieComponent,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  imgUrl: string = '../../../../assets/images/login/';
  username = '';
  password = '';
  isButtom: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private snackBar: MatSnackBar,
    public lottie: LottieFactory 
  ) {}

  login() {
    if (this.username && this.password) {
      this.isButtom = true;
      this.authService.login(this.username, this.password).subscribe(
        () => {
          console.log('login test ');
          this.router.navigate(['/patients']);
          this.isButtom = false;
        },
        error => {
          console.error('Login échoué', error);
          this.snackBar.open('Vérifiez vos identifiants et réessayez', 'Fermer', { duration: 3000 });
          this.isButtom = false;
        }
      );
    } else {
      this.snackBar.open('username et mot de passe requis', 'Fermer', { duration: 3000 });
    }
  }
}
