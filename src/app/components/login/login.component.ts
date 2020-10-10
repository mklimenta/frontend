import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private userService: UserService,
              private router: Router,
              private authService: SocialAuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState){
        this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  signInWithGoogle(): void {
    this.userService.googleLogin();
  }

  // tslint:disable-next-line:typedef
  login(form: NgForm) {
    const email: string = this.email;
    const password: string = this.password;
    //
    // if (form.invalid) {
    //   return;
    // }
    //
    // form.reset();
    this.userService.loginUser(email, password);
  }

}
