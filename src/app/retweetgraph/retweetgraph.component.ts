import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retweetgraph',
  templateUrl: './retweetgraph.component.html',
  styleUrls: ['./retweetgraph.component.scss']
})
export class RetweetGraphComponent implements OnInit {

  retweets;
  lasttime;
  totalspeed;
  speed;
  retweet_id;
  countList = [0];
  interval = 1

  constructor(private twitter:TwitterService,private route:ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.retweet_id = id; 
    this.twitter.retweet(id)
    .subscribe(dt=>{
      this.retweets = dt.data;
      this.calcSpeed();
      this.makeList();
    },error=>{
      console.log(error);
      this.retweets = [error];
    });
  }

  private calcSpeed() {
      var t0 = new Date(this.retweets[0].created_at);
      var t1 = new Date(this.retweets[this.retweets.length-1].created_at);
      var t2 = new Date(this.retweets[0].retweeted_status.created_at);
      this.lasttime = t1;
      this.speed = (this.retweets.length-1)/( t0.getTime() - t1.getTime() )*60*1000;
      this.totalspeed = this.retweets[0].retweet_count/( t0.getTime() - t2.getTime() )*60*1000;
      let diftime = (t0.getTime() - t1.getTime())/1000;
      if(diftime < 20*60 ) { //30時間以内の場合最大15
        this.interval = 1;
      }if(diftime < 30*60 ) { //30時間以内の場合最大15
        this.interval = 2;
      }else if( diftime < 2*60*60 ) { //2時間以内の場合、最大24
        this.interval = 5;
      }else if( diftime < 5*60*60 ) { //5時間以内の場合、最大30
        this.interval = 10;
      }else if( diftime < 10*60*60 ) {　//10時間以内の場合、最大20
        this.interval = 30;
      }else if( diftime < 24*60*60 ) {　//24時間以内の場合、最大24
        this.interval = 60;
      }else {
        this.interval = 120;
      };
  }

  private makeList() {
    var c = 1;
    var t0 = new Date(this.retweets[0].created_at);
    this.retweets.forEach(ts => {
      var tx = new Date(ts.created_at);
      var okflg = true;
      //ここでループするわけでないのだが、０のc＝行を追加するだけの
      //パターンがあるので以下のループでいいということか
      while(okflg){
        if(( t0.getTime() - tx.getTime() )/60/1000 < c* this.interval){
          this.countList[c-1]++
          okflg = false; 
        }else{
          this.countList.push(0);
          c = c + 1;
        }
      }
    });
  }

}
