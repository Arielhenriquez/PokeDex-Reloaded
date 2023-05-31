import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { LayoutModule } from './modules/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, LayoutModule, PokemonModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
