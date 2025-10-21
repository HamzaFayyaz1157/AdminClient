import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Global/Api/api.service';
@Injectable({
  providedIn: 'root'
})
export class MainService extends ApiService {

   private controller = 'SideMenu'; 


getRootMenus(): Observable<any> {
  const url = `${this.baseUrl}/${this.controller}/GetRootMenu`;
  console.log('🔗 API URL:', url);
  return this.http.get(url);
}
}
