import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define a type for the toast message to ensure type safety
export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info'; // Add specific toast types for clarity
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // BehaviorSubject initialized with null to indicate no active toast initially
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable(); // Expose the observable to the components

  constructor() {}

  // Method to show toast with a specific message and type
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    debugger
    const toast: Toast = { message, type };  // Creating the toast object
    this.toastSubject.next(toast);  // Emit the new toast object to the subscribers
  }

  // Method to clear the toast (set it to null)
  clearToast(): void {
    this.toastSubject.next(null); // Emit null to clear the toast
  }
}
