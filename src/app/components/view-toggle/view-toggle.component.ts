import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService } from '../../services/permissions.service';
import { ViewType } from '../../models/permission.model';

interface Tab {
  id: ViewType;
  label: string;
}

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.component.html',
  styleUrl: './view-toggle.component.scss',
})
export class ViewToggleComponent {
  protected readonly svc = inject(PermissionsService);

  readonly tabs: Tab[] = [
    { id: 'table', label: 'Table' },
    { id: 'compare', label: 'Compare' },
    { id: 'cards', label: 'Cards' },
  ];

  selectView(view: ViewType): void {
    this.svc.setView(view);
  }
}
