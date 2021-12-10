import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as ListAction from './list.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ListEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadLists$ = createEffect(() => this.actions$.pipe(
    ofType(ListAction.loadLists),
    mergeMap(() =>
      this.apiService.loadAllLists().pipe(
        map(lists => ListAction.loadListsSuccess({ lists }))
      )
    )
  ))

  newList$ = createEffect(() => this.actions$.pipe(
    ofType(ListAction.addList),
    mergeMap(({ title }) =>
      this.apiService.addNewList(title).pipe(
        map(list => {
          return ListAction.addListSuccess({ list })
        })
      )
    )
  ))
}
