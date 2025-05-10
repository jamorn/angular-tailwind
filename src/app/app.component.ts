import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet, 
    ResponsiveHelperComponent, 
    NgxSonnerToaster,
    HttpClientModule  // เพิ่ม HttpClientModule
  ],
})
export class AppComponent {
  title = 'PLBG Dashboard';

  constructor(public themeService: ThemeService) {}
}
