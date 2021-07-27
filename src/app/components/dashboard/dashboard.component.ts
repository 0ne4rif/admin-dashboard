import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  chartDonut: any;
  chartBar: any;
  tableUsers: any;

  constructor(
    private router: Router,
    private token: TokenStorageService,
    private _service: DashboardService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getTableUsers();

  }

  getLoggedUser = () => {
    const loggedUser: Object = this.token.getUser();
    console.log('User from Homepage:', loggedUser);
    if (Object.keys(loggedUser).length === 0) {
      this.router.navigate(['login']);
    }
  };

  logout(): void {
    this.token.signOut();
    this.router.navigate(['login']);
  }

  getTableUsers() {
    this._service.getDashboardMetaData().subscribe((response) => {
      console.log("Successful getting users data", response);
     
      this.tableUsers = response.tableUsers;
      console.log(response.tableUsers);
    }, (error) => {;
      console.log("Fail getting users data", error);
    });
  }

  
}
