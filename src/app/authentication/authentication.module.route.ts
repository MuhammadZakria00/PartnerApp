import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./signin/signin.component').then(c => c.SigninComponent),
    title:'Login',
  },
  {
    path: 'admin',
    loadComponent: () => import('./signin/signin.component').then(c => c.SigninComponent),
    title:'Admin',
  },
  {
    path: 'signup',
    loadComponent: () => import(`./signup/signup.component`).then(c => c.SignUpComponent),
    title:'Sign Up',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
