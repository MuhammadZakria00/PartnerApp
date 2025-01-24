import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RestaurantDetail, UserDetail } from "../types/index";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  saveUserToStorage(data: any): boolean {
    this.removeUser();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return true;
  }


  savePermissionsToStorage(data: any): boolean {
    this.removePermissions();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('permissions', JSON.stringify(data));
    }
    return true;
  }

  getPermissionsFromStorage(): any {
    return JSON.parse(localStorage.getItem('permissions')!);
  }

  saveAdminUserToStorage(): void {
    this.removeAdmin();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdmin', '1');
    }
  }

  updateUserToStorage(data: any): void {
    this.removeUser();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(data));
    }

  }

  saveUserRole(role: number): void {
    this.removeRole();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', role.toString());
    }
  }

  getUserRole(): number {
    let role = 0;
    if (isPlatformBrowser(this.platformId)) {
      role = Number(localStorage.getItem('role'));
    }
    return role;
  }

  getTokenFromStorage(): string {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '{}';
    }
    return token;

  }

  setRestaurantDetail(restaurantDetail: RestaurantDetail): void {
    this.removeRestaurantDetail();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('restaurantDetail', JSON.stringify(restaurantDetail));
    }
  }

  getRestaurantDetail(): RestaurantDetail {
    let restaurantDetail: RestaurantDetail = {} as RestaurantDetail; // Initialize with default value
    if (isPlatformBrowser(this.platformId)) {
        const storedData = localStorage.getItem('restaurantDetail');
        restaurantDetail = storedData ? JSON.parse(storedData) : {} as RestaurantDetail;
    }
    return restaurantDetail;
}



  removeRestaurantDetail(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('restaurantDetail');
    }
  }

  setUserDetail(userDetail: UserDetail[]): void {

    this.removeUserDetail();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userDetail', JSON.stringify(userDetail));
    }
  }

  getUserDetail(): UserDetail[] {
    let userDetail: UserDetail[] = [];
    if (isPlatformBrowser(this.platformId)) {
        const storedData = localStorage.getItem('userDetail');
        try {
            userDetail = storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error('Error parsing userDetail from localStorage:', error);
            userDetail = [];
        }
    }
    return userDetail;
}



  removeUserDetail(): void {
    if (isPlatformBrowser(this.platformId)) {

      localStorage.removeItem('userDetail');
    }
  }
  setTokenToStorage(token: string): void {
    this.removeToken();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  isLoginValidationFromStorage(): boolean {
 
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
  

    return token !== '' ? true : false;
  }

  isAdminValidationFromStorage(): boolean {
    let isAdmin = false; // Changed variable name for clarity
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('isAdmin') || ''; // Removed redundant declaration
      isAdmin = token === '1'; // Corrected the assignment logic
    }
    return isAdmin; // Return the correct boolean value
  }

  getUserFromStorage(): any {
    let user = {};
    if (isPlatformBrowser(this.platformId)) {
      user = JSON.parse(localStorage.getItem('userDetail') || '{}');
    }

    return user;
  }

  getUserIdFromStorage(): number {
    let userId = 0;
    if (isPlatformBrowser(this.platformId)) {
      userId = JSON.parse(localStorage.getItem('userDetail') || '{}').userId;
    }

    return userId;
  }

  getUserRoleFromStorage(): string {
    let userRole = '';
    if (isPlatformBrowser(this.platformId)) {
      userRole = JSON.parse(localStorage.getItem('userDetail') || '{}').role;
    }
    return userRole;
  }

  clearLocalStorage(): any {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

  }

  removePermissions(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('permissions');
    }
  }

  removeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }

  removeAdmin(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAdmin');
    }
  }

  removeRole(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('role');
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  removeOtpEmail(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('otpEmail');
    }
  }
}
