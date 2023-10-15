import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomHandlerService {

  defaultWidth = 100;
  defaultHeight = 100;

  constructor() { }

  generateComponent(symbol: string, posX: number, posY: number, scale = 1) {
    switch (symbol) {
      case 'base':
        return this.baseComponent(posX, posY, scale);
      default:
        return document.createElementNS('http://www.w3.org/2000/svg', 'g');;
    }
  }

  private baseComponent(posX: number, posY: number, scale = 1) {
    const shapeID = Date.now();
    const width = this.defaultWidth;
    const height = this.defaultHeight;

    const svgShape = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svgShape.setAttribute('width', width.toString());
    svgShape.setAttribute('height', height.toString());
    svgShape.id = shapeID.toString();
    svgShape.classList.add('genogram__shape');

    const shapeTemplate = `<rect x="${posX}" y="${posY}" width="${width}" height="${height}" fill="blue" class="genogram--mainshape" />`;
    
    svgShape.appendChild(this.addBoundBox(posX, posY, width, height));

    svgShape.innerHTML += shapeTemplate + this.addConnectionLines(posX, posY, width, height) +
    this.addNodes(posX, posY, width, height);


    return svgShape;
  }

  private addConnectionLines(posX: number, posY: number, width: number, height: number) {
    const connectionLines = `<line x1="${posX - 30}" y1="${posY + (height/2)}" x2="${posX}" y2="${posY + (height/2)}" stroke="black" class="genogram--connector" style="display: none" />
    <line x1="${posX + width}" y1="${posY + (height/2)}" x2="${posX + width + 30}" y2="${posY + (height/2)}" stroke="black" class="genogram--connector" style="display: none" />
    <line x1="${posX + (width/2)}" y1="${posY - 30}" x2="${posX + (width/2)}" y2="${posY}" stroke="black" class="genogram--connector" style="display: none" />
    <line x1="${posX + (width/2)}" y1="${posY + height + 30}" x2="${posX + (width/2)}" y2="${posX + height + 30}" stroke="black" class="genogram--connector" style="display: none" />`;

    return connectionLines;
  }

  private addNodes(posX: number, posY: number, width: number, height: number) {
    const nodesTemplate = `<circle cx="${posX - 30}" cy="${posY + (height/2)}" r="7" fill="red" class="genogram--connector genogram--node" style="display: none" />
    <circle cx="${posX + width + 30}" cy="${posY + (height/2)}" r="7" fill="red" class="genogram--connector genogram--node" style="display: none" />
    <circle cx="${posX + (width/2)}" cy="${posY - 30}" r="7" fill="red" class="genogram--connector genogram--node" style="display: none" />
    <circle cx="${posX + (width/2)}" cy="${posY + height + 30}" r="7" fill="red" class="genogram--connector genogram--node" style="display: none" />`;

    return nodesTemplate;
  }

  private addBoundBox(posX: number, posY: number, width: number, height: number) {
    const boundBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    boundBox.setAttribute('width', (width + 72).toString());
    boundBox.setAttribute('height', (height + 72).toString());
    boundBox.setAttribute('x', (posX - (30 + 6)).toString());
    boundBox.setAttribute('y', (posY - (30 + 6)).toString());
    boundBox.setAttribute('fill', 'transparent');

    return boundBox;
  }
}
