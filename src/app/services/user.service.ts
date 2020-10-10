import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL: string = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  private userData$ = new BehaviorSubject<SocialUser | ResponseModel>(null);

  constructor(private authService: SocialAuthService,
              private httpClient: HttpClient) {

    authService.authState.subscribe((user: SocialUser) => {
        if (user !== null) {
          this.auth = true;
          this.authState$.next(this.auth);
          this.userData$.next(user);
        }
    });
  }
  // Login user with Email and Password
  // tslint:disable-next-line:typedef
  loginUser(email: string, password: string) {
    this.httpClient.post(`${this.SERVER_URL}auth/login`, { email, password})
      .subscribe((data: ResponseModel) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      });
  }

  // Google Authentication
  // tslint:disable-next-line:typedef
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.signOut().then(r =>
      this.auth = false);
    this.authState$.next(this.auth);
  }

}

interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
