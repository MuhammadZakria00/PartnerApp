import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import test from 'node:test';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Define table columns with headers and field names for each column
  columns = [
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Role', field: 'role' },
    { header: 'Tests', field: 'Tests' },
  ];

  data = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' ,Tests:'Info'},
    { name: 'Bob', email: 'bob@example.com', role: 'Editor' ,Tests:'Info'},
    { name: 'Charlie', email: 'charlie@example.com', role: 'Viewer',Tests:'Info' },
    { name: 'Charlie', email: 'charlie@example.com', role: 'Viewer' ,Tests:'Info'},
  ];

  actions = [
    { label: 'Edit', class: 'bg-blue-500 text-white', action: 'edit', iconClass: 'fas fa-edit' },
    { label: 'Delete', class: 'bg-red-500 text-white', action: 'delete', iconClass: 'fas fa-trash' },
    { label: 'View', class: 'bg-green-500 text-white', action: 'view', iconClass: 'fas fa-eye' }
  ];
  
  

  enablePagination = true;
  totalPages = 3;
  backgroundImageUrl = 'https://example.com/your-image.jpg'; // Replace with your actual image URL

  

  // Handle action clicks and call the relevant callback
  handleAction(event: any): void {
    console.log(event.action, event.row);
    if (event.action === 'edit') {
      this.editUser(event.row);
    } else if (event.action === 'delete') {
      this.deleteUser(event.row);
    }
  }

  // Handle the edit action for a specific user
  editUser(row: any): void {
    console.log('Editing user:', row);
  }

  // Handle the delete action for a specific user
  deleteUser(row: any): void {
    console.log('Deleting user:', row);
  }
  handleAdditionalInfo(row: any): void {
    // Handle the additional info logic, for example, log it or display a modal
    console.log('Additional Info for:', row);
  }

}
