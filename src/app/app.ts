import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./Components/home/home";
import { Wishlist } from './Components/wishlist/wishlist';

@Component({
  selector: 'app-root',
  imports: [Home,Wishlist,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movie-App';
}
