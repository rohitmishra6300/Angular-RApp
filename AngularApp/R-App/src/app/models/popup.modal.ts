import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

export class NgbdModalContent {
    @Input() name;
  
    constructor(public activeModal: NgbActiveModal) {
      
    }
  }