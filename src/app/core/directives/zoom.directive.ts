import { Directive, ElementRef, Output } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Directive({
    selector: '[zoom]'
})
export class ZoomDirective{

    @Output('zoom') zoom: Observable<number>;

    constructor(elementRef: ElementRef){
        this.zoom = fromEvent(elementRef.nativeElement, 'wheel')
            .pipe(
                map((x: WheelEvent)=>x.deltaY < 0 ? 1 : -1 )
                );
        console.log('zoom initial');
    }

}