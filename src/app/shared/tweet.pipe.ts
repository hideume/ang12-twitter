import { Pipe, PipeTransform, SecurityContext, ComponentFactory } from '@angular/core';
import { Tweet } from './tweet';
import { DomSanitizer } from '@angular/platform-browser';
import { TwitterService } from '../twitter.service';

@Pipe({
  name: 'tweet'
})
export class TweetPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,private twitter: TwitterService) {}

  transform(tweet: Tweet, args?: any): any {
    let text = this.sanitizer.sanitize(SecurityContext.NONE, tweet.full_text);
    if (!text)text = tweet.text;

    // Replace screen names with links
    if (tweet.entities.user_mentions) {
      tweet.entities.user_mentions.forEach(mention => {
        text = text.replace(new RegExp(`@${mention.screen_name}`, 'gi'), `<a href="https://twitter.com/${mention.screen_name}" target="_blank">@${mention.screen_name}</a>`);
      });
    }

    // Replace # hashtag with links
    //text = text.replace(new RegExp('#(\\S+)([\\s|$])', 'gi'),`<a  [routerLink]=['/search',23\$1] routerLinkActive="active-link">#\$1\$2</a>`);
    text = text.replace(new RegExp('#(\\S+)([\\s|$])', 'gi'),`<a  href="search/\$1" >#\$1\$2</a>`);


    // Replace links with clickable links
    if (tweet.entities.urls) {
      tweet.entities.urls.forEach(url => {
        
        var re = new RegExp("twitter.com/(.+)/status/(.+)?");
        var ans = re.exec(url.expanded_url);
        if(ans){
          //console.log(ans[1]+" "+ans[2]);
          //これをやるとでるにはでるが遅い
          //text = text.replace(url.url, `<amp-twitter data-tweetid="`+ans[2]+`" width="500" height="50" layout="fixed" dnt="true" cards="hidden"></amp-twitter>`);
          
          //これはどうもいまくいかない
          //text = text.replace(url.url, `<app-tweet tweet="`+tweet+`"></app-tweet>`);
         
          //今はこれを実験
          //しかし、これはどうも非同期なのでうまく動かない
          /*
          this.twitter.status_show(ans[2])
           .subscribe( dat => {
            var tw1:Tweet;
            tw1 = dat.data;
            console.log("tweet show "+tw1.text);
            text = text.replace(url.url,`<div class="card">`+tw1.text+`</div>`);
           });
          */
          //これもやってみたが、動的componentで難しい
            text = text.replace(url.url,`<app-twget twid="`+ans[2]+`"></app-twget>`);
           //text = text.replace(url.url, `<a href="${url.url}" target="_blank">${url.display_url}</a>`);
          }else{
        
          text = text.replace(url.url, `<a href="${url.url}" target="_blank">${url.display_url}</a>`);
        }
      });
    }
    
    // Remove media urls since we display them
    if (tweet.entities.media) {
      tweet.entities.media.forEach(url => {
        text = text.replace(url.url, '');
      });
    }

    // Replace newline characters
    text = text.replace(/\n/gm, '<br />');

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
