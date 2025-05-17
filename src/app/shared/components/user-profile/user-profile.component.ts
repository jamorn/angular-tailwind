import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth/auth.service';
import { User, UserRole } from '@models/user/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile" *ngIf="authService.getCurrentUser() | async as response">
      <ng-container *ngIf="response.success && response.user">
        <div class="flex items-center gap-2">
          <span class="font-medium text-sm">{{ response.user.name }}</span>
          <span class="text-xs text-gray-500">({{ response.user.empId }})</span>
        </div>
        <div class="flex gap-2 text-xs">
          <span *ngFor="let role of response.user.roles" 
                class="px-2 py-1 rounded-full"
                [ngClass]="{
                  'bg-blue-100 text-blue-800': role === 'admin',
                  'bg-green-100 text-green-800': role === 'user'
                }">
            {{ role }}
          </span>
        </div>
      </ng-container>
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
