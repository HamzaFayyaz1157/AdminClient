import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Global/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ApiService{
  private controller = 'Company'; 


getRootMenus(): Observable<any> {
  const url = `${this.baseUrl}/${this.controller}/Get_Setup`;
  console.log('🔗 API URL:', url);
  return this.http.get(url);
}

 getCompanyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.controller}/GetById/${id}`); // Adjust the URL based on your API structure
  }


 // Method to Save customer groups from the API
  saveCompany(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.controller}/Save`, formData);
  }

}
