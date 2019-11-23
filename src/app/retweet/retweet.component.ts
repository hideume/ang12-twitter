import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.scss']
})
export class RetweetComponent implements OnInit {

  retweets;

  constructor(private twitter: TwitterService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id'); 
    this.twitter.retweet(id)
    .subscribe(dt=>{
      this.retweets = dt.data;
    },error=>{
      console.log(error);
      this.retweets = [error];
    });
    
  }

}
