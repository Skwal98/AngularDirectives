import { animate, AnimationBuilder, AnimationFactory, style } from "@angular/animations";
import { ElementRef, Inject, Injectable } from "@angular/core";

const NULL_TRANSFORM = `translate(0px, 0px)`;
@Injectable()
export class AnimationService {
    constructor(readonly _ab: AnimationBuilder,
        @Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>) {
    }

    public animateToNullTransform(){
      const elStyle = this.elementRef.nativeElement.style;
      const animation = this._ab.build([
        style({ transform: elStyle.transform }),
        animate(200, style({ transform: NULL_TRANSFORM }))
      ]);
      this._play(animation, () => elStyle.transform =  NULL_TRANSFORM);
    }

    private _play(animation: AnimationFactory, doneCallbak: () => void){
        const player = animation.create(this.elementRef.nativeElement); 
        player.onDone(doneCallbak);
        player.onDone(() => player.destroy());
        player.play();
    }
}