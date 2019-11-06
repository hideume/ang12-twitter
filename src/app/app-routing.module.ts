import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimitComponent } from '../app/limit/limit.component';
import { TweetsComponent } from '../app/tweets/tweets.component';

//const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: TweetsComponent
  },
  {
    path: 'limit',
    component: LimitComponent
  },
  {
    path: 'tweets',
    component: TweetsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
