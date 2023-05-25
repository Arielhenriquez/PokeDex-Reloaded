import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveFavoritePokemonComponent } from './add-remove-favorite-pokemon.component';

describe('AddRemoveFavoritePokemonComponent', () => {
  let component: AddRemoveFavoritePokemonComponent;
  let fixture: ComponentFixture<AddRemoveFavoritePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRemoveFavoritePokemonComponent]
    });
    fixture = TestBed.createComponent(AddRemoveFavoritePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
