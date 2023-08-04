import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';

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
    this.router.navigate(["main-menu"]);
    await new Promise(resolve => setTimeout(resolve, 0));
    this.userService.logOut();
  }
}
