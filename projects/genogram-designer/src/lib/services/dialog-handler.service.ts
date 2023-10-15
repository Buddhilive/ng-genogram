import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {

  constructor() { }

  openRelationShipDialog() {
    const dialog = this.createDialog();
    document.body.appendChild(dialog);
    dialog.showModal();
  }

  private createDialog() {
    const dialog = document.createElement('dialog');
    const dialogTemplate = `<button autofocus>Close</button>
    <p>This modal dialog has a groovy backdrop!</p>`
    dialog.innerHTML = dialogTemplate;
    dialog.classList.add('genogram__dialog');
    dialog.querySelector('button')?.addEventListener('click', () => {
      dialog.close();
      document.body.removeChild(dialog);
    });

    return dialog;
  }
}
