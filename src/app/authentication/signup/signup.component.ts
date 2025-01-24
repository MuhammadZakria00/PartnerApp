import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiCallingService } from '../../shared/Services/api-calling.service';
import {LocalStorageManagerService} from "../../shared/Services/local-storage-manager.service";
import { RestaurantDetail } from '../../shared/types';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from '../../shared/Services/data-share.service';
import { takeUntil } from 'rxjs/operators';
import { UserAuthenticationService } from '../../shared/Services/user-authentication.service';
import { Subject } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  signupForm: FormGroup = new FormGroup({});
  loading = false;
  currentStep = 1;
  restaurantList: RestaurantDetail[] = [];

  constructor(
    private fb: FormBuilder,
    private _localStorageService: LocalStorageManagerService,
    private _apiCalling: ApiCallingService,
    private _authService: UserAuthenticationService,
    private _toaster: ToastrService,
    private _dataShare: DataShareService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/(?=.*[!@#$%^&*])/) // Ensure at least one special character
            ]
        ],
        restaurantName: ['', Validators.required],
        address: [''],
        country: [''],
        city: ['']
    });
}


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  goToNextStep(): void {
    if (this.currentStep === 1 && this.signupForm.get('firstName')?.valid && this.signupForm.get('email')?.valid && this.signupForm.get('password')?.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.signupForm.get('address')?.valid && this.signupForm.get('country')?.valid && this.signupForm.get('city')?.valid) {
      this.currentStep = 3;
    }
  }

  canProceedToNextStep(): boolean | undefined {
    if (this.currentStep === 1) {
      return this.currentStep === 1 && this.signupForm.get('firstName')?.valid && this.signupForm.get('email')?.valid && this.signupForm.get('password')?.valid;
    } else if (this.currentStep === 2) {
      return this.currentStep === 2 && this.signupForm.get('address')?.valid && this.signupForm.get('country')?.valid && this.signupForm.get('city')?.valid;
    }
    return false;
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }





  selectRestaurant(restaurant: RestaurantDetail): void {
    this._dataShare.updateLoginStatus(true);
    this._localStorageService.setRestaurantDetail(restaurant);
    $('#selectRestaurantModal').modal('hide');
  }



  onSubmit(): void {
    if (!this.signupForm.valid) {
      debugger
      return;
    }
    if (this.signupForm.valid ) {
      this._apiCalling.postData("Auth", "signUp", this.signupForm.value, true)
       .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          if (response?.status === 400 && !response.success) {
            this._toaster.error(response.message);
            return;
          }
          this.restaurantList = response.data.restaurantDetail
          // if (response.data.restaurantDetail.length > 1) {
          //   $('#selectRestaurantModal').modal('show');

          // } else {
            this._localStorageService.setRestaurantDetail(response.data.restaurantDetail[0]);
            this._dataShare.updateLoginStatus(true);
          // }
          this._authService.setToken(response.data.userDetail[0].token);
                    this._localStorageService.setUserDetail(response.data.userDetail);
                    this._router.navigateByUrl('home');
          

        },
        error: (error) => {
          console.error(error); // Log the error for debugging
          this._toaster.error("Internal server error occurred while processing your request");
        }
      })
    }
  }
}
