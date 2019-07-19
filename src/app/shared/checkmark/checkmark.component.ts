import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss']
})
export class CheckmarkComponent implements OnInit {

  @Input() valid: boolean;
  constructor() { }

  ngOnInit() {
  }

}
