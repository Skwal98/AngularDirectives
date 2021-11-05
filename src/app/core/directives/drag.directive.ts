import { Directive, ElementRef, Output } from '@angular/core';
import {
  fromEvent,
  merge,
  Observable,
} from 'rxjs';
import {
  filter,
  map,
  share,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { DropDirective } from './drop.directive';

@Directive({
  selector: '[myDrag]',
})
export class DragDirective {
  @Output('myDrag') drag: Observable<Point>;
  @Output('dragStart') dragStart: Observable<unknown>;
  @Output('dragStop') dragStop: Observable<Point>;
  @Output('myDropped') dropped$: Observable<Dropped>;

  constructor(elementRef: ElementRef) {
    const mouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
    const { body } = document; //todo: change to token
    const mouseMove$ = fromEvent(document, 'mousemove');
    const mouseLeave$ = fromEvent(body, 'mouseleave');
    const mouseUp$ = fromEvent(body, 'mouseup');

    const moveUntil$ = merge(mouseUp$, mouseLeave$);

    this.dragStart = mouseDown$.pipe(
      switchMap(() => mouseMove$.pipe(take(1), takeUntil(moveUntil$))),
      tap((x) => {
        x.preventDefault();
      }),
      share()
    );
    this.dragStop = this.dragStart.pipe(
      switchMap(() => moveUntil$.pipe(take(1))),
      share(),
      map((x: MouseEvent) => {
        x.preventDefault();
        return [x.clientX, x.clientY];
      })
    );

    this.drag = this.dragStart.pipe(
      switchMap(() => mouseMove$.pipe(takeUntil(moveUntil$))),
      map((x: MouseEvent) => {
        x.preventDefault();
        return [x.clientX, x.clientY];
      })
    );

    this.dropped$ = this.dragStop.pipe(
      map(x => new Dropped(DropDirective.checkInArea(x), this)),
      filter(x => x.container !== undefined)
      );
  }
}

export type Point = [number, number];

export class Dropped{
  constructor(
  readonly container: DropDirective,
  readonly item?: DragDirective){}
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

//old version second:


    /* const mouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
    const { body } = document; //todo: change to token
    const mouseMove$ = fromEvent(document, 'mousemove');
    const mouseLeave$ = fromEvent(body, 'mouseleave');
    const mouseUp$ = fromEvent(body, 'mouseup');

    const moveUntil$ = merge(mouseUp$, mouseLeave$);

    this.dragStart = mouseDown$.pipe(switchMap(() => mouseMove$.pipe(take(1), takeUntil(moveUntil$))), tap(x=> console.log('start')), share());
    this.dragStop = this.dragStart.pipe(switchMap(() => moveUntil$.pipe(take(1))), tap(x=> console.log('stop')), share());

    this.drag = this.dragStart.pipe(
      switchMap(() => mouseMove$.pipe(takeUntil(moveUntil$))),
      tap(x=> console.log('drag')),
      map((x: MouseEvent) => {
        return [x.clientX, x.clientY];
      })
    );
  }*/