import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { HeadTitleComponent } from './head-title/head-title.component';
import { InPageHeadComponent } from './in-page-head/in-page-head.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { LoginComponent } from './login/login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    InPageHeadComponent,
    DateRangeComponent,
    LoginComponent,
    RegisterDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    InPageHeadComponent,
    DateRangeComponent,
    LoginComponent
  ]
})
export class CommonsModule { }
