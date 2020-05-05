import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  trends ;
  constructor(private route:ActivatedRoute,private twitter:TwitterService) {} 

  ngOnInit() {
    this.trends = [];

    this.route.paramMap.subscribe(paramsMap => {
      this.twitter.trend()
      .subscribe(dt=>{
        this.trends = dt.data[0].trends;
      },error=>{
        console.log("search error"+error);
        this.trends = [];
      });
    });
  }

  search(arg):string {
    if(arg[0]=="#"){
      arg=arg.replace("#","23");
    }
    return "search/"+arg;
  }

}
