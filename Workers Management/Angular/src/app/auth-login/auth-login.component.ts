import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService,AuthResponseData } from '../Service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {
  Error : string | undefined;
  Color : string | undefined;

  Login_SignUp : Boolean = false;

  constructor(private AuthService : AuthServiceService,private router : Router){}

  OnSubmit(form:NgForm){
    if (this.Login_SignUp){
      if(form.valid){
        if(form.value.password == form.value.password_2){
          this.AuthService.SignUp(form.value.email,form.value.password).subscribe((data:any)=>{
            console.log(data);
            this.Login_SignUp = false;
            this.Color = 'green'
            this.Error = "Succesfully signed up."
          },errorMessage =>{           
            this.Color = 'red';
            this.Error = errorMessage;
            
          })
        }
        else {
          this.Color = 'red';
          this.Error = "Passwords must match!";
        }
      }
      else{
        this.Color = 'red';
        this.Error = "Insert correct data!";
      }
      
    
    }
    if (!this.Login_SignUp){
      if(form.valid){
      this.AuthService.SingIn(form.value.email,form.value.password).subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/workers']);
      },(error:any)=>{
        this.Color = 'red';
          this.Error = "Email or password are incorrect!";
      })
    }
    else{
      this.Color = 'red';
      this.Error = "Dont leave empty fields!";
    }
    }
  }

  ChangeLogin_SingUp(){
    this.Login_SignUp = ! this.Login_SignUp
  }
}
