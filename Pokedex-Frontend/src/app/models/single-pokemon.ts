export interface SinglePokemon {
  id: number;
  name: '';
  sprites: PokemonImages;
  types: Types[];
  isFavorite: boolean;
}

export interface PokemonImages {
  front_default: string;
  back_default: string;
}

export interface Types {
  slot: number;
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
  url: string;
}
