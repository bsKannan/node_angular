import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyserviceService } from './myservice.service'

;
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


var routes : Routes= [
  {
    path:'',redirectTo:'main', pathMatch:'full'
  },
  {
    path:'main', component:MainDeskComponent, children: [
      {
        path:'',redirectTo:'login',pathMatch:'full'
      },
      {
        path:'login', component: LoginComponent
      },
      {
        path:'register', component: RegisterComponent
      }
    ]
  },
  {
    path:'dash', component:UserDashboardComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainDeskComponent,
    RegisterComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MyserviceService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
