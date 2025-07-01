import { Component, inject, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIFetchingService } from '../../shared/apifetching-service';
import { LoginS } from '../../services/login-s';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  isUserImageClicked = false;
  isMainMenuClicked = false;
  dropdownOpen = false;
  isNavbarVisible = true;

  isDarkMode = true;
  private darkModeSub: Subscription | undefined;

  movieFetcher = inject(APIFetchingService);

  constructor(
    public loginS: LoginS,
    public darkModeService: DarkModeServiceService
  ) { }

  ngOnInit(): void {
    this.darkModeSub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.darkModeSub?.unsubscribe();
  }

  changeLang(e: Event) {
    const lang = (e.target as HTMLSelectElement).value;
    this.movieFetcher.selectedLang.set(lang);
  }

  OpenUserAccount() {
    this.isUserImageClicked = !this.isUserImageClicked;
  }

  OpenMainMenu() {
    this.isMainMenuClicked = !this.isMainMenuClicked;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.loginS.logout();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isNavbarVisible = scrollY < 100;
  }
}
