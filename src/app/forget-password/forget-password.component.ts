import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SanckbarService } from '../services/sanckbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstant } from '../shared/GlobalConstant';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotFrom:any = FormGroup;
  responseMessage :any;

  constructor(private formBuilder : FormBuilder,
    private router: Router, 
    private userServices:UserService,
    private snackBarservices:SanckbarService,
    private dialogRef:MatDialogRef<ForgetPasswordComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.forgotFrom = this.formBuilder.group({
      
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.eamilrfegex)]]
      
    }
    )
  }

  handleSubmit(){
    this.ngxService.start();
    var formData =  this.forgotFrom.value;
    let data = {
      email:formData.email
    }

    this.userServices.forgotPassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response ?.message
      this.dialogRef.close();
      this.snackBarservices.openSnackBar(this.responseMessage,"");
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error ?.message;
      }else{
        this.responseMessage=GlobalConstant.genericErrorMessage;

      }
      this.snackBarservices.openSnackBar(this.responseMessage,GlobalConstant.error)
    })
    
  }

}
