import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Haushaltsbuch';

  constructor(private userService: UserService, private router: Router){
  }

  async logOut(){
    await this.router.navigate(["main-menu"]);
    this.userService.logOut();
  }
}
