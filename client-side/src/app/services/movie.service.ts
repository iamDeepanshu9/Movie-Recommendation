import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
export interface Movie {
  movieId: number;
  title: string;
  genre: string;
  description?: string;
  rating?: number;
  imageUrl?: string;
}
export interface User {
  userId: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'f2567925';
  constructor(private http: HttpClient) {}
  private movies: Movie[] = [
    {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      description:
        'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into the mind of a CEO.',
    },
    {
      movieId: 2,
      title: 'Interstellar',
      genre: 'Adventure',
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
  ];

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovie(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find((m) => m.movieId === id);
    return of(movie);
  }

  searchMovies(searchTerm: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?s=${searchTerm}&apikey=${this.apiKey}`)
      .pipe(map((response: any) => response.Search));
  }

  getMovieDetails(imdbId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?i=${imdbId}&apikey=${this.apiKey}`);
  }
}
