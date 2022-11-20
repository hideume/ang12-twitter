import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tweets;
  includes;
  usernames = [];


  public getUsername(authorid) {
    for (const  us of this.includes.users) {
      //console.log(us.id+" "+authorid);
      if(us.id==authorid){
        return [us.username,us.name];
      }
    };
  };

  constructor(private twitter:TwitterService,private route:ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("search oninit---");
    this.tweets = [];
    var q ;
    this.route.paramMap.subscribe(paramsMap => {
      q = paramsMap.get('query');
      // パラメータが変わった後の初期化処理
      this.twitter.search(encodeURI(q))
      .subscribe(dt=>{
        //v1の場合
        //this.tweets = dt.data.statuses;
        //v2の場合
        this.tweets = dt.data;
        this.includes = dt.includes;
        for (const tw of this.tweets) {
          let nm = this.getUsername(tw.author_id);
          //console.log(nm);
          this.usernames.push(nm);
        };
      },error=>{
        console.log("search error"+error);
        this.tweets = [];
      });
    });
   
  }

  ngOnChanges() {
    console.log("change")
  }

  ngAfterViewChecked() {
    //console.log("view checked")
  }

  public ngDestory() {
    this.tweets = [];
    this.includes = [];
    this.usernames = [];
  }



}
