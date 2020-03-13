import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  keepLogged: boolean;
  redirect: string;
  error: string;

  onSubmit() {
    this.auth.login(this.email, this.password, this.keepLogged)
    .then(() => {
      this.router.navigate([this.redirect]);
    }).catch(err => {
      console.error('Error occurred while trying to send login data: ' + err);
      this.error = err;
    });
  }

  recover() {
    this.router.navigate(['/recover']);
  }

  constructor(private auth: AuthenticationService, private router: Router,
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      if (params.redirect != null && params.redirect !== '') {
        this.redirect = decodeURIComponent(params.redirect);
      } else {
        this.redirect = '/';
      }
    });
  }

}
