import { Injectable } from '@angular/core';
import { DialogHandlerService } from './dialog-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  constructor(private dialogHandlerService: DialogHandlerService) { }

  addCommonEvents(svgElement: SVGGElement) {
    svgElement.addEventListener('mouseenter', () => {
      svgElement.querySelectorAll('.genogram--connector').forEach((node: Element) => {
        node.setAttribute('style', 'display: block');
      });
    });

    svgElement.addEventListener('mouseleave', () => {
      svgElement.querySelectorAll('.genogram--connector').forEach((node: Element) => {
        node.setAttribute('style', 'display: none');
      });
    });

    svgElement.querySelectorAll('circle').forEach((node: Element) => {
      node.addEventListener('click', () => this.nodeClickEvent());
    });

    svgElement.querySelector('.genogram--mainshape')?.addEventListener('click', () => console.log('hi'));

    return svgElement;
  }

  private nodeClickEvent() {
    this.dialogHandlerService.openRelationShipDialog()
  }
}
