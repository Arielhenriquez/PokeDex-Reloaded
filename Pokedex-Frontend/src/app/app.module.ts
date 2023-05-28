import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonService } from './services/pokemon.service';
import { NgPrimeModule } from './modules/ng-prime/ng-prime.module';
import { ListFavoritePokemonsComponent } from './components/favorites-pokemons/list-favorite-pokemons/list-favorite-pokemons.component';
import { AddRemoveFavoritePokemonComponent } from './components/favorites-pokemons/add-remove-favorite-pokemon/add-remove-favorite-pokemon.component';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonsComponent,
    PokemonDetailsComponent,
    ListFavoritePokemonsComponent,
    AddRemoveFavoritePokemonComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgPrimeModule,
  ],
  providers: [PokemonService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
