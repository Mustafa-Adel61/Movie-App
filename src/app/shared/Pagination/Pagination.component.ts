import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';
import { Home } from '../../Components/home/home';

@Component({
  selector: 'app-Pagination',
  templateUrl: './Pagination.component.html',
  styleUrls: ['./Pagination.component.css'],
  imports: [TranslateModule, CommonModule]
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  constructor(public darkModeService: DarkModeServiceService) { }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
