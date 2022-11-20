import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { TwitterService } from '../twitter.service';
import { Tweet } from '../shared/tweet';
import { ActivatedRoute } from '@angular/router';
import { text } from 'body-parser';

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
  re_counter;
  re_percent;
    
    constructor(private http: HttpClient,
      private twitter: TwitterService,
      private route:ActivatedRoute) { }
  
    ngOnInit() {
      var name = this.route.snapshot.paramMap.get('screen_name');
      this.s_name = name;
      this.re_counter = 0;
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
              let text2:String = tweet.text;
              if(text2.substring(0,2)=="RT")this.re_counter++;
            }
          })
          this.re_percent = (this.re_counter/this.myData.length*100).toFixed(1);
          
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
