import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetDirective } from './tweet.directive';



@NgModule({
  declarations: [TweetDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
