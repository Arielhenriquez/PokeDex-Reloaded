import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-add-remove-favorite-pokemon',
  templateUrl: './add-remove-favorite-pokemon.component.html',
  styleUrls: ['./add-remove-favorite-pokemon.component.scss'],
})
export class AddRemoveFavoritePokemonComponent {
  isLoading = false;
  @Input() isFavorite = false;
  @Input() pokemonName!: string;
  @Output() pokemonFavoriteChanged = new EventEmitter<void>();

  constructor(
    private pokemonService: PokemonService,
    private messageService: MessageService
  ) {}

  addRemoveFavorite() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isFavorite === true) {
        this.pokemonService
          .removeFavoritePokemon(this.pokemonName)
          .subscribe((response: string) => {
            this.isFavorite = false;
            this.isLoading = false;
            this.pokemonFavoriteChanged.emit();
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: `Pokemon ${this.pokemonName} removed from the favorite list`,
            });
            console.log(response);
          });
      } else {
        this.pokemonService
          .addFavoritePokemon(this.pokemonName)
          .subscribe((response: string) => {
            this.isFavorite = true;
            this.isLoading = false;
            this.pokemonFavoriteChanged.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response,
            });
            console.log(response);
          });
      }
    }, 500);
  }
}
