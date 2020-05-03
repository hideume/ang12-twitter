import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class LimitComponent implements OnInit {
  limitText;
  limitTable = []

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.twitter.limit().subscribe(a =>{
      this.limitText = a.data.resources;
      var x1 = this.limitText.statuses["/statuses/home_timeline"];
      this.limitTable.unshift(this.settable("home_timeline",x1));
      var x2 = this.limitText.statuses["/statuses/user_timeline"];
      this.limitTable.unshift(this.settable("user_timeline",x2));
      var x3 = this.limitText.users["/users/show/:id"];
      this.limitTable.unshift(this.settable("users_show",x3));
      var x4 = this.limitText.search["/search/tweets"];
      this.limitTable.unshift(this.settable("search",x4));
    });
  }

  settable(nm:string,arg){
    var f = [];
    f.unshift(new Date(arg.reset*1000));
    f.unshift(arg.remaining);
    f.unshift(arg.limit);
    f.unshift(nm);
    return f;
  }

}
