import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  password: string;
  password2: string;
  error: string;
  success: string;

  onSubmit() {
    if (this.password === this.password2) {
      this.auth.changePassword(this.password, this.oldPassword).then( () => {
        this.success = 'Password cambiata con successo, rilogga';
        this.auth.logout();
      }).catch( err => {
        this.error = err;
      });
    } else {
      this.error = 'Le password non corrispondono';
    }
  }

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
