import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwitterTimelineComponent } from '../app/twitter-timeline/twitter-timeline.component';

//const routes: Routes = [];

const routes: Routes = [
  {
    path: 'twitter_timeline',
    component: TwitterTimelineComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
