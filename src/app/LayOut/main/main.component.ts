import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../../Services/SetUp/Main/main.service'; // adjust path as needed

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit  {

  alert = 'Main Component Loaded Successfully!';
  
menus: any[] = [];;
  loading = true;

  constructor(private MainService: MainService) {}

  ngOnInit(): void {
     console.log(this.alert); // ✅ now inside lifecycle hook

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
}
