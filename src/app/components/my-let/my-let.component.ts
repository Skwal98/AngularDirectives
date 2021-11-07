import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'my-let',
  templateUrl: './my-let.component.html',
  styleUrls: ['./my-let.component.sass']
})
export class MyLetComponent implements AfterViewChecked{

  showing$: BehaviorSubject<boolean>;

  constructor(private _cd: ChangeDetectorRef) {
    this.showing$ = new BehaviorSubject<boolean>(false);
  }

  ngAfterViewChecked(): void {
  }

  show(){
    this.showing$.next(true);
  }
  
  hide(){
    this.showing$.next(false);
  }  
}
