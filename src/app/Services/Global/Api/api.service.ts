import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    protected baseUrl = 'https://localhost:7073/api'; // apni API URL
  constructor(protected http: HttpClient) {}  // accessible to child classes 
}
