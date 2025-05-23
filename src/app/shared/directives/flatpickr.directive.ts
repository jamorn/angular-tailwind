import { Directive, ElementRef, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

@Directive({
  selector: '[appFlatpickr]',
  standalone: true
})
export class FlatpickrDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    flatpickr(this.el.nativeElement);
  }
}
