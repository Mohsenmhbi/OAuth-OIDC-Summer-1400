import { Injectable } from '@angular/core';
import { UserManagerSettings, UserManager, User } from "oidc-client"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userManager = new UserManager(this.getSettings());
  private user: User;

  constructor(private router: Router) { }

  public redirectToSts(state: string) {
    var redirectConfig = {
      state: state
    };
    this.userManager.signinRedirect(redirectConfig);
  }

  redirectCallback() {
    this.userManager.signinRedirectCallback().then(user=>{
        debugger;
        this.user = user;
        this.router.navigate([user.state]);
    })
  }

  public getUser() : User {
    return this.user;
  }

  public isUserLoggedIn(): boolean {
    return this.user != null;
  }

  getSettings(): UserManagerSettings {
    return {
      authority: 'https://localhost:5001/',
      client_id: 'diaries-front',
      redirect_uri: 'http://localhost:4200/auth-callback',
      response_type: "id_token token",  //TODO: update this to use code flow + PKCE
      scope: "openid profile",
    };
  }
}