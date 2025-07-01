import { Component, inject, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIFetchingService } from '../../shared/apifetching-service';
import { LoginS } from '../../services/login-s';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isUserImageClicked: boolean = false
  isMainMenuClicked: boolean = false
  dropdownOpen = false;

  movieFetcher = inject(APIFetchingService)
  constructor(public loginS: LoginS) { }

  changeLang(e: Event) {
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

  logout() {
    this.loginS.logout();
  }


  isNavbarVisible = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;

    // لو المستخدم نزل أكتر من 100px نخفي الـ nav
    this.isNavbarVisible = scrollY < 100;
  }
}
