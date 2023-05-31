import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/layout/home/home.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NgPrimeModule],
  exports: [HomeComponent],
})
export class LayoutModule {}
