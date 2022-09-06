import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SanckbarService } from 'src/app/services/sanckbar.service';
import { GlobalConstant } from 'src/app/shared/GlobalConstant';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-cateogry',
  templateUrl: './manage-cateogry.component.html',
  styleUrls: ['./manage-cateogry.component.scss']
})
export class ManageCateogryComponent implements OnInit {
  displayedColumn: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackBarService: SanckbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();

  }


  tableData() {
    this.categoryService.getCategory().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);

    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }

      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstant.error);
    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response) => {
      this.tableData();
    })
  }
  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data: values
    }
    console.log("🚀 ~ file: manage-cateogry.component.ts ~ line 79 ~ ManageCateogryComponent ~ handleEditAction ~ values", values)
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditCategory.subscribe((response) => {
      this.tableData();
    })

  }
}
