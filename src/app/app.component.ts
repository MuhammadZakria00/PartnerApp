import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initAccordions, initFlowbite } from 'flowbite';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { UserAuthenticationService } from './shared/Services/user-authentication.service';
import { DataShareService } from './shared/Services/data-share.service';
import { ToastComponent } from "./shared/components/toaster/toaster.component";
import { TableComponent } from "./shared/components/table/table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object
,    private _authService: UserAuthenticationService,
private _dataShare: DataShareService
) {
  this.isLogin = _authService.isLogin();
  
  this._dataShare.$updateLoginStatus.subscribe(isLogin => {

    if (isLogin) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  });

}

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      // Call browser-specific code
      initAccordions();
      initFlowbite();
    }
  }

 

}
