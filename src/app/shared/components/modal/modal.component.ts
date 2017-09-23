import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare var $: any;

@Component({
    selector: 'ngnizr-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
    @ViewChild('modal') modal: ElementRef;

    private $modal;
    constructor() {
    }

    open() {
        this.$modal.modal('open');
    }

    close() {
        this.$modal.modal('close');
    }


    public ngAfterViewInit(): void {
        this.$modal = $(this.modal.nativeElement).modal();
    }
}
