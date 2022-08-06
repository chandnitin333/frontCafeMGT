import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SanckbarService } from '../services/sanckbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstant } from '../shared/GlobalConstant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFrom:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder : FormBuilder,
    private router: Router, 
    private userServices:UserService,
    private snackBarservices:SanckbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService

    ) { }

  ngOnInit(): void {
    this.signupFrom = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.eamilrfegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberegex)]],
      password:[null,[Validators.required]],
      
    }
    )
  }

handleSubmit(){
  this.ngxService.start();
  var formData =  this.signupFrom.value;
  var data = {
    name:formData.name,
    email:formData.email,
    contact_number:formData.contactNumber,
    password:formData.password
  }

  this.userServices.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response ?.message;
      this.snackBarservices.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
  },(error)=>{
     this.ngxService.stop();
     if(error.error?.message){
        this.responseMessage=error.error?.message
     }else{
       this.responseMessage = GlobalConstant.genericErrorMessage;
     }
     this.snackBarservices.openSnackBar(this.responseMessage,GlobalConstant.error);
  })
}


}
