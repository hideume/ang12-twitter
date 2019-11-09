import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  
 })

export class TwitterServiceOld {

  api_url = 'http://localhost:3000';
    
    constructor(private http: HttpClient) { }
  
    getTimeline(): Observable<any[]> {
      return this.http
        .get<any[]>(this.api_url+'/home_timeline');
  
    }
  
    getMentions():  Observable<any[]>{
      return this.http
        .get<any[]>(this.api_url+'/mentions_timeline');
  
    }
  
  }