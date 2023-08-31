import { Component,OnInit } from '@angular/core';
import { AuthServiceService } from './Service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular';

  constructor(private AuthService: AuthServiceService){}
  
  ngOnInit(): void {
    this.AuthService.Check_if_logged()
  }
}
