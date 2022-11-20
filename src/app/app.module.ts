import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ClarityModule, ClrIconModule } from '@clr/angular';
//import '@cds/core/icon/register.js';
//import { ClarityIcons, userIcon } from '@cds/core/icon';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatDialogModule} from '@angular/material/dialog'
import {MatTableModule} from '@angular/material/table'
import {MatInput, MatInputModule} from '@angular/material/input'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {A11yModule} from '@angular/cdk/a11y'
import {YouTubePlayerModule} from '@angular/youtube-player'

//import { MomentModule } from 'angular2-moment';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/ja';

import { AppComponent } from './app.component';
import { TweetComponent } from './shared/tweet.component';
import { QuoteComponent } from './quote/quote.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetPipe } from './shared/tweet.pipe';
import { SimplePipe } from './shared/simple.pipe';
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
import { TextuserTimelineComponent } from './textuser-timeline/textuser-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    QuoteComponent,
    TweetsComponent,
    TweetPipe,
    SimplePipe,
    LimitComponent,
    UserTimelineComponent,
    UserComponent,
    RetweetComponent,
    RetweetGraphComponent,
    SearchComponent,
    TestComponent,
    TwgetComponent,
    TrendComponent,
    TextuserTimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MomentModule,
    AppRoutingModule,
    RouterModule ,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    A11yModule,
    YouTubePlayerModule,
    //ClarityModule,
    //ClrIconModule,
  ],
  exports: [
    UserTimelineComponent
  ],
  providers: [TweetService,
    TwitterService,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
