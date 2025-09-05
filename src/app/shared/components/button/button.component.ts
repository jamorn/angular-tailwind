import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cx } from '../../utils/ckassnames';
import { ButtonToneType } from '@core/services/theme.service'; 
type ButtonProps = {
  impact: 'bold' | 'light' | 'none';
  size: 'small' | 'medium' | 'large';
  shape: 'square' | 'rounded' | 'pill';
  tone: ButtonToneType;
  shadow: 'none' | 'small' | 'medium' | 'large';
  type: 'button' | 'submit' | 'reset';
};

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled"
      [type]="type"
      (click)="onButtonClick()"
      [class]="classes"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent implements OnInit {
  @Input() impact: ButtonProps['impact'] = 'none';
  @Input() size: ButtonProps['size'] = 'medium';
  @Input() shape: ButtonProps['shape'] = 'rounded';
  @Input() tone: ButtonToneType = 'violet';
  @Input() shadow: ButtonProps['shadow'] = 'none';
  @Input() type: ButtonProps['type'] = 'submit';
  @Input() full = false;
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  public classes: string = '';

  baseClasses =
    'font-semibold focus-visible:outline-none flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

  impactClasses: Record<ButtonToneType, Record<ButtonProps['impact'], string>> = {
    violet: {
      bold: 'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-600',
      light: 'bg-violet-600/20 text-violet-700 hover:bg-violet-600/30 focus-visible:ring-violet-600',
      none: 'bg-transparent text-violet-700 hover:bg-violet-600/10 focus-visible:ring-violet-600',
    },
    blue: {
      bold: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
      light: 'bg-blue-600/20 text-blue-700 hover:bg-blue-600/30 focus-visible:ring-blue-600',
      none: 'bg-transparent text-blue-700 hover:bg-blue-600/10 focus-visible:ring-blue-600',
    },
    green: {
      bold: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
      light: 'bg-green-600/20 text-green-700 hover:bg-green-600/30 focus-visible:ring-green-600',
      none: 'bg-transparent text-green-700 hover:bg-green-600/10 focus-visible:ring-green-600',
    },
    vue: {
      bold: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600',
      light: 'bg-emerald-600/20 text-emerald-700 hover:bg-emerald-600/30 focus-visible:ring-emerald-600',
      none: 'bg-transparent text-emerald-700 hover:bg-emerald-600/10 focus-visible:ring-emerald-600',
    },
    orange: {
      bold: 'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-600',
      light: 'bg-orange-600/20 text-orange-700 hover:bg-orange-600/30 focus-visible:ring-orange-600',
      none: 'bg-transparent text-orange-700 hover:bg-orange-600/10 focus-visible:ring-orange-600',
    },
    red: {
      bold: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      light: 'bg-red-600/20 text-red-700 hover:bg-red-600/30 focus-visible:ring-red-600',
      none: 'bg-transparent text-red-700 hover:bg-red-600/10 focus-visible:ring-red-600',
    }
  };

  sizeClasses: Record<ButtonProps['size'], string> = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-2.5 text-lg',
  };

  shapeClasses: Record<ButtonProps['shape'], string> = {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  };

  shadowClasses: Record<ButtonProps['shadow'], string> = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };

  constructor() {}

  ngOnInit(): void {
    this.classes = cx(
      this.baseClasses,
      this.impactClasses[this.tone][this.impact],
      this.sizeClasses[this.size],
      this.shapeClasses[this.shape],
      this.shadowClasses[this.shadow],
      this.full ? 'w-full' : '',
    );
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}
