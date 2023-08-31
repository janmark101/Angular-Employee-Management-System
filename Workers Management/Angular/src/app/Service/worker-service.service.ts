import { Injectable } from '@angular/core';
import { Worker } from '../Models/worker.models';
import { Task } from '../Models/task.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

// new Worker(1234,"Jan","Kowalski","Analityk biznesowy","RIW","DT",[new Task("Tworzenie makiet","Nie rozpoczęte",0,"Rozwój aplikacji"),
//   new Task("Rozwiązywanie zadań","W realizacji",25,"Rozwój aplikacji")]),
//   new Worker(13321,"Tomasz","Nowak","Programista","RIW","DT",[new Task("Analizowanie Zadań","Zakończone",25,"Budowa aplikacji")])

@Injectable({
  providedIn: 'root'
})
export class WorkerServiceService {

  private workers: any[] = [];
  private workersTemp :any[] =[];

  private workersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.workersTemp);
  private Category : string[] = ["Budowa aplikacji","Rozwój aplikacji"];

  private CategorySubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.Category);

  constructor(private http:HttpClient,private AuthService : AuthServiceService) { }

  getWorkers(): Observable<any[]>{
    this.http.get<any[]>(`https://workersmanagementdatabase-default-rtdb.europe-west1.firebasedatabase.app/${this.AuthService.user.value.id}/workers.json`,
    {
      params : new HttpParams().set('auth',this.AuthService.user.value.token!)
    }).subscribe((data:any[])=>{     
      this.workers =data;  
      this.workersTemp = Object.values(data);  
      this.workersSubject.next(this.workersTemp);
      
    },error =>{console.error(error);
    })

    return this.workersSubject.asObservable();
  }

  addWorker(worker:Worker){
    this.workersTemp.push(worker);
    this.workersSubject.next([...this.workersTemp]);   
    this.http.post<any>(`https://workersmanagementdatabase-default-rtdb.europe-west1.firebasedatabase.app/${this.AuthService.user.value.id}/workers.json`,worker,
    {
      params: new HttpParams().set('auth',this.AuthService.user.value.token!)
    }).subscribe(res=>{console.log(res);
    },error =>{console.error(error);
    });

  }

  deleteWorker(id_worker:number){

    this.workersTemp.splice(id_worker,1);
    this.workersSubject.next(this.workersTemp);   
    
    this.http.delete<Worker>(`https://workersmanagementdatabase-default-rtdb.europe-west1.firebasedatabase.app/${this.AuthService.user.value.id}/workers/${Object.keys(this.workers)[id_worker]}.json`,
    {
      params: new HttpParams().set('auth',this.AuthService.user.value.token!)
    }).subscribe(res=>{console.log(res);
    },error =>{console.error(error);
    });
    
    return this.workersSubject.asObservable();

  }

  editWorker(id_worker:number, worker:Worker){
    this.workersTemp[id_worker] = worker;
    this.workersSubject.next([...this.workersTemp]);

    this.http.patch<Worker>(`https://workersmanagementdatabase-default-rtdb.europe-west1.firebasedatabase.app/${this.AuthService.user.value.id}/workers/${Object.keys(this.workers)[id_worker]}.json`,worker,
    {
      params: new HttpParams().set('auth',this.AuthService.user.value.token!)
    }).subscribe(res=>{console.log(res);
    },error =>{console.error(error);
    });
  }

  getWorker(id_worker : number) {
    return this.workersTemp[id_worker];
  }

  getCategory(): Observable<string[]>{
    return this.CategorySubject.asObservable();
  }

  addCategory(category:string){
    this.Category.push(category);
    this.CategorySubject.next([...this.Category]);
  }

  addTaskWorker(task:Task,id_worker:number){
    
      Object.values(this.workersTemp[id_worker].tasks).push(task);
      this.workersSubject.next([...this.workersTemp]); 
      
      this.http.post<Task>(`https://workersmanagementdatabase-default-rtdb.europe-west1.firebasedatabase.app/${this.AuthService.user.value.id}/workers/${Object.keys(this.workers)[id_worker]}/tasks.json`,task,
    {
      params: new HttpParams().set('auth',this.AuthService.user.value.token!)
    }).subscribe(res=>{console.log(res);
    },error =>{console.error(error);
    });
  }

  saveNewStatus(status:string,id_Task:number,id_worker:number){
    this.workers[id_worker].tasks[id_Task].status = status;
    this.workersSubject.next([...this.workers]);
  }

  saveZaawansowanie(value:number,id_Task:number,id_worker:number){
    this.workers[id_worker].tasks[id_Task].advanced=value;
    this.workersSubject.next([...this.workers]);
  }

  deleteTask(id_Task:number,id_worker:number){
    this.workers[id_worker].tasks.splice(id_Task,1);
    this.workersSubject.next([...this.workers]);
  }

  editTask(task:Task,id_worker:number,id_task:number){
    this.workers[id_worker].tasks[id_task] = task;
    this.workersSubject.next([...this.workers]);
  }

  MoveTask(id_worker : number,id_task:number,status:string,new_task_worker: Worker){
    this.workers[id_worker].tasks[id_task].status = status;
    const Task = this.workers[id_worker].tasks[id_task];
    const new_task_worker_id = this.workers.indexOf(new_task_worker);
    this.deleteTask(id_task,id_worker);
    this.addTaskWorker(Task,new_task_worker_id);
  }

  get_list_of_tasks(){
    let list_of_task = [];
    let Tasks_for_one_worker :number  = 0;
    let Task_done_for_one_worker : number = 0;

    for(let i =0; i<this.workers.length;i++){
      for (let j =0; j< this.workers[i].tasks.length;j++){
        Tasks_for_one_worker ++;
        if (this.workers[i].tasks[j].status === "Zakończone"){
          Task_done_for_one_worker ++;
        }
      }
      list_of_task.push('['+Task_done_for_one_worker+'/'+Tasks_for_one_worker+']');
      Tasks_for_one_worker = 0;
      Task_done_for_one_worker=0;
    }
    
    return list_of_task;
  }

  LogoutUser(){
    this.workersTemp = [];
    this.workersSubject.next(this.workersTemp);
    this.AuthService.logout();
  }
}
