import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../../Services/SetUp/Main/main.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {

  alert = 'Main Component Loaded Successfully!';
  menus: any[] = [];
  loading = true;

  constructor(
    private MainService: MainService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    console.log(this.alert);

    // 👇 Hide the toggle button on this page
    const toggleBtn = document.querySelector('.menu-toggle-btn');
    if (toggleBtn) this.renderer.setStyle(toggleBtn, 'display', 'none');

    this.MainService.getRootMenus().subscribe({
      next: (res: any) => {
        console.log('Root Menus:', res);  
        if (res && res.obj) {
          this.menus = res.obj;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading menus:', err);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    // 👇 Show it again when leaving MainComponent
    const toggleBtn = document.querySelector('.menu-toggle-btn');
    if (toggleBtn) this.renderer.removeStyle(toggleBtn, 'display');
  }

// onMenuClick(menu: any): void {
//   console.log('Menu clicked:', menu.menuid);

//   if (menu.menuUrl && menu.menuUrl.trim() !== '') {
//     // Navigate to the menu route with query params
//     this.router.navigate([menu.menuUrl], { 
//       queryParams: { menuid: menu.menuid }
//     });

//     // Send menuid to SidebarService (or MainService)
//     this.MainService.setSelectedMenuId(menu.menuid);

//   } else {
//     alert('No route defined for this menu!');
//   }
// }
onMenuClick(menu: any): void {
  if (menu.menuUrl && menu.menuUrl.trim() !== '') {
    // navigate inside layout routes
    this.router.navigate([menu.menuUrl], { 
      queryParams: { menuid: menu.menuid }
    });
    this.MainService.setSelectedMenuId(menu.menuid);
  } else {
    alert('No route defined for this menu!');
  }
}
  sidebarOpen = false;

onToggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}
}
