import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  protected readonly svc = inject(PermissionsService);

  onInput(value: string): void {
    this.svc.setSearchTerm(value);
  }

  clearSearch(): void {
    this.svc.setSearchTerm('');
  }
}
