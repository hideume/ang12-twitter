import { Component , OnInit, ViewChild , ElementRef} from '@angular/core';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TwitterService } from './twitter.service';
import { TweetService } from './shared/tweet.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //ヘッダーのinput要素
  @ViewChild('in1',{static:true,read: ElementRef}) public in1:ElementRef;
  // login selfuser
  user;
  aptwsv;
  hPosition:MatSnackBarHorizontalPosition = "right";
  vPosition:MatSnackBarVerticalPosition = "top";

  constructor(private twitter: TwitterService,private router:Router,
    private twsv:TweetService, //これを指定しておかないとリロードする。
    private _snackbar:MatSnackBar
    ) {
      this.aptwsv=twsv;
    }

  //初期設定で自分のuserをthis.userに設定する
  ngOnInit() {
    this.twitter.user().subscribe(user => this.user = user.data);
  }

  //ヘッダーでserchをクリックした場合
  search() {
    //console.log("clicked"+this.in1.nativeElement.value);
    //this.router.navigate(['/']);
    this.router.navigate(['/search',this.in1.nativeElement.value]);
  }

  tweet() {
    var msg = this.in1.nativeElement.value;
    this.twitter.tweet(msg)
    .subscribe(d=>{console.log("tweet ok");
      this.in1.nativeElement.value = "";
      this._snackbar.open('msg','tweetしました',
      {horizontalPosition:this.hPosition,
        verticalPosition:this.vPosition,
        duration:3000})
    },e=>{console.log("tweet error")});
  }
}
