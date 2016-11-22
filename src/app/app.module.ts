import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthStateComponent } from './auth-state/auth-state.component';
import { UserDataComponent } from './user-data/user-data.component';

import { FirebaseService } from './firebase.service';

export const firebaseConfig = {
    apiKey: "AIzaSyD62AjtNiXO4eAhXTa6v-g1JmjVeT58tLY",
    authDomain: "trivia-37669.firebaseapp.com",
    databaseURL: "https://trivia-37669.firebaseio.com",
    storageBucket: "trivia-37669.appspot.com",
    messagingSenderId: "728767848661"
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthStateComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
