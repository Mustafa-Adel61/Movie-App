import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APIFetchingService } from '../../shared/apifetching-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isUserImageClicked: boolean = false
  isMainMenuClicked: boolean = false
  dropdownOpen = false;

  movieFetcher = inject(APIFetchingService)

  changeLang(e:Event){
    const lang = (e.target as HTMLSelectElement).value
    this.movieFetcher.selectedLang.set(lang)
    
  }

  OpenUserAccount() {
    this.isUserImageClicked = !this.isUserImageClicked
  }

  OpenMainMenu() {
    this.isMainMenuClicked = !this.isMainMenuClicked
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
