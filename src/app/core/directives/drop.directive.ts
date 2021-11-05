import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from './drag.directive';

@Directive({
  selector: '[myDrop]',
})
export class DropDirective {
  @Input('id') id: string;
  @Output('myDrop') drop$: Observable<unknown>;

  private static _dropContainners: DropDirective[] = [];
  readonly element: ElementRef<HTMLElement>;

  constructor(elementRef: ElementRef) {
    DropDirective._dropContainners.push(this);
    this.element = elementRef;
  }

  public static checkInArea(point: Point): DropDirective | null {
    return this._dropContainners.find((x) => {
      const dropRect = x.element.nativeElement.getBoundingClientRect();
      const pointX = point[0];
      const pointY = point[1];

      if (
        pointX > dropRect.left &&
        pointX < dropRect.left + dropRect.width &&
        pointY > dropRect.top &&
        pointY < dropRect.top + dropRect.height
      ) {
        return true;
      }
      return false
    });
  }
}
