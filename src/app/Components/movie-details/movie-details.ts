import { IMovie } from './../../interfaces/imovie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';
import { DataFromAPI } from '../../data-from-api';
import { WishlistCountService } from '../../services/wishlist-count-service';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerComponent } from '../../shared/Spinner/Spinner.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie: any;
  isLoading = true;
  imagePath = 'https://image.tmdb.org/t/p/w500/';
  wishlist: any[] = [];
  trailerUrl: SafeResourceUrl | null = null;


  constructor(
    public darkModeService: DarkModeServiceService,
    private route: ActivatedRoute,
    private movieService: DataFromAPI,
    private _wishlistCountService: WishlistCountService,
    private _sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const movieId = +id;

      this.movieService.getMovieDetails(+id).subscribe({
        next: (data) => {
          this.movie = data;
          this.movie.inWishlist = this.wishlist.some(m => m.id === this.movie.id);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching movie:', err);
          this.isLoading = false;
        }
      });

      this.movieService.getMovieTrailer(movieId).subscribe({
        next: (res) => {
          const trailer = res.results.find(
            (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailer?.key) {
            this.trailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        },
        error: (err) => {
          console.error('Error fetching trailer:', err);
        }
      });

    }
  }

  toggleWishlist(movie: IMovie) {
    movie.inWishlist = !movie.inWishlist;

    if (movie.inWishlist) {
      this.wishlist.push(movie);
    } else {
      this.wishlist = this.wishlist.filter(m => m.id !== movie.id);
    }


    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this._wishlistCountService.GetWishlistCount()

  }
}


