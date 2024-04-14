import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseMovieComponent } from './browse-movie/browse-movie.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'movies', component: BrowseMovieComponent },
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'recommendations',
    component: RecommendationsComponent,
  },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
