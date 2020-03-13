import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  email: string;
  message: string;
  error: string;
  sent = false;

  onSubmit() {
    this.auth.recover(this.email)
    .then( () => {
      this.sent = true;
      this.message = 'Look at your mail inbox';
    }).catch( err => {
      this.error = 'Error occurred: ' + err;
    });
  }

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
