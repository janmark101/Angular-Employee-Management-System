import { Component, OnInit } from '@angular/core';
import { workersServiceService } from '../pracownicy/pracownicy-service.service';
import { ActivatedRoute } from '@angular/router';
import { Worker } from '../pracownicy/workers.models';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-zadania',
  templateUrl: './zadania.component.html',
  styleUrls: ['./zadania.component.css']
})
export class ZadaniaComponent implements OnInit{

  id_worker : number | null  | undefined;
  worker : Worker | undefined;

  value: number [] =[];
  options: Options = {
    floor: 0,
    ceil: 200
  };
  selected = "Nie rozpoczete";


  constructor(private acitvroute : ActivatedRoute,private service : workersServiceService){}

  newStatus : string | undefined;

  ngOnInit(): void {
    this.id_worker = this.acitvroute.snapshot.params["id"];
    this.worker = this.service.getWorker(this.id_worker!);
    for (let i =0 ; i < this.worker.zadania.length; i++){
      this.value![i] = this.worker.zadania[i].zaawansowanie;
    }
  }

  changeStatus(status:string){
    this.newStatus=status;
  }

  SaveStatus(id_zad:number){
    if (this.newStatus != undefined){
      this.service.saveNewStatus(this.newStatus,id_zad,this.id_worker!)
    }
    this.service.saveZaawansowanie(this.value![id_zad],id_zad,this.id_worker!);
  }

  DeleteTask(id_zad:number){
    this.value.splice(id_zad,1);
    this.service.deleteTask(id_zad,this.id_worker!);
  }

  
}
