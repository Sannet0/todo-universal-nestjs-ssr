import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { ITask } from '../interface/task-interface';
import { addList, loadLists } from '../state/lists/list.actions';
import { lists } from '../state/lists/list.selector';
import { IList } from '../interface/list-interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists$ = this.store.select(lists);

  constructor(private store: Store<{ lists: IList[] }>) { }

  loadAll() {
    console.log("LOOOG");
    this.store.dispatch(loadLists());
  }

  addNew(title: string) {
    this.store.dispatch(addList({ title }));
  }
}
