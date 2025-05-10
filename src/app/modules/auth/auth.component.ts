import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule, 
    RouterOutlet
  ]
})
export class AuthComponent  {
  constructor() {}

  ngOnInit(): void {}
}
