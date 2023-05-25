import { Component, Input } from '@angular/core';
import { SinglePokemon } from 'src/app/models/single-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-add-remove-favorite-pokemon',
  templateUrl: './add-remove-favorite-pokemon.component.html',
  styleUrls: ['./add-remove-favorite-pokemon.component.scss'],
})
export class AddRemoveFavoritePokemonComponent {
  @Input() isFavorite = false;
  @Input() pokemonName!: string;

  constructor(private pokemonService: PokemonService) {}

  addRemoveFavorite() {
    if (this.isFavorite === true) {
      this.pokemonService
        .removeFavoritePokemon(this.pokemonName)
        .subscribe((response: string) => {
          this.isFavorite = false;
          console.log(response);
        });
    } else {
      this.pokemonService
        .addFavoritePokemon(this.pokemonName)
        .subscribe((response: string) => {
          this.isFavorite = true;
          console.log(response);
        });
    }
  }
}
