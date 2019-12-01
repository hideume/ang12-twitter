import { Component , OnInit, ViewChild , ElementRef} from '@angular/core';
import { TwitterService } from './twitter.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TwitterService]
})
export class AppComponent implements OnInit {
  @ViewChild('in1',{static:true,read: ElementRef}) public in1:ElementRef;
  // login selfuser
  user;

  constructor(private twitter: TwitterService,private router:Router) {}

  ngOnInit() {
    this.twitter.user().subscribe(user => this.user = user.data);
  }

  clicked() {
    //console.log("clicked"+this.in1.nativeElement.value);
    //this.router.navigate(['/']);
    this.router.navigate(['/search',this.in1.nativeElement.value]);
  }

  tweet() {
    var msg = this.in1.nativeElement.value;
    this.twitter.tweet(msg)
    .subscribe(d=>{console.log("tweet ok")},e=>{console.log("tweet error")});
  }

}
