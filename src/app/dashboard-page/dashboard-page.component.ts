import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ListService } from '../services/list.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  isHTMLLoaded: boolean = isPlatformBrowser(this.platformId);
  lists$ = this.listService.lists$;

  constructor(
    private listService: ListService,
    private appService: AppService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addNew(): void {
    this.listService.addNew('List');
  }

  logOut() {
    this.appService.logOut();
  }

  ngOnInit(): void {
    if(this.isHTMLLoaded){
      this.onInitOnBrowser();
    }
  }

  onInitOnBrowser() {
    this.listService.loadAll();
  }

}
