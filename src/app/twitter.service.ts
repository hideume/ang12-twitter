import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError,Observable,Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry,catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


export interface TwitterResponse {
  data: any;
  includes: any;
  resp: any;
}

export interface stmsg {
  status: any;
}


@Injectable()
export class TwitterService {
  

  constructor(private http: HttpClient) { }

  user() {
    return this.http.get<TwitterResponse>(`${environment.api}/user`);
  }

  users(sc: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/users?screen_name=${sc}`);
  }

  list(sc: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/list?screen_name=${sc}`);
  }

 home(since?: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/home?since=${since}`);
  }

  userhome(screen_name: string) {
    //console.log(screen_name);
    return this.http.get<TwitterResponse>(`${environment.api}/userhome?screen_name=${screen_name}`);
  }

  trend() {
    //console.log(screen_name);
    return this.http.get<TwitterResponse>(`${environment.api}/trends`);
  }

  status_show(id: string) {
    //console.log("status_show ="+id);
    //var rres:Subject<TwitterResponse> = new Subject();;
    //return 
    //let aa;
    return this.http.get<TwitterResponse>(`${environment.api}/status_show?id=${id}`)
    .pipe(
      map(res=>{
        return res;
      })
    )
    //.subscribe( res =>{
    //  aa = res;
    //  rres.next(aa);
    //});
    //return rres;
    
  }

  limit() {
    return this.http.get<TwitterResponse>(`${environment.api}/limit`);
  }

  retweet(id: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/retweet?id=${id}`);
  }

  search(query: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/search?query=${query}&maxResults=100`);
  }

  tweet(msg: string) {
    var body:stmsg = {status: msg };
    var state = true;

    return  this.http.get<TwitterResponse>(`${environment.api}/tweet?msg=${msg}`);
  }

  action(property: 'favorite'|'retweet', id: string, state: boolean) {
    return this.http.post<TwitterResponse>(`${environment.api}/${property}/${id}`, {state});
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
 }

