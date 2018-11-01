import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  exportAs: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  closeModal($event) {
    this.router.navigate([{outlets: {modal: null}}]);
    this.modalClose.next($event);
  }
}
