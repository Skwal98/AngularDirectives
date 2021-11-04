import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, Output } from '@angular/core';
import { concat, fromEvent, merge, Observable } from 'rxjs';
import {
  debounceTime,
  map,
  repeatWhen,
  skipUntil,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Directive({
  selector: '[drag]',
})
export class DragDirective {
  @Output('drag') drag: Observable<[number, number]>;
  @Output('dragStart') dragStart: Observable<unknown>;
  @Output('dragStop') dragStop: Observable<unknown>;

  constructor(elementRef: ElementRef) {
      
    const mouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
    const { body } = document; //todo: change to token
    const mouseMove$ = fromEvent(document, 'mousemove');
    const mouseLeave$ = fromEvent(body, 'mouseleave');
    const mouseUp$ = fromEvent(body, 'mouseup');

    const moveUntil$ = merge(mouseUp$, mouseLeave$);

    this.dragStart = mouseDown$.pipe(switchMap(() => mouseMove$.pipe(take(1))));
    this.dragStop = this.dragStart.pipe(switchMap(() => moveUntil$));

    this.drag = this.dragStart.pipe(
      switchMap(() => mouseMove$.pipe(takeUntil(moveUntil$))),
      map((x: MouseEvent) => [x.clientX, x.clientY])
    );
  }
}

export class Point {
  x: number;
  y: number;
  constructor(x, y: number) {
    this.x = x;
    this.y = y;
  }
}

//old version drag:
/*
        //old version
        const {body} = document; //todo: change to token
        const mouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        const mouseUp$ = fromEvent(body, 'mouseup');
        const mouseMove$ = fromEvent(elementRef.nativeElement, 'mousemove');
        const mouseLeave$ = fromEvent(body, 'mouseleave');

        const moveUntil$ = merge(mouseUp$, mouseLeave$);

        this.drag = mouseMove$ 
            .pipe(
                debounceTime(2),
                takeUntil(moveUntil$),
                repeatWhen(() => mouseDown$),
                skipUntil(mouseDown$),
                map((x: MouseEvent) => new Point(x.clientX, x.clientY))
            );*/
