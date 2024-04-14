import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  imdbId?: string | null;
  movie?: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.imdbId = this.route.snapshot.paramMap.get('id');
    this.getMovieDetails(this.imdbId);
  }

  getMovieDetails(id: any){
    this.movieService.getMovieDetails(id).pipe().subscribe(v => {
      console.log(v);
      this.movie = v;
    })
  }
}
