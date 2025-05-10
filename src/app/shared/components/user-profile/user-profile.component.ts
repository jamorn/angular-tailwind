import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth/auth.service';  

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile" *ngIf="authService.getCurrentUser() | async as user">
      <div class="flex items-center gap-2">
        <span class="font-medium text-sm">{{ user.name }}</span>
        <span class="text-xs text-gray-500">({{ user.empId }})</span>
      </div>
      <div class="flex gap-2 text-xs">
        <span *ngFor="let role of user.roles" 
              class="px-2 py-1 rounded-full"
              [ngClass]="{
                'bg-blue-100 text-blue-800': role === 'admin',
                'bg-green-100 text-green-800': role === 'user',
                'bg-purple-100 text-purple-800': role === 'super'
              }">
          {{ role }}
        </span>
      </div>
      <button (click)="authService.logout()" 
              class="text-sm text-red-600 hover:text-red-800">
        Logout
      </button>
    </div>
  `,
  styles: [`
    .user-profile {
      @apply flex flex-col gap-2 p-4 bg-white rounded-lg shadow;
    }
  `]
})
export class UserProfileComponent {
  constructor(public authService: AuthService) {}
}
