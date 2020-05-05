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

  constructor(private twitter:TwitterService,private route:ActivatedRoute) { }

  ngOnInit() {
    //console.log("oninit---");
    this.tweets = [];
    var q ;
    this.route.paramMap.subscribe(paramsMap => {
      q = paramsMap.get('query');
      // パラメータが変わった後の初期化処理
      this.twitter.search(encodeURI(q))
      .subscribe(dt=>{
        this.tweets = dt.data.statuses;
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
  }


}
