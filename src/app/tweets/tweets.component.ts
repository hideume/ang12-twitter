import { Component, OnInit, Input, HostListener  } from '@angular/core';
import { Tweet } from '../shared/tweet';
import { TwitterService } from '../twitter.service';
import { TweetService } from '../shared/tweet.service';
//import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
  //providers: [TweetService]
})
export class TweetsComponent implements OnInit  {
  inflight = false;
  tweets: Tweet[]=[];

  constructor(private tweetserv:TweetService,private twitter:TwitterService) {}

  ngOnInit() {
    this.tweets = this.tweetserv.getTweets();
  }

  @HostListener('window:Keydown',['$event'])
  OnKeydown(event: KeyboardEvent) {
    console.log(event);
    if(event.key==="Home"){
      console.log("Home press")
    }
  }

  action(action, index) {
    if (this.inflight) {
      return;
    }

    const stateKey = action.property === 'favorite' ? 'favorited' : 'retweeted';
    const newState = !action.tweet[stateKey];

    this.inflight = true;
    this.twitter.action(action.property, action.tweet.id_str, newState).subscribe(tweet => {
      this.tweets[index][stateKey] = newState;
      this.tweets[index][action.property + '_count'] += newState ? 1 : -1;
      this.inflight = false;
    });
  }
}
