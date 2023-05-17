export interface SinglePokemon {
  id: number;
  name: string;
  images?: PokemonImages | null;
  types?: Types[] | null;
  isFavorite: boolean;
}

export interface PokemonImages {
  front_default: string;
  back_default: string;
}

export interface Types {
  slot: number;
  type: TypeDetail | null;
}

export interface TypeDetail {
  name: string;
  url: string;
}
