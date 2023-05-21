import { Component, OnInit } from '@angular/core';
import { PagedPokemons, AllPokemonsInfo } from 'src/app/models/paged-pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss'],
})
export class ListPokemonsComponent implements OnInit {
  pageSize: number = 10;
  pageNumber: number = 1;
  count!: number;
  pokemons: AllPokemonsInfo[] = [];
  constructor(private pokemonService: PokemonService) {}

  getPokemons() {
    this.pokemonService
      .getPagedPokemons(this.pageNumber, this.pageSize)
      .subscribe((pagedPokemons: PagedPokemons) => {
        console.log(pagedPokemons);
        this.count = pagedPokemons.count;
        this.pokemons = pagedPokemons.results;
      });
  }

  getNextPage() {
    this.pageNumber++;
    this.getPokemons();
  }

  getPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getPokemons();
    }
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
