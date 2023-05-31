export interface SinglePokemon {
  id: number;
  name: '';
  height: '';
  weight: '';
  sprites: PokemonImages;
  types: Types[];
  isFavorite: boolean;
}

export interface PokemonImages {
  front_default: string;
  front_shiny: string;
}

export interface Types {
  slot: number;
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
  url: string;
}
