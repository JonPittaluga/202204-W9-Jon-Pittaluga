import { iPokemonAbilities } from './types/pokemon-abilities.js';
import { PokemonSpecie } from './types/pokemon-specie.js';
import { PokemonSprites } from './types/pokemon-sprites.js';
import { PokemonStat } from './types/pokemon-stat.js';
import { PokemonType } from './types/pokemon-type.js';
import { iPokemonGameIndice } from './types/pokemon-game-indices.js';

export interface iPokemonModel {
  name: string;
  url: string | any;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  past_types: Array<string>;
  abilities: iPokemonAbilities[];
  forms: Array<any>;
  game_indices: Array<iPokemonGameIndice>;
  held_items: Array<number>[];
  location_area_encounters: string;
  moves: Array<any>;
  sprites: PokemonSprites;
  species: PokemonSpecie;
  stats: PokemonStat[];
  types: PokemonType[];
}
