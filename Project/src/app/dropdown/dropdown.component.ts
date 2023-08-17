import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Worker } from '../pracownicy/workers.models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit{
  dostepneOpcje: string[] = ['Nie rozpoczęte', 'W realizacji', 'Zakończone'];
  
  @Output() ItemEvent = new EventEmitter<string>();

  @Input() Pracownik : Worker | undefined;
  @Input() id : number | undefined;

  status : string | undefined ;
  wybranaOpcja: string | undefined;
  

  onOpcjaChange(event: any) {
    this.ItemEvent.emit(this.wybranaOpcja)
  }

  ngOnInit(): void {
    this.status = this.Pracownik?.zadania[this.id!].status;
    this.wybranaOpcja = this.status;
  }
}
// this!.Pracownik!.zadania[0].status;