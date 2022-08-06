import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UserService } from '../services/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,private router:Router, private userService :UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
        this.userService.checkToken().subscribe((response:any)=>{
          this.router.navigate(['cafe/dashboard'])
        },(error:any)=>{
          console.log(error);
        })
    }
  }

  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(SignupComponent, dialogConfig)
  }

  forgotAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(ForgetPasswordComponent, dialogConfig);
  }

  logingAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(SignInComponent, dialogConfig);

  }

  checkToken() {
    const dialogConfig = new MatDialogConfig();

  }

}
