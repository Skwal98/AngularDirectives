import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Point } from './core/directives/drag.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AngularDirectives';
  size = 250;
  @ViewChild('dv') div: ElementRef;

  constructor() {
    
  }

  changeSize(value){
    this.size = this.size + value;
    this.size = Math.max(Math.min(350, this.size), 150);

    console.log(value);
  }

  drag(point: Point){
  //  console.log(this.div);
  //  console.log(point);
    this.div.nativeElement.style.left = point.x - 250 + 'px';
    this.div.nativeElement.style.top = point.y - 250 + 'px';
    //console.log(x);
  }
}
