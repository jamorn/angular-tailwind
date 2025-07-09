import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet, 
    ResponsiveHelperComponent, 
    NgxSonnerToaster
  ],
})
export class AppComponent implements OnInit {
  title = 'PLBG Dashboard';

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {
    // เพิ่ม debug log ให้ละเอียดขึ้น
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Route Navigation:', {
        url: event.url,
        urlAfterRedirects: event.urlAfterRedirects,
        timestamp: new Date().toISOString(),
        id: event.id,
        navigationTrigger: (event as any).navigationTrigger
      });
    });
  }

  ngOnInit() {
    console.log('App Init - Current Theme:', this.themeService.getCurrentTheme());
  }
}
