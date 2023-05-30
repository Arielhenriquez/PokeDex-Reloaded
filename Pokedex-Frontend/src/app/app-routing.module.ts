import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFavoritePokemonsComponent } from './components/favorites-pokemons/list-favorite-pokemons/list-favorite-pokemons.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';

const routes: Routes = [
  { path: 'home', component: ListPokemonsComponent },
  { path: 'favorites', component: ListFavoritePokemonsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
