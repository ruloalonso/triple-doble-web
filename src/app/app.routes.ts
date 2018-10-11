import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { LoginComponent } from './components/misc/login/login.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
