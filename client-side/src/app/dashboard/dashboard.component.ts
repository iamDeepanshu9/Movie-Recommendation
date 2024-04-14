import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public searchTerm = '';

  constructor(private movieService: MovieService) {}

  public onSearch() {
    if (this.searchTerm) {
      this.movieService.searchMovies(this.searchTerm).pipe().subscribe(v => {
        console.log(v);
      })
    }
  }
}
