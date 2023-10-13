import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'genogram-designer',
  templateUrl: './genogram-designer.component.html',
  styleUrls: ['./genogram-designer.component.scss']
})
export class GenogramDesignerComponent {

  @Input() width = 300;
  @Input() height = 300;

  @ViewChild('genogramCanvas') genogramCanvas!: ElementRef<HTMLCanvasElement>;

  genogramCtx!: any;

  ngAfterViewInit(): void {
      this.genogramCtx = this.genogramCanvas.nativeElement.getContext('2d');
      this.genogramCanvas.nativeElement.width = this.width;
      this.genogramCanvas.nativeElement.height = this.height;
  }
}
