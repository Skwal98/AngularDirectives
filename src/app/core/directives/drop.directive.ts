import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import { Point } from 'src/app/types/common.type';

@Directive({
  selector: '[myDrop]',
})
export class DropDirective<T> {
  @Input('id') id: string;
  @Input('receiver') receiver = true;
  @Input('value') value: T;

  private static _dropContainners: DropDirective<any>[] = [];
  readonly element: ElementRef;

  constructor(elementRef: ElementRef) {
    DropDirective._dropContainners.push(this);
    this.element = elementRef;
  }

  public static checkInArea(point: Point): DropDirective<any> | null {
    return this._dropContainners.filter(x => x.receiver).find((x) => {
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
