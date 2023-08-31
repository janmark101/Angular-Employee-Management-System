import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Service/auth-service.service';
import { WorkerServiceService } from '../Service/worker-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 isLogged : boolean |undefined;

 constructor(private AuthService : AuthServiceService,private WorkerService : WorkerServiceService){}

  ngOnInit(): void {
  
    this.AuthService.user.subscribe(response =>{
      this.isLogged = !!response;
    });
  }

  Logout(){    
    this.WorkerService.LogoutUser();
  }


}
