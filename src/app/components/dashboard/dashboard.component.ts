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
    this.getDashMeta();
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['login']);
  }

  getDashMeta() {
    this._service.getDashboardMetaData().subscribe((response) => {
      console.log("Successful getting dashboard metadata", response);
      this.chartDonut = response[0].chartDonut;
      this.chartBar = response[0].chartbar;
      this.tableUsers = response[0].tableUsers;

    }, (error) => {
      console.log("Fail getting dashboard metadata", error);
    });
  }
}
