import { Component, Input, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { BaseOptions } from 'flatpickr/dist/types/options';
import 'flatpickr/dist/flatpickr.css';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      #fpInput
      class="form-input"
      [value]="value"
      (input)="onInput($event)"
    >
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('fpInput') input!: ElementRef;
  @Input() config: Partial<BaseOptions> = {};
  
  private instance?: flatpickr.Instance;
  value = '';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  ngAfterViewInit() {
    this.instance = flatpickr(this.input.nativeElement, {
      ...this.config,
      onChange: (dates) => {
        const value = dates[0];
        this.value = value ? value.toString() : '';
        this.onChange(value);
        this.onTouched();
      }
    });
  }

  writeValue(value: any): void {
    this.value = value;
    this.instance?.setDate(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
