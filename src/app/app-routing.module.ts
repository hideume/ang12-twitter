import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimitComponent } from '../app/limit/limit.component';
import { TweetsComponent } from '../app/tweets/tweets.component';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { UserComponent } from './user/user.component';
import { RetweetComponent } from './retweet/retweet.component';
import { RetweetGraphComponent } from './retweetgraph/retweetgraph.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { TrendComponent } from './trend/trend.component';
import { TextuserTimelineComponent } from './textuser-timeline/textuser-timeline.component';

//const routes: Routes = [];

const routes: Routes = [
  {path: '', component: TweetsComponent},
  {path: 'limit',component: LimitComponent},
  {path: 'tweets',component: TweetsComponent},
  {path: 'userhome/:screen_name',component: UserTimelineComponent},
  {path: 'users/:screen_name',component: UserComponent},
  {path: 'retweet/:id',component: RetweetComponent},
  {path: 'retweetg/:id',component: RetweetGraphComponent},
  {path: 'search/:query',component: SearchComponent,pathMatch:'full'},
  {path: 'test',component: TestComponent},
  {path: 'trend',component: TrendComponent},
  {path: 'textuser-timeline/:screen_name',component: TextuserTimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
