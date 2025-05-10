import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Login</h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              [(ngModel)]="username"
              name="username"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password"
              name="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required>
          </div>
          <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Sign in
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login failed:', err)
    });
  }
}
