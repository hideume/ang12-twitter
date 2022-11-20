import { Pipe, PipeTransform, SecurityContext, ComponentFactory } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TwitterService } from '../twitter.service';
import { TestBed } from '@angular/core/testing';

@Pipe({
  name: 'Symple'
})
/*
このpipeはハッシュタグやhttpに<a>タグをつけたりしてます
*/
export class SimplePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,private twitter: TwitterService) {}

  transform(agtext:String, args?: any): any {
    let text = this.sanitizer.sanitize(SecurityContext.NONE, agtext);

    text = text.replace(/(https:\/\/.+)$/,'<a href="$1">$1</a>')

    text = text.replace(/@(\w+)\s/,'<a href="/userhome/$1">@$1</a>')
    //return text;
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
