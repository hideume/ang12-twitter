import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { TwitterService } from '../twitter.service';
import { Tweet } from '../shared/tweet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-textuser-timeline',
  templateUrl: './textuser-timeline.component.html',
  styleUrls: ['./textuser-timeline.component.scss']
})
export class TextuserTimelineComponent implements OnInit {

  myData:Tweet[] =[];
  ids = [];
  api_url = 'http://localhost:3000';
  s_name;
    
    constructor(private http: HttpClient,
      private twitter: TwitterService,
      private route:ActivatedRoute) { }
  
    ngOnInit() {
      var name = this.route.snapshot.paramMap.get('screen_name');
      this.s_name = name;
      this.twitter.userhome(name)
        .subscribe(tweets => 
        {
          //this.myData = tweets;
          
          tweets.data.reverse().forEach(tweet => 
          {
            if (this.ids.indexOf(tweet.id_str) < 0) 
            {
            // stack id_str,& tweet
              this.ids.push(tweet.id_str);
              this.myData.unshift(tweet);
            }
          })
          
        })
    }

    getTimeline(): Observable<any[]> {
      return this.http
        .get<any[]>(this.api_url+'/home_timeline');
      //this.myData = res;
  
    }
  
    getMentions():  Observable<any[]>{
      return this.http
        .get<any[]>(this.api_url+'/mentions_timeline');
  
    }
  

}
