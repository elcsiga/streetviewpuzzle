import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type BarColor = 'dark' | 'light'
@Injectable({
  providedIn: 'root'
})
export class MainUIStateService {


  private barColor = new BehaviorSubject<BarColor>('dark');
  barColor$ = this.barColor.pipe(
    debounceTime(0)
  )
  setBarColor( color: BarColor) {
    this.barColor.next(color);
  }
  constructor() { }
}
