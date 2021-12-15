import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addList, loadLists } from '../state/lists/list.actions';
import { lists } from '../state/lists/list.selector';
import { IList } from '../interface/list-interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists$ = this.store.select(lists);

  constructor(private store: Store<{ lists: IList[] }>) { }

  loadAllLists() {
    this.store.dispatch(loadLists());
  }

  addNewList(title: string) {
    this.store.dispatch(addList({ title }));
  }
}
