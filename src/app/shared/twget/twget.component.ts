import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TwitterService } from 'src/app/twitter.service';

@Component({
  selector: 'app-twget',
  templateUrl: './twget.component.html',
  styleUrls: ['./twget.component.scss']
})
export class TwgetComponent implements OnInit {
  @Input() twid: string;

  tweet;

  constructor(private twitter:TwitterService) { }

  ngOnInit() {
    this.twitter.status_show(this.twid)
    .subscribe( dat => {
     this.tweet = dat.data;
     console.log("twget Init id="+this.twid+" text "+this.tweet.text);
    })
  }

  ngOnChanges() {
    this.twitter.status_show(this.twid)
    .subscribe( dat => {
     this.tweet = dat.data;
     console.log("twget Changes id="+this.twid+" text "+this.tweet.text);
    })
  }

}
