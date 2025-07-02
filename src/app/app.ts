import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';

import { Navbar } from './Components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { DarkModeServiceService } from './services/DarkModeService.service';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnInit {
  title = 'Movie-App';
  isDarkMode: boolean = true;

  constructor(
    public darkModeService: DarkModeServiceService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  ngAfterViewInit(): void {
    AOS.init();
    AOS.refresh();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
