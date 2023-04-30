import { TwitterService } from '../twitter.service';
import { Injectable,ElementRef } from '@angular/core';
import { Tweet } from './tweet';



@Injectable({
  providedIn: 'root',
})

export class TweetService {

public tweets: Tweet[]=[];
ids=[] ;
timer;
public since = '';
//inputData;
public HeaderInputRef:ElementRef<any>;

constructor(private twitter: TwitterService) {
    console.log("-----TweetService constract");
    //このサービスは画面に関係なくtweetをスタックし続ける
    this.getnewTweets();
    this.timer = setInterval(() => this.getnewTweets(), 61000);
}

getTweets():Tweet[]{
  return this.tweets;
}

getnewTweets() {
    //ここではsince以降のtweetを読み込む
    console.log("new tweets = " + this.tweets.length + " since = " + this.since);
    this.twitter.home(this.since).subscribe(tweets => {
      tweets.data.reverse().forEach(tweet => {
        if (this.ids.indexOf(tweet.id_str) < 0) {
          // stack id_str,& tweet
          this.ids.push(tweet.id_str);
          this.tweets.unshift(tweet);
        }
      });
      this.since = this.tweets[0].id_str;
      this.cleanUp();
    });
}

  //500までため込む
  cleanUp() {
    if (this.tweets.length > 500) {
      this.tweets.splice(500);
      this.ids.splice(500);
    }
  }
    
}