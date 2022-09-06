import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SanckbarService } from 'src/app/services/sanckbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/GlobalConstant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassswordFrom: any = FormGroup;
  responseMessage: any;

  constructor(private fromBuilder: FormBuilder, private userServices: UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snakBarService: SanckbarService) { }

  ngOnInit(): void {
    this.changePassswordFrom = this.fromBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  validateSubmit(): boolean {
    if (this.changePassswordFrom.controls['newPassword'].value != this.changePassswordFrom.controls['confirmPassword'].value) {
      return true;

    } else {
      return false;
    }
  }

  handleChangePasswordSubmit() {
    this.ngxService.start();
    var formData = this.changePassswordFrom.value;
    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    }

    this.userServices.changePassword(data).subscribe((response: any) => {
      console.log("🚀 ~ file: change-password.component.ts ~ line 51 ~ ChangePasswordComponent ~ this.userServices.changePassword ~ response", response)
      this.ngxService.stop();
      this.responseMessage = response?.message;
      
      this.dialogRef.close();
      this.snakBarService.openSnackBar(this.responseMessage, "success")
    }, (error) => {
      console.log("🚀 ~ file: change-password.component.ts ~ line 55 ~ ChangePasswordComponent ~ this.userServices.changePassword ~ err", error);
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }

      this.snakBarService.openSnackBar(this.responseMessage, GlobalConstant.error);

    })


  }






}
