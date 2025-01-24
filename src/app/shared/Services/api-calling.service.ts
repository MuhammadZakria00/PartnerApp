import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { environment } from '../../envirnments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';

import { LocalStorageManagerService } from "./local-storage-manager.service";
import { ToastService } from './toaster/toaster.service';
@Injectable({
  providedIn: 'root'
})
export class ApiCallingService {



  restaurantId: string | null = null;
  userId: string | null = null;


  constructor(
    private _httpClient: HttpClient,
    private _toaster: ToastService,
    private _localStorage: LocalStorageManagerService,
    private _loader: NgxSpinnerService
  ) {

  }



  getData<T>(
    controllerName: string,
    methodName: string,
    showLoader: boolean,
    paginationParams?: {
      userId?: string;
      page?: number;
      limit?: number;
      searchQuery?: string;
      activeStatus?: string | number;
      startDate?: string;
      endDate?: string;
    }
  ): Observable<any> {
    if (showLoader) {
      this._loader.show();
    }

   
    const staticQueryParams = {
      restaurantId: this._localStorage.getRestaurantDetail().restaurantId,
      activeStatus: paginationParams?.activeStatus ?? 1,
      ...paginationParams
    };
    return this._httpClient.get<any>(`${environment.baseUrl}${controllerName}/${methodName}`, { params: staticQueryParams }).pipe(this.catchApiErrors());
  }

  postData<T>(controllerName: string, methodName: string, body: any, showLoader: boolean, userId?: string): Observable<any> {

    if (showLoader) {
      this._loader.show();
    }
 
    this.userId=this._localStorage.getUserDetail().length<1?"0": this._localStorage.getUserDetail()[0].userId;
    const staticQueryParams = { restaurantId: this._localStorage.getRestaurantDetail().restaurantId, userId: this.userId};
    return this._httpClient.post<any>(`${environment.baseUrl}${controllerName}/${methodName}`, body, { params: staticQueryParams }).pipe(this.catchApiErrors());
  }

  // fileUpload<T>(controllerName: string, methodName: string, body: any, showLoader: boolean): Observable<any> {
  //   if (showLoader) {
  //     this._loader.show();
  //   }
  //   const staticQueryParams = { restaurantId: this._localStorage.getRestaurantDetail().restaurantId, userId: this.userId };
  //   return this._httpClient.post<any>(`${environment.baseUrl}${controllerName}/${methodName}`, body, { reportProgress: true, observe: 'events', params: staticQueryParams }).pipe(this.catchApiErrors());
  // }

  putData<T>(controllerName: string, methodName: string, body: any, showLoader: boolean, userId?: string): Observable<any> {
    if (showLoader) {
      this._loader.show();
    }
    this.userId=this._localStorage.getUserDetail().length<1?"0": this._localStorage.getUserDetail()[0].userId;
    const staticQueryParams = { restaurantId: this._localStorage.getRestaurantDetail().restaurantId, userId: this.userId};
    return this._httpClient.put<any>(`${environment.baseUrl}${controllerName}/${methodName}`, body, { params: staticQueryParams }).pipe(this.catchApiErrors());
  }

  patchData<T>(controllerName: string, methodName: string, body: any, showLoader: boolean, userId?: string): Observable<any> {
    if (showLoader) {
      this._loader.show();
    }
    this.userId=this._localStorage.getUserDetail().length<1?"0": this._localStorage.getUserDetail()[0].userId;
    const staticQueryParams = { restaurantId: this._localStorage.getRestaurantDetail().restaurantId, userId:  this.userId };
    return this._httpClient.patch<any>(`${environment.baseUrl}${controllerName}/${methodName}`, body, { params: staticQueryParams }).pipe(this.catchApiErrors());
  }

  deleteData<T>(controllerName: string, methodName: string, body: any, showLoader: boolean, userId?: string): Observable<any> {
    if (showLoader) {
      this._loader.show();
    }
    this.userId=this._localStorage.getUserDetail().length<1?"0": this._localStorage.getUserDetail()[0].userId;
    const options = {
      body: body,
      params: { restaurantId: this._localStorage.getRestaurantDetail().restaurantId, userId:  this.userId }
    };

    return this._httpClient.delete<any>(`${environment.baseUrl}${controllerName}/${methodName}`, options).pipe(this.catchApiErrors());
  }

  // catchApiErrors(): OperatorFunction<any, any> {
  //   return catchError(error => {
  //     this._loader.hide();
  //     return throwError(() =>
  //       this._toaster.error("Internal server error occurred while processing your request")
  //     )
  //   })
  // }
  catchApiErrors(): OperatorFunction<any, any> {
    return catchError(error => {
      this._loader.hide();
      // Check if the error response contains a message
      let errorMessage = "Internal server error occurred while processing your request";
      if (error.error && error.error.message) {
        errorMessage = error.error.message; // Use the API's error message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to the error object's message
      }
  
      // Show the error using the toaster
      this._toaster.showToast(errorMessage,'error');
  
      // Rethrow the error with its original content for further handling
      return throwError(() => error);
    });
  }
}
