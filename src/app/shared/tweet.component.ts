import { Component , Input ,Output,OnInit,OnChanges,ViewChild,
          EventEmitter } from '@angular/core';
import { Tweet } from './tweet';
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
  @Output() action = new EventEmitter<{property: string, tweet: Tweet}>();

  im1disp = "block";
  im2disp = "none";
  constructor(
    //public viewContainerRef: ViewContainerRef,
    //private resolver: ComponentFactoryResolver
  ){
    //this.mediaurl = "tweet.entities?.media[0].media_url_https";
  };


  ngOnInit() {
    //this.factory = this.resolver.resolveComponentFactory(TwgetComponent);
    //this.viewContainerRef.createComponent(this.factory);
  }

  ngOnChanges(){
  }

  hasPhoto(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.entities.media.length 
        && tweet.entities.media[0].type === 'photo') {
      return true;
    }
    return false;
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

  imagemv(norp,tweet: Tweet){
    if(norp==1){
      this.im1disp = "none";
      this.im2disp = "block";
    }else{
      this.im1disp = "block";
      this.im2disp = "none";
    }
  }
}
