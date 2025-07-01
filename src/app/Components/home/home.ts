import { Component, OnInit } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
//  counter:number[]=[1,2,3,4,5,6,66,6,66];
imagePhath:string='https://image.tmdb.org/t/p/w500'
 movieData:Imovie[]=[]
 wishlist:Imovie[]=[]
 constructor(private _DataFromAPI:DataFromAPI){}

ngOnInit(): void {
  const saved = localStorage.getItem('wishlist');
  if (saved) {
    this.wishlist = JSON.parse(saved);
  }

  this._DataFromAPI.getData().subscribe({
    next: (res) => {
      console.log(res.results);

      this.movieData = res.results.map((movie:any) => {
        return {
          ...movie,
          inWishlist: this.wishlist.some(m => m.id === movie.id)
        };
      });
    },
    error: (err) => {
      console.error('Error fetching data from API', err);
    }
  });
}

 
 

 toggleWishlist(movie: Imovie) {
  movie.inWishlist = !movie.inWishlist;

  if (movie.inWishlist) {
    this.wishlist.push(movie);
  } else {
    this.wishlist = this.wishlist.filter(m => m.id !== movie.id);
  }

  
  localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
}

}
