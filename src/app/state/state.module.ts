import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './state.model';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks/tasks.effects';
import { ListEffect } from './lists/list.effect';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects, ListEffect]),
    StoreDevtoolsModule.instrument({}),
  ]
})
export class StateModule {}
