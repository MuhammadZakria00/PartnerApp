import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiCallingService } from '../../shared/Services/api-calling.service';
import { Subject, takeUntil } from 'rxjs';
import { RestaurantDetail } from '../../shared/types';
import { LocalStorageManagerService } from '../../shared/Services/local-storage-manager.service';
import { UserAuthenticationService } from '../../shared/Services/user-authentication.service';
import { DataShareService } from '../../shared/Services/data-share.service';
import { ToastService } from '../../shared/Services/toaster/toaster.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports:   [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  loginForm!: FormGroup;
  restaurantList: RestaurantDetail[] = [];
  isShowPassword: boolean = false;
  constructor(   
    public _router: Router,   
    private _fb: FormBuilder ,
    private _apiCalling: ApiCallingService,
    private _toaster: ToastService,
    private _localStorageService: LocalStorageManagerService,
    private _authService: UserAuthenticationService,
    private _dataShare: DataShareService
  
  ) {
 
  }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[!@#$%^&*])/)]],
    });

    
  }
  submitLoginForm(): void {
   
    if (!this.loginForm.valid) {
      return;
    }
    this._apiCalling.postData("Auth", "login", this.loginForm.value, true)
    .pipe(takeUntil(this.ngUnsubscribe)) 
    .subscribe({
      next: (response) => {
        if (response?.status === 400 && !response.success) {
          // this._toaster.error(response.message);
          this._toaster.showToast(response.message,'error');
          return;
        }
        this.restaurantList = response.data.restaurantDetail
        this._localStorageService.setRestaurantDetail(response.data.restaurantDetail[0]);
        this._dataShare.updateLoginStatus(true);
      
        this._authService.setToken(response.data.userDetail[0].token);
        this._localStorageService.setUserDetail(response.data.userDetail);
        // this._router.navigateByUrl('/dashboard');
        this._toaster.showToast(response.message,'success');
        this._router.navigateByUrl('/dashboard').then(() => {
          // Refresh the page after navigating to the dashboard
          window.location.reload();
        });
      },
      error: (error) => {
        
        // console.error(error); // Log the error for debugging
        // this._toaster.error("Internal server error occurred while processing your request");
      }
    });
}



}
