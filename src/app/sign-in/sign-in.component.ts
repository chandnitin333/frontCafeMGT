import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SanckbarService } from '../services/sanckbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstant } from '../shared/GlobalConstant';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginFrom:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder : FormBuilder,
    private router:Router,
    private userServices : UserService,
    public dailofRef:MatDialogRef<SignInComponent>,
    private ngxService:NgxUiLoaderService ,
    private snackbarService :SanckbarService) { }

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.eamilrfegex)]],
      password:[null,Validators.required]
    });

  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginFrom.value;
    var data ={
      email: formData.email,
      password: formData.password
    }
    this.userServices.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dailofRef.close();
      localStorage.setItem('token',response.token);
      this.router.navigate(['cafe/dashboard']);
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
          this.responseMessage = error.error?.message;

      }
      else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    })
    
  }
  
}
