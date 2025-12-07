import { Routes } from '@angular/router';
import { Landing } from './landing/landing';

export const routes: Routes = [
  { path: '', component: Landing }, // Our landing page is the home page
  // { path: '**', redirectTo: '' } // Optional: Redirect any unknown path to home
];