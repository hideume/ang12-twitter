import { Component , Input ,Output,OnInit,ViewChildren,
          EventEmitter,
          QueryList, TemplateRef,
          ElementRef} from '@angular/core';
import { Tweet } from './tweet';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
// import { YouTubePlayer } from '@angular/youtube-player'
import { TwitterService } from '../twitter.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
//import { TwgetComponent } from './twget/twget.component';
//import { ComponentFactory, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
//import { animate } from '@angular/animations';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']

})
export class TweetComponent implements OnInit {

  //factory: ComponentFactory<TwgetComponent>;

  @Input() tweet: Tweet;
  @Input() retweet: Tweet;
  @Input() count: string;
  // actionの使い方が違うようだなあ、なにしたかったんだろう？
  //@Output() action = new EventEmitter<{property: string, tweet: Tweet}>();
  @ViewChildren('imgtags',{read:ElementRef}) imgs:QueryList<ElementRef>;

  mediaflg:boolean;
  actionflg:boolean = false;
  public imgNo = 1;
  public c_newState:string;

  constructor(
    //public viewContainerRef: ViewContainerRef,
    //private resolver: ComponentFactoryResolver
    private route:Router, //routerLinkのために必要だと思っているのだが・・
    private twitter:TwitterService,
    private dialog: MatDialog
  ){
    //this.mediaurl = "tweet.entities?.media[0].media_url_https";
  };


  ngOnInit() {
    //this.factory = this.resolver.resolveComponentFactory(TwgetComponent);
    //this.viewContainerRef.createComponent(this.factory);
  }


  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }


  hasPhoto(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.entities.media.length 
        && tweet.entities.media[0].type === 'photo') {
      return true;
    }
    return false;
  }

  hasMovie(tweet: Tweet) {
    if (tweet.entities.media !=null
      　&& tweet.extended_entities != null 
        && tweet.extended_entities.media.length 
        && tweet.extended_entities.media[0].type === 'video') {
      return true;
    }else{
      return false;
    }
  }

  //2
  hasPhoto2(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.extended_entities.media.length > 1 ) {
      return true;
    }
    return false;
  }

  //retwetを操作させるとここにくる
  toggleAction(property: 'favorite'|'retweet',ref:TemplateRef<any>) {
    //this.action.emit({property, tweet: this.tweet});
    this.action2(property,this.tweet,ref);
  }

  TWstatus(msg: any){
    console.log(msg);
  }

  /*
  ダイアログからよばれる。
  */
  imagemv(norp,tweet: Tweet){
    let setno = this.getnum();
    let i = 0;
    if(norp==1){
     //nextの場合、次をblockとする。
      setno = Math.min(setno + 1,this.imgs.length - 1);
      this.imgNo = setno+1;
    }else{
      //backの場合、前をblockとする。
      setno = Math.max(setno-1,0)
      this.imgNo = setno+1;
    }
    this.imgs.forEach(im =>{
      if(i==setno){
        im.nativeElement.style.display = "block";
      }else{
        im.nativeElement.style.display = "none";
      }
      i=i+1;
    });
  }

  // blockのある番号を返す
  getnum():number {
    let i = 0;
    let ri = 0;
    this.imgs.forEach(im =>{
      if(im.nativeElement.style.display=='block'){
        ri = i;
      };
      i=i+1;
    });
    return ri;
  };

  getMovie(tw:Tweet):string {
    var rt:string;
    var bit:number;
    tw.extended_entities.media[0].video_info.variants.forEach((va)=> {
      if(va.content_type == 'video/mp4' && (va.bitrate <= 832000)){
        rt = va.url;
        bit = va.bitrate; 
      }
    });
    //console.log("Download="+rt+" bitrate="+bit);
    return rt;
  }

  //tweets.componentから移植したが・・toggleActionでいいのか？
  action2(action,tweet:Tweet,ref:TemplateRef<any>) {

    const stateKey = action.property === 'favorite' ? 'favorited' : 'retweeted';
    this.c_newState = action.property;
    //const newState = !action.tweet[stateKey];
    //これはreteetをトグルしないといけないのだがとりあえずtrueにする
    const newState = true;

    //this.inflight = true;
    this.twitter.action(action, tweet.id_str, newState).subscribe(tweet2 => {
      tweet2[stateKey] = newState;
      tweet2[action + '_count'] += newState ? 1 : -1;
      //結果をモーダルボックスに表示
      //this.actionflg = true;

      //以下みたいにしたいんだが、TemplateRefを参照しないといかんなあ
      this.openDialogWithTemplateRef(ref);
    },error => {console.log("action error"+error)}
    );
  }
  getVid(tweet:Tweet):string {
    if(tweet.entities.urls.length==0)return null; 
    let m= tweet.entities.urls[0].display_url.match('youtu.be/(.+)');
    if(m!=null){
      console.log("hit="+m[1]);
      return m[1]
    }else{
      return null;
    }
  }
  hasYoutube(tweet:Tweet):boolean{
    if(tweet.entities.urls.length==0)return false; 
    let m= tweet.entities.urls[0].display_url.match('youtu.be');
    if(m!=null){
      //console.log("has youtube.")
      return true;
    }else{
      return false;
    }
  }
}
