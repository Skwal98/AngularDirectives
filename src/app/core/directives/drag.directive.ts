import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, inject, Output } from "@angular/core";
import { concat, fromEvent, merge, Observable } from "rxjs";
import { debounceTime, map, repeatWhen, skipUntil, take, takeUntil, tap } from "rxjs/operators";

@Directive({
    selector: '[drag]'
})
export class DragDirective{

    @Output('drag') drag: Observable<Point>;
    constructor(elementRef: ElementRef){
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
            );
    }
}

export class Point{
    x: number;
    y: number;
    constructor(x,y: number) {
        this.x = x;
        this.y = y;
    }
}