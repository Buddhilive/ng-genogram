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

    const shapeTemplate = `<rect x="${posX}" y="${posY}" width="${width}" height="${height}" fill="blue" />
    <line x1="${posX - 30}" y1="${posY + (height/2)}" x2="${posX}" y2="${posY + (height/2)}" stroke="black" class="genogram__shape--node" style="display: none" />
    <line x1="${posX + width}" y1="${posY + (height/2)}" x2="${posX + width + 30}" y2="${posY + (height/2)}" stroke="black" class="genogram__shape--node" style="display: none" />
    <line x1="${posX + (width/2)}" y1="${posY - 30}" x2="${posX + (width/2)}" y2="${posY}" stroke="black" class="genogram__shape--node" style="display: none" />
    <line x1="${posX + (width/2)}" y1="${posY + height + 30}" x2="${posX + (width/2)}" y2="${posX + height + 30}" stroke="black" class="genogram__shape--node" style="display: none" />
    <circle cx="${posX - 30}" cy="${posY + (height/2)}" r="7" fill="red" class="genogram__shape--node" style="display: none" />
    <circle cx="${posX + width + 30}" cy="${posY + (height/2)}" r="7" fill="red" class="genogram__shape--node" style="display: none" />
    <circle cx="${posX + (width/2)}" cy="${posY - 30}" r="7" fill="red" class="genogram__shape--node" style="display: none" />
    <circle cx="${posX + (width/2)}" cy="${posY + height + 30}" r="7" fill="red" class="genogram__shape--node" style="display: none" />
    <rect x="${posX - (30 + 6)}" y="${posY - (30 + 6)}" width="${width + 72}" height="${width + 72}" fill="transparent"/>`;

    svgShape.innerHTML = shapeTemplate;

    return svgShape;
  }
}
