import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './Components/navbar/navbar';
import { MovieHead } from "./Components/movie-head/movie-head";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, MovieHead],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movie-App';
}
