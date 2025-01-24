import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: { label: string, class: string, action: string, iconClass: string }[] = [];
  @Input() enablePagination: boolean = true;
  @Input() totalPages: number = 1;
  @Input() backgroundImageUrl: string = '';

  @Output() actionClicked: EventEmitter<any> = new EventEmitter();
  @Output() additionalInfoClicked: EventEmitter<any> = new EventEmitter();

  currentPage: number = 1;
  sortedColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  expandedRow: any = null;
  selectedRows: Set<any> = new Set();
  selectedFilters: { [key: string]: string[] } = {};
  filteredData: any[] = [];
  pageData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filteredData = [...this.data];
      this.applyFilters();
      this.applyPagination();
    }
  }

  sortColumn(field: string) {
    if (this.sortedColumn === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = field;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  sortData() {
    this.filteredData = [...this.filteredData].sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a[this.sortedColumn!] > b[this.sortedColumn!] ? 1 : -1;
      } else {
        return a[this.sortedColumn!] < b[this.sortedColumn!] ? 1 : -1;
      }
    });
    this.applyPagination();
  }

  toggleRowSelection(row: any) {
    if (this.isRowSelected(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
  }

  toggleAllSelection(event: any) {
    if (event.target.checked) {
      this.filteredData.forEach(row => this.selectedRows.add(row));
    } else {
      this.selectedRows.clear();
    }
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  isAllSelected(): boolean {
    return this.selectedRows.size === this.filteredData.length;
  }

  showAdditionalInfo(row: any) {
    if (this.expandedRow === row) {
      this.expandedRow = null;
    } else {
      this.expandedRow = row;
    }
  }

  getRowKeys(row: any): string[] {
    return Object.keys(row);
  }

  closeSubTable() {
    this.expandedRow = null;
  }

  onActionClick(action: any, row: any) {
    this.actionClicked.emit({ action, row });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  toggleFilter(field: string, value: string) {
    if (!this.selectedFilters[field]) {
      this.selectedFilters[field] = [];
    }
  
    const filters = this.selectedFilters[field];
  
    if (filters.includes(value)) {
      this.selectedFilters[field] = filters.filter(f => f !== value);
    } else {
      this.selectedFilters[field] = [...filters, value];
    }
  
    this.applyFilters();
  }

  applyFilters() {
    this.filteredData = this.data.filter(row => {
      return Object.keys(this.selectedFilters).every(field => {
        const selectedValues = this.selectedFilters[field] || [];
        if (selectedValues.length > 0) {
          return selectedValues.includes(row[field]);
        }
        return true;
      });
    });
    this.applyPagination();
  }

  getUniqueColumnValues(field: string): string[] {
    const values = new Set(this.data.map(row => row[field]));
    return Array.from(values);
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    this.pageData = this.filteredData.slice(startIndex, endIndex);
  }
}
