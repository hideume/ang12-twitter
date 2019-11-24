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
  speed;
  retweet_id;

  constructor(private twitter:TwitterService,private route:ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.retweet_id = id; 
    this.twitter.retweet(id)
    .subscribe(dt=>{
      this.retweets = dt.data;
      this.calcSpeed();
    },error=>{
      console.log(error);
      this.retweets = [error];
    });
  }

  private calcSpeed() {
    var t0 = new Date(this.retweets[0].created_at);
    var t1 = new Date(this.retweets[this.retweets.length-1].created_at);
    this.lasttime = t1;
    this.speed = ( t0.getTime() - t1.getTime() )/60/1000/this.retweets.length-1;
  }

}
