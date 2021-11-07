import { DragDirective } from "src/app/core/directives/drag.directive";
import { DropDirective } from "src/app/core/directives/drop.directive";

export class Dropped{
    constructor(
    readonly container: DropDirective<any>,
    readonly item?: DragDirective){}

    private isPrevent: boolean = false; 

    public preventDefault(){
      this.isPrevent = true;
    }

    public get isPrevented(): boolean{
      return this.isPrevent;
    }
  }