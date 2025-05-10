import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']  // แก้ไขจาก styleUrl เป็น styleUrls
})
export class SafetyComponent {

}
