import { NgModule } from '@angular/core';
import { AddRemoveFavoritePokemonComponent } from 'src/app/components/favorites-pokemons/add-remove-favorite-pokemon/add-remove-favorite-pokemon.component';
import { ListFavoritePokemonsComponent } from 'src/app/components/favorites-pokemons/list-favorite-pokemons/list-favorite-pokemons.component';
import { ListPokemonsComponent } from 'src/app/components/list-pokemons/list-pokemons.component';
import { PokemonDetailsComponent } from 'src/app/components/pokemon-details/pokemon-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ListPokemonsComponent,
    PokemonDetailsComponent,
    ListFavoritePokemonsComponent,
    AddRemoveFavoritePokemonComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgPrimeModule,
    CommonModule,
  ],
  providers: [PokemonService],
  exports: [
    ListPokemonsComponent,
    PokemonDetailsComponent,
    ListFavoritePokemonsComponent,
    AddRemoveFavoritePokemonComponent,
  ],
})
export class PokemonModule {}
