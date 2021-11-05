import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Dropped, Point } from '../../core/directives/drag.directive';

@Component({
  selector: 'app-drag',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.sass']
})
export class DragDropComponent {
  title = 'AngularDirectives';
  @ViewChild('dv') div: ElementRef;

  constructor(private _ab: AnimationBuilder) {
    
  }

  first = true;

  drag(point: Point){
    const {style} = this.div.nativeElement;
    const finalX = point[0] - this.initial[0];
    const finalY = point[1] - this.initial[1];
    style.transform = `translate(${finalX}px, ${finalY}px)`
  }

  
  initial: [number, number];
  start(){
    const element = this.div.nativeElement;
    this.initial = [element.offsetLeft + element.clientWidth / 2, element.offsetTop + element.clientHeight / 2];
  }

  stop(){
    const elStyle = this.div.nativeElement.style;
    const returnAnimation = this._ab.build([
      style({ transform: elStyle.transform }),
      animate(200, style({ transform: `translate(0px, 0px)` }))
    ]);

    
    const player = returnAnimation.create(this.div.nativeElement);    
    player.onDone(() => { 
      elStyle.transform =  `translate(0px, 0px)`;
      player.destroy()
    });
    player.play();
  }

  onDropped(dropped: Dropped){
    //dropped.container.element.nativeElement;
    console.log(dropped);
  }
}
