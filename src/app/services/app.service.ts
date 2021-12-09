import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isDataLoad } from '../state/app/app.selector';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<{ isDataLoad: boolean }>) {
  }

  isDataLoad$ = this.store.select(isDataLoad);
}
