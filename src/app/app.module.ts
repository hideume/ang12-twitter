import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import '@cds/core/icon/register.js';
//import { ClarityIcons, userIcon } from '@cds/core/icon';
import {MatIconModule} from '@angular/material/icon'
//import { MomentModule } from 'angular2-moment';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/ja';

import { AppComponent } from './app.component';
import { TweetComponent } from './shared/tweet.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetPipe } from './shared/tweet.pipe';
import { LimitComponent } from './limit/limit.component';
import { AppRoutingModule } from './app-routing.module';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { UserComponent } from './user/user.component';
import { RetweetComponent } from './retweet/retweet.component';
import { RetweetGraphComponent } from './retweetgraph/retweetgraph.component';
import { SearchComponent } from './search/search.component';
import { TweetService } from './shared/tweet.service';
import { TwitterService } from './twitter.service';
import { TestComponent } from './test/test.component';
import { TwgetComponent } from './shared/twget/twget.component';
import { TrendComponent } from './trend/trend.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetsComponent,
    TweetPipe,
    LimitComponent,
    UserTimelineComponent,
    UserComponent,
    RetweetComponent,
    RetweetGraphComponent,
    SearchComponent,
    TestComponent,
    TwgetComponent,
    TrendComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    MomentModule,
    AppRoutingModule,
    RouterModule ,
    ClrIconModule,
    MatIconModule,
  ],
  exports: [
    UserTimelineComponent
  ],
  providers: [TweetService,
    TwitterService,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
