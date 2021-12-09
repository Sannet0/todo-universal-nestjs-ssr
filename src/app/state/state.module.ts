import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './state.model';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks/tasks.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects]),
    StoreDevtoolsModule.instrument({}),
  ]
})
export class StateModule {}
