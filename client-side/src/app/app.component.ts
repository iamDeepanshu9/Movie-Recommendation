import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    FormsModule,
    DashboardComponent,
    HttpClientModule,
    RouterModule,
    AsyncPipe,
  ],
  providers: [
    MovieService,
    {
      provide: AuthGuard,
      useFactory: (authService: AuthService, router: Router) =>
        new AuthGuard(authService, router),
      deps: [AuthService], // Explicitly states that AuthService is a dependency of AuthGuard
    },
    AuthService,
    HttpClientModule,
    AuthGuard
  ],
})
export class AppComponent {
  public isLoggedIn$$ = new BehaviorSubject(false);
  constructor(private authService: AuthService) {
    this.authService.LoginStatus$$.subscribe((status) => {
      console.log(status);
      this.isLoggedIn$$.next(status);
    });
  }

  public logOut() {
    this.authService.logout();
  }
}
