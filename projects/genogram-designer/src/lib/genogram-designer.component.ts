import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SVG_SHAPES } from './data/shapes';
import { CanvasShapeItem, SelectedCanvasItem } from './interfaces';
import { DomHandlerService, EventHandlerService } from './services';

@Component({
  selector: 'genogram-designer',
  templateUrl: './genogram-designer.component.html',
  styleUrls: ['./genogram-designer.component.scss']
})
export class GenogramDesignerComponent {

  @Input() width = 300;
  @Input() height = 300;

  @ViewChild('genogramCanvas') genogramCanvas!: ElementRef<SVGElement>;

  currentViewBox = [0, 0, 200, 200];

  genogramCtx!: any;

  canvasItems: Array<CanvasShapeItem> = [];

  selectedElement!: any;

  shapeOffsets: SelectedCanvasItem = {
    posX: 0,
    posY: 0
  };

  isDraggable = false;

  constructor(private domHandlerService: DomHandlerService,
    private eventHandlerService: EventHandlerService) {}

  ngAfterViewInit(): void {
    this.canvasItems.push({
      svg: 'rect',
      width: 100,
      height: 100,
      posX: 20,
      posY: 50
    });
    this.renderCanvas(this.canvasItems);
  }

  generateShape(shape: CanvasShapeItem) {
    /* const svgShape = document.createElementNS('http://www.w3.org/2000/svg', shape.svg);
    svgShape.setAttribute('width', shape.width.toString());
    svgShape.setAttribute('height', shape.height.toString());
    svgShape.setAttribute('x', shape.posX.toString());
    svgShape.setAttribute('y', shape.posY.toString());
    svgShape.setAttribute('fill', 'blue');
    svgShape.classList.add('draggable'); */
    const svgShape = this.domHandlerService.generateComponent('base', shape.posX, shape.posY);

    return svgShape;
  }

  addEvents(shape: SVGGElement) {
    // shape.addEventListener('click', this.rectClick.bind(this));
    shape.addEventListener('mousedown', (evt: MouseEvent) => this.shapeMouseDown(evt));
    shape.addEventListener('mousemove', (evt: MouseEvent) => this.shapeMouseMove(evt));
    shape.addEventListener('mouseup', (evt: MouseEvent) => this.shapeMouseUp(evt));
    // shape.addEventListener('mouseover', (evt: MouseEvent) => this.shapeMouseOver(evt));
    return shape;
  }

  renderCanvas(shapes: Array<CanvasShapeItem>) {
    for (const shape of shapes) {
      let svgShape = this.generateShape(shape);
      svgShape = this.eventHandlerService.addCommonEvents(svgShape);
      svgShape = this.addEvents(svgShape);
      this.genogramCanvas.nativeElement.appendChild(svgShape);
    }
  }

  shapeMouseDown(evt: MouseEvent) {
    this.isDraggable = true;
    this.selectedElement = evt.target;
    const bbox = this.selectedElement.getBBox();
    this.shapeOffsets.posX = evt.clientX - bbox.x;
    this.shapeOffsets.posY = evt.clientY - bbox.y;
  }

  shapeMouseMove(evt: MouseEvent) {
    if (this.isDraggable) {
      const x = evt.clientX - this.shapeOffsets.posX;
      const y = evt.clientY - this.shapeOffsets.posY;
      this.selectedElement.setAttribute('x', x);
      this.selectedElement.setAttribute('y', y);
    }
  }

  shapeMouseOver(evt: any) {
    // evt.target.setAttributes('fill', 'red');
    console.log(evt.target.fill);
  }

  shapeMouseUp(evt: MouseEvent) {
    this.isDraggable = false;
  }

  zoomCanvas(evt: WheelEvent) {
    evt.preventDefault();

    const zoomSpeed = 1.1;
    const deltaY = evt.deltaY;
    const oldWidth = this.currentViewBox[2];
    const oldHeight = this.currentViewBox[3];
    const newWidth = oldWidth / (deltaY > 0 ? zoomSpeed : 1 / zoomSpeed);
    const newHeight = oldHeight / (deltaY > 0 ? zoomSpeed : 1 / zoomSpeed);
    const deltaWidth = (newWidth - oldWidth) / 2;
    const deltaHeight = (newHeight - oldHeight) / 2;

    this.currentViewBox = [
      this.currentViewBox[0] - deltaWidth,
      this.currentViewBox[1] - deltaHeight,
      newWidth,
      newHeight
    ];

    this.genogramCanvas.nativeElement.setAttribute('viewBox', this.currentViewBox.join(' '));
  }

  rectClick() {
    this.canvasItems.push({
      svg: 'rect',
      width: 100,
      height: 100,
      posX: 0,
      posY: 0
    });
    this.renderCanvas(this.canvasItems);
  }

}
