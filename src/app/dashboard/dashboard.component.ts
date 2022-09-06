import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SanckbarService } from '../services/sanckbar.service';
import { GlobalConstant } from '../shared/GlobalConstant';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage :any;
	data:any;

	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,
		private ngxService:NgxUiLoaderService,
		private snackBarService:SanckbarService) {
			this.dashboardData();

	}

	dashboardData(){
		this.ngxService.start();
		this.dashboardService.getDetails().subscribe((response:any)=>{
			this.ngxService.stop();
			this.data = response;
		},(error:any)=>{
			this.ngxService.stop();
			console.log(error);
			if(error.error?.message){
				this.responseMessage = error.error?.message;
			}
			else{
				this.responseMessage = GlobalConstant.genericErrorMessage;
			}

			this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error);
		})
	}
}
