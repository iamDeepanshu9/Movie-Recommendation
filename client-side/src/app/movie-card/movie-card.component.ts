import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  constructor(private router: Router){}
  @Input() movie: any;

  navigateToDetails(id: number){
    this.router.navigate(['/movie-details', id]);
  }
}
