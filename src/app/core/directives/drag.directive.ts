import { Directive, ElementRef, HostBinding, Inject, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dropped } from 'src/app/components/models/dropped.model';
import { AnimationService } from 'src/app/components/services/animation.service';
import { DragDropService } from 'src/app/components/services/drag-drop.service';
import { Point } from 'src/app/types/common.type';
import { DropDirective } from './drop.directive';

@Directive({
  selector: '[myDrag]',
  providers: [DragDropService, AnimationService],
})
export class DragDirective {
  @Output('myDropped') dropped$: Observable<Dropped>;
  @Input('value') value: any;

  readonly element: ElementRef<HTMLElement>;
  initialPoint: Point;

  @HostBinding('class.isMoving')
  isMoving = false;

  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(DragDropService) readonly dragDrop: DragDropService,
    @Inject(AnimationService) readonly animation: AnimationService,
  ) {
    const {nativeElement} = elementRef;
    this.element = elementRef;
    this.dropped$ = this.dragDrop.end$.pipe(
      map((x) => new Dropped(DropDirective.checkInArea(x), this)),
      filter((x) => x.container !== undefined)
    );

    this.dragDrop.start$.subscribe(() => {
      const element = nativeElement;
      this.isMoving = true;
      this.initialPoint = [element.offsetLeft + element.clientWidth / 2, element.offsetTop + element.clientHeight / 2];
    });

    this.dragDrop.move$.subscribe((point: Point) => {
      const {style} = nativeElement;
      const finalX = point[0] - this.initialPoint[0];
      const finalY = point[1] - this.initialPoint[1];
      style.transform = `translate(${finalX}px, ${finalY}px)`
    });

    this.dragDrop.end$.subscribe(() => {
      this.isMoving = false;
      this.animation.animateToNullTransform();
    });
  }
}