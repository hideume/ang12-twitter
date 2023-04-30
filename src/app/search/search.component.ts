import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TweetService } from '../shared/tweet.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tweets;
  includes;
  usernames = [];
  nextpage="";
  savequery;

  constructor(private twitter:TwitterService,
    private twitterServ:TweetService,  //これ入れとかないと初期化してしまう？
    private route:ActivatedRoute
    ) { 
      //console.log("search const tws=" + this.twitterServ.tweets.length);
      //console.log("tw since=" + this.twitterServ.since);
    }


  public getUsername(authorid) {
    for (const  us of this.includes.users) {
      //console.log(us.id+" "+authorid);
      if(us.id==authorid){
        return [us.username,us.name];
      }
    };
  };

  
  ngOnInit() {
    console.log("search oninit---");
    this.tweets = [];
    var q ;
    this.route.paramMap.subscribe(paramsMap => {
      q = paramsMap.get('query');
      this.savequery = q;
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
        this.nextpage = dt.meta.next_token;
      },error=>{
        console.log("search error"+error);
        this.tweets = [];
      });
    });
  };

  ngOnDestory():void {
    this.tweets = [];
    this.includes = [];
    this.usernames = [];
  };

  ngOnChanges() {
    console.log("change")
  };

  ngAfterViewChecked() {
    //console.log("view checked")
  };


  nextpagefunc() {
      console.log("nextpage token="+this.nextpage);
      this.usernames = [];
      this.twitter.search(encodeURI(this.savequery)+"&next_token="+this.nextpage)
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
        this.nextpage = dt.meta.next_token;
      },error=>{
        console.log("search error"+error);
        this.tweets = [];
      });
    }
}
