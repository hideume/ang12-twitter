import { Component , Input ,Output,
          EventEmitter } from '@angular/core';
import { Tweet } from './tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']

})
export class TweetComponent {

  @Input() tweet: Tweet;
  @Input() retweet: Tweet;
  @Input() count: string;
  @Output() action = new EventEmitter<{property: string, tweet: Tweet}>();

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
