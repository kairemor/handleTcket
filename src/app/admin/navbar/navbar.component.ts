import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/modals/userAuth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authservice: AuthenticationService) {
  }

  ngOnInit() {
  }

  // isAdmin(): boolean {
  //   if (this.authservice.getProfil() === 'ADMIN_ARS') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  logout(): void {
    this.authservice.logout();
  }
}
