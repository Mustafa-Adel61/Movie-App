import { Component, OnInit } from '@angular/core';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-Spinner',
  templateUrl: './Spinner.component.html',
  styleUrls: ['./Spinner.component.css'],
  imports: [CommonModule, TranslateModule]
})
export class SpinnerComponent implements OnInit {


  constructor(public darkModeService: DarkModeServiceService) { }

  ngOnInit() {

  }

}
