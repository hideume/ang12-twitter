import { Component , Input ,Output,OnInit,ViewChildren,
          EventEmitter,
          QueryList, 
          ElementRef,TemplateRef} from '@angular/core';

import { MatDialog } from '@angular/material/dialog'

import { Tweet } from '../shared/tweet';
import { Router } from '@angular/router';
//import { TwgetComponent } from './twget/twget.component';
//import { ComponentFactory, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
//import { animate } from '@angular/animations';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  //factory: ComponentFactory<TwgetComponent>;

  @Input() tweet: Tweet;
  @Input() retweet: Tweet;
  @Input() count: string;
  // actionの使い方が違うようだなあ、なにしたかったんだろう？
  @Output() action = new EventEmitter<{property: string, tweet: Tweet}>();
  @ViewChildren('imgtags',{read:ElementRef}) imgs:QueryList<ElementRef>;

  mediaflg:boolean;

  constructor(
    //public viewContainerRef: ViewContainerRef,
    //private resolver: ComponentFactoryResolver
    private route:Router, //routerLinkのために必要だと思っているのだが・・
    private dialog: MatDialog
  ){
    //this.mediaurl = "tweet.entities?.media[0].media_url_https";
  };


  ngOnInit() {
    //this.factory = this.resolver.resolveComponentFactory(TwgetComponent);
    //this.viewContainerRef.createComponent(this.factory);
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

  toggleAction(property: 'favorite'|'retweet') {
    this.action.emit({property, tweet: this.tweet});
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
    }else{
      //backの場合、前をblockとする。
      setno = Math.max(setno-1,0)
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

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
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
    tw.extended_entities.media[0].video_info.variants.forEach((va)=> {
      if(va.content_type == 'video/mp4' && (va.bitrate <= 832000)){
        rt = va.url; 
      }
    });
    return rt;
  }
}
