import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoritePokemonsComponent } from './list-favorite-pokemons.component';

describe('ListFavoritePokemonsComponent', () => {
  let component: ListFavoritePokemonsComponent;
  let fixture: ComponentFixture<ListFavoritePokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFavoritePokemonsComponent]
    });
    fixture = TestBed.createComponent(ListFavoritePokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
