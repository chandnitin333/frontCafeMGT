import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCateogryComponent } from './manage-cateogry/manage-cateogry.component';



export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCateogryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    }
];
