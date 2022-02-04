import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  isLoginMode :Boolean = true;
  isLoading= false;
  error:string =null;
  

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }


  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    let authObs:Observable<AuthResponseData>;
    const email=form.value.email;
    const password=form.value.password;
    if(this.isLoginMode){
      this.isLoading=true;
      authObs=this.authService.login(email,password);
    }else{
      this.isLoading=true;
      authObs=this.authService.signup(email,password);
    }
    authObs.subscribe(
      resData => {
        this.isLoading=false;
        console.log(resData);
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading=false;
        this.error=errorMessage;
        console.log(errorMessage);
      }
    );
    form.reset();
  }
}
