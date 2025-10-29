import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-petty-cash',
  standalone: true,
  imports: [],
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss'] 
})
export class PettyCashComponent implements OnInit  {
  menuid: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.menuid = this.route.snapshot.queryParamMap.get('menuid');
    console.log('Received petty cash MenuID:', this.menuid);
  }
}
