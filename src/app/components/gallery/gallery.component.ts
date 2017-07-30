import {Component, Input} from "@angular/core";

declare var jQuery:any;

@Component({
  selector: 'enginizer-gallery',
  template: `
      <div class="thumbnail-list" id="thumbnail-list">
         <img *ngFor="let image of urls" [src]="image" class="materialboxed" width="178" height="100" />
      </div>
  `,
  styles: [`  
    .thumbnail-list {
      margin: 0 auto;
      display: inherit;}
`]
})
export class GalleryComponent {
  @Input() urls:string[];

  isOverflow(){
    return jQuery('.thumbnail-list').prop('scrollWidth') > jQuery('.thumbnail-list').width();
  }

}
