import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  oldEmail: string;
  newEmail: string;
  password: string;
  error: string;
  success: string;

  onSubmit() {
    this.auth.changeEmail(this.oldEmail, this.newEmail, this.password).then( () => {
      this.success = 'Mail cambiata con successo, verificala e successivamente rilogga';
      this.error = null;
      this.auth.logout();
    }).catch( err => {
      this.error = err;
    });
  }
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
