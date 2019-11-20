import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimitComponent } from '../app/limit/limit.component';
import { TweetsComponent } from '../app/tweets/tweets.component';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { UserComponent } from './user/user.component';

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
  {
    path: 'userhome/:screen_name',
    component: UserTimelineComponent
  },
  {
    path: 'users/:screen_name',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
