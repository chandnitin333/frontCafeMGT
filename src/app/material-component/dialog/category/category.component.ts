import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SanckbarService } from 'src/app/services/sanckbar.service';
import { GlobalConstant } from 'src/app/shared/GlobalConstant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm :any = FormGroup;
  dailogAction:any = "Add";
  action:any = "Add";
  responseMessage :any;
  constructor(@Inject(MAT_DIALOG_DATA) public dailogData :any ,
  private fromBuilder: FormBuilder,
  private categoryService:CategoryService,
  public dialogFRef : MatDialogRef<CategoryComponent>,
  private snackBarService : SanckbarService,
  private ngxService : NgxUiLoaderService,


  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fromBuilder.group({
      name:[null,[Validators.required]]

    });
    if(this.dailogData.action ==='Edit'){
      this.dailogAction ="Edit";
      this.action ="Update";
      this.categoryForm.patchValue(this.dailogData.data);
      console.log("🚀 ~ file: category.component.ts ~ line 40 ~ CategoryComponent ~ ngOnInit ~ this.dailogData.data Category######", this.dailogData.data)
    }

  }

  handleSubmit(){
    this.ngxService.start();
    if(this.dailogAction ==="Edit"){
      this.edit();
    }else{
      this.add();
    }
  }

  add(){
    var formData =  this.categoryForm.value;
    var data = {
      name:formData.name
    }
    this.categoryService.add(data).subscribe((response:any)=>{
      this.dialogFRef.close();
      this.onAddCategory.emit();
      this.responseMessage = response.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
      this.ngxService.stop();
    },(error:any)=>{
      this.dialogFRef.close()
      if(error.error?.message){
        this.responseMessage =  error.error?.message;
        
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error);
      this.ngxService.stop();
    });
   
  }

  edit(){
    var formData =  this.categoryForm.value;
    
    var data = {
      id:this.dailogData.data.id,
      name:formData.name
    }
    // console.log("🚀 ~ file: category.component.ts ~ line 84 ~ CategoryComponent ~ edit ~ data", this.dailogData)
   
    this.categoryService.update(data).subscribe((response:any)=>{
      this.dialogFRef.close();
      this.onEditCategory.emit();
      this.responseMessage = response.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
      this.ngxService.stop();
    },(error:any)=>{
      this.dialogFRef.close()
      if(error.error?.message){
        this.responseMessage =  error.error?.message;
        
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error)
    })
    this.ngxService.stop();
  }

}
