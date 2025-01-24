import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../Services/toaster/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToastComponent implements OnInit {
  toast$!: Observable<{ message: string; type: 'success' | 'error' | 'warning' | 'info'; } | null>; // Observable for toast message

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toast$ = this.toastService.toast$;
    this.toast$.subscribe((toast) => {
      console.log('Toast received in component:', toast); // Debug log
    });
  }

  // Method to close the toast
  closeToast(): void {
    this.toastService.clearToast(); // Clear the toast message
  }
}
