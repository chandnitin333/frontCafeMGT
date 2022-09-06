import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SanckbarService } from './sanckbar.service';
import jwd_decode from 'jwt-decode';
import { GlobalConstant } from '../shared/GlobalConstant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth :AuthService,private router:Router,private snackbarService:SanckbarService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token:any = localStorage.getItem('token');
    var tokenPayload:any;
    try{
      tokenPayload =jwd_decode(token);

    }catch(err){
      localStorage.clear();
      this.router.navigate(['/']) 


    }

    let checkRole = false;
    for(let i =0; i< expectedRoleArray.length; i++){
      if(expectedRoleArray[i]== tokenPayload.role){
        checkRole =true;
      }
    }
    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'   ){
          if(this.auth.isAuthenticated() && checkRole){
            return true;
          }
          this.snackbarService.openSnackBar(GlobalConstant.unAuthorise,GlobalConstant.error);
          this.router.navigate(['cafe/dashboard']);
          return false;
    }else{
      this.router.navigate(['/'])
      localStorage.clear();
      return false;
    }
  }
}
