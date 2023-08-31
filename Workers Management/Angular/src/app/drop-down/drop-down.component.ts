import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Worker } from '../Models/worker.models';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit{
  options: string[] = ['Nie rozpoczęte', 'W realizacji', 'Zakończone'];
  
  @Output() ItemEvent = new EventEmitter<string>();

  @Input() WorkerTasks :any[] | undefined;
  @Input() id : number | undefined;

  status : string | undefined ;
  choosen_option: string | undefined;
  

  onOptionChange(event: any) {
    this.ItemEvent.emit(this.choosen_option)
  }

  ngOnInit(): void {
    this.status = this.WorkerTasks![this.id!].status;
    this.choosen_option = this.status;
  }
}
