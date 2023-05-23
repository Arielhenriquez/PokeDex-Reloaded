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
  first: number = 0;
  count!: number;
  firstItem: number = 1;
  lastItem!: number;
  pokemons: AllPokemonsInfo[] = [];
  isLoading: boolean = true;
  isPaginatorDisabled: boolean = false;
  constructor(private pokemonService: PokemonService) {}

  onPageChange(event: any) {
    console.log('onPageChange event:', event);
    if (this.isPaginatorDisabled) {
      return;
    }
    if (event.page !== undefined && event.rows !== undefined) {
      this.pageSize = event.rows;
      this.pageNumber = event.page + 1;
      this.first = event.first;
      this.firstItem = this.first + 1;
      this.lastItem = Math.min(this.first + this.pageSize, this.count);
      this.isLoading = true;
      this.isPaginatorDisabled = true;
      this.getPokemons();
    }
  }

  getPokemons() {
    this.pokemonService
      .getPagedPokemons(this.pageNumber, this.pageSize)
      .subscribe((pagedPokemons: PagedPokemons) => {
        console.log(pagedPokemons);
        this.count = pagedPokemons.count;
        this.pokemons = pagedPokemons.results;
        this.first = (this.pageNumber - 1) * this.pageSize;
        this.isLoading = false;
        this.isPaginatorDisabled = false;
      });
  }

  ngOnInit(): void {
    this.first = (this.pageNumber - 1) * this.pageSize;
    this.getPokemons();
  }
}
