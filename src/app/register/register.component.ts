import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
  export class RegisterComponent implements OnInit {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
  finished = false;
  error: string;

  onSubmit() {
    if (this.password === this.password2) {
      this.auth.register(this.firstname, this.lastname, this.email, this.password)
      .then( () => {
        this.finished = true;
        this.error = null;
      }).catch(err => {
        this.error = err;
        console.error('Error occurred : ' + err);
      });
    } else {
      this.error = 'Le password non corrispondono';
    }
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

}
