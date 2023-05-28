import { Component, OnInit } from '@angular/core';
import { SinglePokemon } from 'src/app/models/single-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-favorite-pokemons',
  templateUrl: './list-favorite-pokemons.component.html',
  styleUrls: ['./list-favorite-pokemons.component.scss'],
})
export class ListFavoritePokemonsComponent implements OnInit {
  isLoading = false;
  pokemonData: SinglePokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  getFavorites() {
    this.isLoading = true;
    this.pokemonService
      .getFavoritePokemons()
      .subscribe((singlePokemon: SinglePokemon[]) => {
        this.pokemonData = singlePokemon;
        this.isLoading = false;
      });
  }
  ngOnInit(): void {
    this.getFavorites();
  }
  onPokemonFavoriteChanged() {
    this.getFavorites();
  }
}
