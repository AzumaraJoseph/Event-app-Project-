import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from "./JQ-toastr.service";

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    @Input('modal-trigger') modalId!: string;
    private el: HTMLElement;

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any ) {
        this.el = ref.nativeElement;
    }
    
    ngOnInit() {
        this.el.addEventListener('click', () => {
            this.$(`#${this.modalId}`).modal({})
        })
    }
}
