import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Global/Api/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService extends ApiService {

   private controller = 'SideMenu'; 
  private selectedMenuIdSource = new BehaviorSubject<number | null>(null);
  selectedMenuId$ = this.selectedMenuIdSource.asObservable();

getRootMenus(): Observable<any> {
  const url = `${this.baseUrl}/${this.controller}/GetRootMenu`;
  console.log('🔗 API URL:', url);
  return this.http.get(url);
}




GetMenuHierarchy(parentId: number): Observable<any> {
  const url = `${this.baseUrl}/${this.controller}/GetMenuHierarchy`;
  console.log('🔗 API URL:', `${url}?parentId=${parentId}`);
  return this.http.get(url, { params: { parentId: parentId.toString() } });
}


  setSelectedMenuId(menuid: number): void {
    console.log('Selected Menu ID set to:', menuid);
    this.selectedMenuIdSource.next(menuid);
  }
}
