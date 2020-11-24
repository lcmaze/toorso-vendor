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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HeadTitleComponent,
    InPageHeadComponent,
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
    InPageHeadComponent
  ]
})
export class CommonsModule { }