import { Component , OnInit, ViewChild } from '@angular/core';
import { TwitterService } from './twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TwitterService]
})
export class AppComponent implements OnInit {
  @ViewChild('in1',{static:true}) public in1:HTMLInputElement;
  // login selfuser
  user;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.twitter.user().subscribe(user => this.user = user.data);
  }

  clicked() {
    console.log(this.in1.nativeElement.value)
  }

}
