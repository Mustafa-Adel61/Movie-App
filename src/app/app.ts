import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./Components/home/home";

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Movie-App';
}
