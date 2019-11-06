import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class LimitComponent implements OnInit {
  limitText;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.twitter.limit().subscribe(a =>this.limitText = JSON.stringify(a.data.resources,null,5));
  }

}
