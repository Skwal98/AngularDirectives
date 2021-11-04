import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
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

  first = true;

  drag([x, y]){
    const {style} = this.div.nativeElement;
    const finalX = x - this.initial[0];
    const finalY = y - this.initial[1];
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
}
