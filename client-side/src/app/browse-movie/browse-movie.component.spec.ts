import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMovieComponent } from './browse-movie.component';

describe('BrowseMovieComponent', () => {
  let component: BrowseMovieComponent;
  let fixture: ComponentFixture<BrowseMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
