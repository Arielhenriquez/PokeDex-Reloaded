export interface PagedPokemons {
  count: number;
  next: string;
  previous: string;
  results: AllPokemonsInfo[];
}

export interface AllPokemonsInfo {
  name: string;
  url: string;
  photo: string;
}
