import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  constructor() { }

  addCommonEvents(svgElement: SVGGElement) {
    svgElement.addEventListener('mouseenter', () => {
      svgElement.querySelectorAll('.genogram__shape--node').forEach((node: Element) => {
        node.setAttribute('style', 'display: block');
      });
    });

    svgElement.addEventListener('mouseleave', () => {
      svgElement.querySelectorAll('.genogram__shape--node').forEach((node: Element) => {
        node.setAttribute('style', 'display: none');
      });
    });

    return svgElement;
  }
}
