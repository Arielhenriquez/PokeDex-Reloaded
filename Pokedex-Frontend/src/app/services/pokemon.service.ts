import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedPokemons } from '../models/paged-pokemons';
import { Observable } from 'rxjs';
import { SinglePokemon } from '../models/single-pokemon';

const BASE_URL = environment.baseApi;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  controller = 'Pokemon';

  constructor(private httpClient: HttpClient) {}

  getPagedPokemons(
    pageNumber: number = 0,
    pageSize: number = 10
  ): Observable<PagedPokemons> {
    let params = this.getPaginationParams(pageNumber, pageSize);
    return this.httpClient.get<PagedPokemons>(
      `${BASE_URL}/${this.controller}/paged-pokemons`,
      {
        params,
      }
    );
  }

  private getPaginationParams(pageNumber: number, pageSize: number) {
    let params = new HttpParams()
      .append('PageNumber', pageNumber.toString())
      .append('PageSize', pageSize.toString());
    return params;
  }

  getPokemonByName(name: string): Observable<SinglePokemon> {
    return this.httpClient.get<SinglePokemon>(
      `${BASE_URL}/${this.controller}/${name}`
    );
  }

  addFavoritePokemon(name: string): Observable<string> {
    return this.httpClient.put(
      `${BASE_URL}/${this.controller}/${name}/favorite`,
      {},
      { responseType: 'text' }
    );
  }

  removeFavoritePokemon(name: string): Observable<string> {
    return this.httpClient.delete(
      `${BASE_URL}/${this.controller}/${name}/favorite`,
      { responseType: 'text' }
    );
  }

  getFavoritePokemons(): Observable<SinglePokemon[]> {
    return this.httpClient.get<SinglePokemon[]>(
      `${BASE_URL}/${this.controller}/favorites`
    );
  }
}
