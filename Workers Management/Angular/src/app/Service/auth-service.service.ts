import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/user.models';
import { Router } from '@angular/router';
import { WorkerServiceService } from './worker-service.service';

export interface AuthResponseData {
  kind : string;
  idToken: string;
  email: string;
  refreshToken:string;
  expiresIn :string;
  localId:string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user = new BehaviorSubject<User>(null!);

  isLogged : boolean |any;

  constructor(private http : HttpClient,private router : Router) { }

  SignUp(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBn942H95fbNj8mdfa4Juo_LO9UpGT5ZWU",
      {
        email: email,
        password : password,
        returnSecureToken : true
      }
      ).pipe(catchError(this.handleError),tap(data =>{
        this.handleAuthentication(
          data.email,
          data.localId,
          data.idToken,
          +data.expiresIn    
        );    
      })
      );
  }

  SingIn(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBn942H95fbNj8mdfa4Juo_LO9UpGT5ZWU",
      {
        email: email,
        password : password,
        returnSecureToken : true
      }
      ).pipe(catchError(this.handleError),tap(data =>{
        this.handleAuthentication(
          data.email,
          data.localId,
          data.idToken,
          +data.expiresIn    
        );    
      })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage  = 'An unknown error occurred!';
        if (!error.error || !error.error.error){
          return throwError(errorMessage);
        }
        switch(error.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists!';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email or password are incorrect!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Email or password are incorrect!';
            break; 
        }
        return throwError(errorMessage);
      }

  Check_if_logged(){
    const UserLocalStorage: {
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!)

    if (!UserLocalStorage){
      return
      }

      const LoggedUser = new User(
        UserLocalStorage!.email,
        UserLocalStorage?.id,
        UserLocalStorage!._token,
        new Date(UserLocalStorage._tokenExpirationDate)
      )
      this.user.next(LoggedUser);
    }

    logout(){
      localStorage.removeItem('userData');
      this.user.next(null!);
      this.router.navigate(['']);
    }

    setLogged(logged:boolean){
      this.isLogged = logged;
    }

  }


