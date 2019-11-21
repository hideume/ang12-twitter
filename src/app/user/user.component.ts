import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private twitter: TwitterService,
    private route: ActivatedRoute ) { }
  userres;

  ngOnInit() {
    var name = this.route.snapshot.paramMap.get('screen_name');  
    this.twitter.users(name)
    .subscribe(dt=>{
      this.userres = dt.data;
    });
    //console.log(this.userres.data);
  }

}
