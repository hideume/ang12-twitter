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
  //@ViewChild('dynamic',{read: ViewContainerRef, static: false} ) viewContainerRef: ViewContainerRef;

  constructor(
    //public viewContainerRef: ViewContainerRef,
    //private resolver: ComponentFactoryResolver
  ){};


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

  toggleAction(property: 'favorite'|'retweet') {
    this.action.emit({property, tweet: this.tweet});
  }

  TWstatus(msg: any){
    console.log(msg);
  }
}
