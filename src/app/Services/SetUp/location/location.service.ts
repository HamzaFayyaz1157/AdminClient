import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Global/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ApiService{
  private controller = 'Location'; 


getRootMenus(): Observable<any> {
  const url = `${this.baseUrl}/${this.controller}/Get_Setup`;
  console.log('🔗 API URL:', url);
  return this.http.get(url);
}

 getLocationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.controller}/GetById/${id}`); // Adjust the URL based on your API structure
  }


 // Method to Save customer groups from the API
  saveLocation(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.controller}/Save`, formData);
  }

}
