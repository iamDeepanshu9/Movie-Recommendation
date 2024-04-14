import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-browse-movie',
  standalone: true,
  templateUrl: './browse-movie.component.html',
  styleUrl: './browse-movie.component.scss',
  imports: [FormsModule, MovieCardComponent],
})
export class BrowseMovieComponent {
  public searchTerm = '';
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  public onSearch() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.movieService.searchMovies(this.searchTerm).subscribe((movies) => {
        this.movies = movies;
        if(!movies){
          alert('Too Many Results Or Movie Not Found!!')
        }
        console.log(movies);
      }, (err) => {
        window.alert(err);
      });
    }
  }
}
