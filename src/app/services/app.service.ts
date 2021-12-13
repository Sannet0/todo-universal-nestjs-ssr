import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { isDataLoad } from '../state/app/app.selector';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<{ isDataLoad: boolean }>, private router: Router) {
  }

  isDataLoad$ = this.store.select(isDataLoad);

  logOut() {
    localStorage.setItem('token', '');
    this.router.navigate(['auth']).then();
  }
}
