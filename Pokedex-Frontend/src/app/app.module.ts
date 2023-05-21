import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [AppComponent, ListPokemonsComponent, PokemonDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
