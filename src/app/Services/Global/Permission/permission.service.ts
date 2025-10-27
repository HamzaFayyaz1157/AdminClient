import { Injectable } from '@angular/core';
import { flatMap, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
constructor() {}

  getPermissions(): Observable<any> {
    // Mocking the permissions. In a real app, you'd call an API here.
    const permissions = {
  canView: false,
  canAddMore: true,
  canCancel:  false,
  canSearch:  true,
  canDelete:  false,
  canSave:  true,
  canEdit:  true,
  canPrint:  false,
  canClose: true
        // You can customize these based on user role.
      
    };
    return of(permissions);
  }

}
