import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SVG_SHAPES } from './data/shapes';
import { CanvasShapeItem } from './interfaces';

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

  canvasItems: Array<CanvasShapeItem> = [];

  ngAfterViewInit(): void {
    this.genogramCtx = this.genogramCanvas.nativeElement.getContext('2d');
    this.genogramCanvas.nativeElement.width = this.width;
    this.genogramCanvas.nativeElement.height = this.height;
    this.canvasItems.push({
      svg: SVG_SHAPES.BASE_NODE,
      posX: 25,
      posY: 70,
      height: 300,
      width: 300
    });
    this.drawShape();
  }

  drawShape() {
    const DOMURL = window.URL || window.webkitURL || window;
    const imgObj = new Image();
    const svg = new Blob([SVG_SHAPES.BASE_NODE], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);
    imgObj.src = url;
    imgObj.onload = () => {
      this.genogramCtx.drawImage(imgObj, 25, 70);
      DOMURL.revokeObjectURL(url);
    }
  }



  canvasClick(evt: any) {
    console.log(evt);
    this.genogramCtx.scale(0.5, 0.5);
    this.drawShape();
  }
}
