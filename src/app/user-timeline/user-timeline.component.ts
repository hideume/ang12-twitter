import { Component ,OnInit} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
//import { TwitterService } from '../twitterservice.service'
import { TwitterService } from '../twitter.service';
import { Tweet } from '../tweet';

@Component({
  selector: 'app-user',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.scss'],
 })

export class UserTimelineComponent {

  myData;
  ids = [];
  api_url = 'http://localhost:3000';
    
    constructor(private http: HttpClient,private twitter: TwitterService) { }
  
    ngOnInit() {
      this.twitter.userhome('hawaii_hahaha')
        .subscribe(tweets => 
        {
          this.myData = tweets;
          /*
          tweets.data.reverse().forEach(tweet => 
          {
            if (this.ids.indexOf(tweet.id_str) < 0) 
            {
            // stack id_str,& tweet
              this.ids.push(tweet.id_str);
              this.myData.unshift(tweet);
            }
          })
          */
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