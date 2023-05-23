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
  isOpen: boolean = false;
  pokemonData: SinglePokemon = {
    id: 0,
    name: '',
    sprites: {
      front_default: '',
      back_default: '',
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
    if (!name) {
      console.log('No Pokemon name provided');
      return;
    }

    this.pokemonService
      .getPokemonByName(name)
      .subscribe((singlePokemon: SinglePokemon) => {
        console.log(`${singlePokemon} con el nombre ${name}`);
        this.pokemonData = singlePokemon;
        console.log(singlePokemon);
      });
  }
  showDialog() {
    this.isOpen = true;
    console.log('oli');
  }

  hideDialog() {
    this.isOpen = false;
    console.log('Modal closed');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const pokemonName = params.get('name');
      if (pokemonName) {
        this.getByName(pokemonName);
      }
    });
  }
  greeting() {
    alert('ola starlin jiji');
  }
}
