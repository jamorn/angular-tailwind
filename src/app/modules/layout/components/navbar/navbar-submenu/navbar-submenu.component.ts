import { NgFor, NgIf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from '@models/menu.model';

@Component({
  selector: 'div[navbar-submenu]',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor, 
    NgTemplateOutlet, 
    RouterLinkActive, 
    RouterLink, 
    NgIf, 
    AngularSvgIconModule
  ],
})
export class NavbarSubmenuComponent implements AfterViewInit {
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;

  ngAfterViewInit() {
    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }
}
