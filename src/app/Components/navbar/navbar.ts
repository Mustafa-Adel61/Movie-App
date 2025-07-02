import { Component, inject, HostListener, OnInit, OnDestroy, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIFetchingService } from '../../shared/apifetching-service';
import { LoginS } from '../../services/login-s';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataFromAPI } from '../../data-from-api';
import { WishlistCountService } from '../../services/wishlist-count-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
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
  translate = inject(TranslateService);
  public wishlistS = inject(WishlistCountService)

  constructor(
    public loginS: LoginS,
    public darkModeService: DarkModeServiceService,
    public _DataFromAPI: DataFromAPI
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    effect(() => {
      const wishListCount = this.wishlistS.wishlistCount();


    })
  }

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
    this._DataFromAPI.lang.set(lang)

    this.translate.use(lang);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';


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

