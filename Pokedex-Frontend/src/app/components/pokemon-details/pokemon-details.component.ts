import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglePokemon } from 'src/app/models/single-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  isOpen = false;
  isLoading = true;
  pokemonTypesString = '';
  pokemonData: SinglePokemon = {
    id: 0,
    name: '',
    weight: '',
    height: '',
    sprites: {
      front_default: '',
      front_shiny: '',
    },
    types: [
      {
        slot: 0,
        type: {
          name: '',
          url: '',
        },
      },
    ],
    isFavorite: false,
  };

  @Input() pokemonName!: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  getByName(name: string) {
    this.showDialog();
    this.isLoading = true;

    this.pokemonService
      .getPokemonByName(name)
      .subscribe((singlePokemon: SinglePokemon) => {
        this.pokemonData = singlePokemon;
        this.pokemonTypesString = this.pokemonData.types
          .map((type) => type.type.name)
          .join(', ');
        this.isLoading = false;
      });
  }

  showDialog() {
    this.isOpen = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const pokemonName = params.get('name');
      if (pokemonName) {
        this.getByName(pokemonName);
      }
    });
  }

  onPokemonFavoriteChanged() {
    this.getByName(this.pokemonName);
  }
}
