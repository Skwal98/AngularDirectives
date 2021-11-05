import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.sass']
})
export class ZoomComponent {
  title = 'AngularDirectives';
  size = 250;
  @ViewChild('dv') div: ElementRef;

  constructor(private _ab: AnimationBuilder) {
    
  }

  changeSize(value){
    this.size = this.size + value;
    this.size = Math.max(Math.min(350, this.size), 150);

    console.log(value);
  }
}
