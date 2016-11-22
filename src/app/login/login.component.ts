import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginEmail: string;
  loginPassword: string;
  error: boolean;
  errorText: string;
  loggedIn : boolean;

  constructor(private af: AngularFire) {

    this.af.auth.subscribe(res => {
      if(res && res.auth.emailVerified)
        this.loggedIn = true;
      else
        this.loggedIn = false;
    });

    this.loginEmail = "";
    this.loginPassword = "";
    this.error = false;
    this.errorText = "";
  }

  public login() {
        var creds: any = {email: this.loginEmail, password: this.loginPassword};
        this.af.auth.login(creds)
                    .then((success) => {
                        if(!success.auth.emailVerified) {
                            // console.log("Firebase success: " + JSON.stringify(success));
                            this.displayError("Email not verified");
                        }
                    })
                    .catch((error) => {
                        this.displayError("Firebase failure: " + error);
                    });
    }

    logout() {
        this.af.auth.logout();
    }

    displayError(err: string) {
        this.error = true;
        this.errorText = err;
    }

  ngOnInit() {
  }

}
