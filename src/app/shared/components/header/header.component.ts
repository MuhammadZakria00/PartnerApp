import { Component } from '@angular/core';
import { LocalStorageManagerService } from '../../Services/local-storage-manager.service';
import { Router } from '@angular/router';
import { DataShareService } from '../../Services/data-share.service';
import { UserAuthenticationService } from '../../Services/user-authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  
  constructor(private localStorage :LocalStorageManagerService,private _router: Router,    private _dataShare: DataShareService ,private _userAuth: UserAuthenticationService, ) {
   
    
  }
  logOut():void
  {
   
 
      this._userAuth.logout();
      this._dataShare.updateLoginStatus(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    
  }

