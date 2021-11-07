import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[myLet]',
})
export class MyLetDirective<T> {
    @Input() myLet!: T;

    constructor(
        @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
        @Inject(TemplateRef) templateRef: TemplateRef<MyLetContext<T>>,
    ) {
        viewContainer.createEmbeddedView(templateRef, new MyLetContext<T>(this));
    }
}

export class MyLetContext<T> {
    constructor(private readonly internalDirectiveInstance: MyLetDirective<T>) {}

    get myLet(): T {
        return this.internalDirectiveInstance.myLet;
    }

    /*Custom static value in context
    get test(): string{
        return 'aaa';
    }*/
}
