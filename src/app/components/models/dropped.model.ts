import { DragDirective } from "src/app/core/directives/drag.directive";
import { DropDirective } from "src/app/core/directives/drop.directive";

export class Dropped{
    constructor(
    readonly container: DropDirective<any>,
    readonly item?: DragDirective){}
  }