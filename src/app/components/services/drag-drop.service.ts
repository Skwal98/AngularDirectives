import { DOCUMENT } from "@angular/common";
import { ElementRef, Inject, Injectable, Output } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { map, share, switchMap, take, takeUntil } from "rxjs/operators";
import { Point } from "src/app/types/common.type";

@Injectable()
export class DragDropService {

    @Output('dragMove') readonly move$: Observable<Point>;
    @Output('dragStart') readonly start$: Observable<Point>;
    @Output('dragEnd') readonly end$: Observable<Point>;

    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<Element>,
        @Inject(DOCUMENT) documentRef: Document,
    ) {
        const mouseDown$ = fromEvent(nativeElement, 'mousedown');
        const mouseMove$ = fromEvent(documentRef, 'mousemove');
        const mouseLeave$ = fromEvent(documentRef, 'mouseleave');
        const mouseUp$ = fromEvent(documentRef, 'mouseup');
    
        const moveUntil$ = merge(mouseUp$, mouseLeave$);
    
        this.start$ = mouseDown$.pipe(
          switchMap(() => mouseMove$.pipe(take(1), takeUntil(moveUntil$))),
          share(),
          map((x: MouseEvent) => {
            x.preventDefault();
            return [x.clientX, x.clientY];
          })
        );
        
        this.end$ = this.start$.pipe(
          switchMap(() => moveUntil$.pipe(take(1))),
          share(),
          map((x: MouseEvent) => {
            x.preventDefault();
            return [x.clientX, x.clientY];
          })
        );
    
        this.move$ = this.start$.pipe(
          switchMap(() => mouseMove$.pipe(takeUntil(moveUntil$))),
          map((x: MouseEvent) => {
            x.preventDefault();
            return [x.clientX, x.clientY];
          })
        );
    }
}