import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


export interface TwitterResponse {
  data: any;
  resp: any;
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

 home(since?: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/home?since=${since}`);
  }

  userhome(screen_name: string) {
    console.log(screen_name);
    return this.http.get<TwitterResponse>(`${environment.api}/userhome?screen_name=${screen_name}`);
  }

  limit() {
    return this.http.get<TwitterResponse>(`${environment.api}/limit`);
  }

  action(property: 'favorite'|'retweet', id: string, state: boolean) {
    return this.http.post<TwitterResponse>(`${environment.api}/${property}/${id}`, {state});
  }
}
