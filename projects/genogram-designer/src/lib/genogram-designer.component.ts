import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SVG_SHAPES } from './data/shapes';
import { CanvasShapeItem, SelectedCanvasItem } from './interfaces';

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

  selectedItem!: SelectedCanvasItem | null;

  ngAfterViewInit(): void {
    this.genogramCtx = this.genogramCanvas.nativeElement.getContext('2d');
    this.genogramCanvas.nativeElement.width = this.width;
    this.genogramCanvas.nativeElement.height = this.height;
    this.canvasItems.push({
      svg: SVG_SHAPES.BASE_NODE,
      posX: 25,
      posY: 70,
      height: 100,
      width: 100
    });
    this.renderCanvas(this.canvasItems);
  }

  drawShape(shape: CanvasShapeItem) {
    const DOMURL = window.URL || window.webkitURL || window;
    const imgObj = new Image();
    const svg = new Blob([shape.svg], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);
    imgObj.src = url;
    imgObj.onload = () => {
      this.genogramCtx.drawImage(imgObj, shape.posX, shape.posY);
      DOMURL.revokeObjectURL(url);
    }
  }

  canvasMouseDown(evt: MouseEvent) {
    const itemIndex = this.getSelectedShape(evt);
    if (itemIndex >= 0) {
      this.selectedItem = {
        index: itemIndex,
        posX: evt.x - this.canvasItems[itemIndex].posX,
        posY: evt.y - this.canvasItems[itemIndex].posY
      }
    }
    console.log(this.selectedItem);
  }

  canvasMouseMove(evt: MouseEvent) {
    if(this.selectedItem != null) {
      this.canvasItems[this.selectedItem.index].posX = evt.x - this.selectedItem.posX;
      this.canvasItems[this.selectedItem.index].posY = evt.y - this.selectedItem.posY;
      this.renderCanvas(this.canvasItems);
    }
  }

  canvasMouseUp(evt: MouseEvent) {
    this.selectedItem = null;
  }

  getSelectedShape(mousePos: MouseEvent) {
    for (let i = 0; i < this.canvasItems.length; i++) {
      if (mousePos.x > this.canvasItems[i].posX &&
        mousePos.x < (this.canvasItems[i].posX + this.canvasItems[i].width) &&
        mousePos.y > this.canvasItems[i].posY &&
        mousePos.y < (this.canvasItems[i].posY + this.canvasItems[i].height)) {
        return i;
      }
    }
    return NaN;
  }

  renderCanvas(shapes: Array<CanvasShapeItem>) {
    this.genogramCtx.save();
    this.genogramCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.genogramCtx.clearRect(0, 0, this.width, this.height);
    this.genogramCtx.restore();
    for (let shape of shapes) {
      this.drawShape(shape);
    }
  }

  canvasClick(evt: any) {
    // console.log(evt);
    /* this.genogramCtx.scale(0.5, 0.5);
     */
    this.canvasItems.push({
      svg: SVG_SHAPES.BASE_NODE,
      posX: 0,
      posY: 0,
      height: 100,
      width: 100
    });
    this.renderCanvas(this.canvasItems);
    return null;
  }
}
