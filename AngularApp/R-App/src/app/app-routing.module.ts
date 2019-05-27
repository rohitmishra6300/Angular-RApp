import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserComponent } from './Users/user/user.component';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user', 
    pathMatch: 'full'
  },
  
  {
    path:'',children:[
      {
        path:'user',component:UserListComponent
      },
      {
        path:'user/details/:id',component:UserComponent
      },
      {
        path:'user/create',component:UserComponent
      },
      {
        path:'users/',component:UsersComponent
      }
    ]
  },
  // {
  //   path:'user/create',component:UserComponent
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
