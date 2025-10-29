import { Component, Input,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../../../../Services/SetUp/Main/main.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
 @Input() isOpen = true;
private lastLoadedParentId: string | null = null;
 menuList: any[] = [];

  constructor(

    private mainService: MainService,
    private route: ActivatedRoute,
     private router: Router
  ) {}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const parentId = params['menuid'];
    
    // ✅ Ignore if parentId is same as current one
    if (parentId && parentId !== this.lastLoadedParentId) {
      this.lastLoadedParentId = parentId;
      console.log('🔗 Loading new menu hierarchy:', parentId);
      this.loadMenuHierarchy(parentId);
    }
  });
}

  loadMenuHierarchy(parentId: number): void {
    this.mainService.GetMenuHierarchy(parentId).subscribe({
      next: (data) => {
        console.log('✅ Menu hierarchy loaded:', data);
        this.menuList = data;
      },
      error: (err) => {
        console.error('❌ Error loading menu hierarchy:', err);
      }
    });
  }

  

  onMenuClick(menu: any): void {
    if (menu.listMenu?.length) {
      menu.expanded = !menu.expanded; // toggle submenu
    } else {
      this.onChildMenuClick(menu);
    }
  }






onChildMenuClick(menu: any): void {


  if (menu.menuUrl && menu.menuUrl.trim() !== '') {
    // ✅ Just navigate — don't reload sidebar
    this.router.navigate([menu.menuUrl])
  } else {
    alert('No route defined for this child menu!');
  }
}


}
