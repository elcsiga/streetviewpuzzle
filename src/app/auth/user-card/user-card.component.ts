import { Component, OnInit, Input } from '@angular/core';
import { PublicUser } from 'functions/src/common/auth';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: PublicUser;
  constructor() { }

  ngOnInit() {
  }

}
