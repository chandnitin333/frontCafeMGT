import { Component, OnInit ,EventEmitter,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  onEmitStatusChange = new EventEmitter();
  details:any ={};

  constructor(@Inject(MAT_DIALOG_DATA) public dailogData:any) { }

  ngOnInit(): void {
    // console.log(this.dailogData);
  
    if(this.dailogData){
      console.log("🚀 ~ file: confirmation.component.ts ~ line 22 ~ ConfirmationComponent ~ ngOnInit ~ dailogData", this.dailogData)
      this.details =  this.dailogData;
    }
  }

  handleChangeAction(){
    console.log('here');
    this.onEmitStatusChange.emit();
  }


}
