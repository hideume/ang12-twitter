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
  }

  private makeList() {
    var c = 1;
    var t0 = new Date(this.retweets[0].created_at);
    this.retweets.forEach(ts => {
      var tx = new Date(ts.created_at);
      var okflg = true;
      while(okflg){
        if(( t0.getTime() - tx.getTime() )/60/1000 < c){
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
