import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  $updateLoginStatus: Subject<boolean> = new Subject<boolean>();
  constructor() { }
  updateLoginStatus(isLogin:boolean): void {
    this.$updateLoginStatus.next(isLogin);
  }
}
