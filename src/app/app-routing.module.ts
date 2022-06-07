import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignComponent} from "./sign/sign.component";

const routes: Routes = [
  {
    path: 'sign/:id',
    component: SignComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
