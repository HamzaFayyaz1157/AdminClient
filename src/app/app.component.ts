import { Component } from '@angular/core';
import { Router, NavigationEnd,RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './LayOut/View/Header/header/header.component';
import { SidebarComponent } from "./LayOut/View/Sidebar/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   sidebarOpen = false;
  showToggle = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // 👇 Hide toggle only when on MainComponent route
        this.showToggle = !event.url.startsWith('/main');
      });
  }

  onToggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
